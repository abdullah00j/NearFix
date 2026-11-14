import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import BecomeProviderHeader from "../../components/Pages/CUSTOMER/BecomeProvider/BecomeProviderHeader";
import BecomeProviderFooter from "../../components/Pages/CUSTOMER/BecomeProvider/BecomeProviderFooter";
import BasicDetail from "../../components/Pages/CUSTOMER/BecomeProvider/BasicDetail";
import CnicVerfication from "../../components/Pages/CUSTOMER/BecomeProvider/CnicVerfication";
import BecomeProviderReview from "../../components/Pages/CUSTOMER/BecomeProvider/BecomeProviderReview";
import BecomeProviderProgressBar from "../../components/Pages/CUSTOMER/BecomeProvider/BecomeProviderProgressBar";
import { toast } from "react-toastify";
import { useUploadDocument } from "@/hooks/useUploadDocument";
import BecomeProviderPageSkeleton from "./CustomerSkeleton/BecomeProviderPageSkeleton";
import ApplicationSubmitted from "@/components/Pages/CUSTOMER/BecomeProvider/ApplicationSubmitted";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/context/UserContext";
import { useCreateProviderApplication } from "@/data/PROVIDER/ProviderMutation";
import { useProviderApplicationStatusQuery } from "@/data/PROVIDER/ProviderQueries";
import { getCurrentAuthSession } from "@/lib/userServices";

type ProviderApplication = {
  businessName: string;
  serviceArea: string;
  legalBusinessName: string;
  cinNumber: string;
  selfie: string;
  cninDocumentFrontSide: string;
  cnicDocumentBackSide: string;
};

const applicationStorageKey = "nearfix:provider-application-draft";

const totalSteps = 4;
type UploadTarget = "selfie" | "frontDocument" | "backDocument";

const loadApplicationDraft = (): Partial<ProviderApplication> => {
  const storedApplication = localStorage.getItem(applicationStorageKey);
  if (!storedApplication) return {};

  try {
    const parsedApplication: unknown = JSON.parse(storedApplication);
    if (
      parsedApplication &&
      typeof parsedApplication === "object" &&
      !Array.isArray(parsedApplication)
    ) {
      const draft = parsedApplication as Record<string, unknown>;
      return {
        businessName:
          typeof draft.businessName === "string"
            ? draft.businessName
            : undefined,
        serviceArea:
          typeof draft.serviceArea === "string" ? draft.serviceArea : undefined,
        legalBusinessName:
          typeof draft.legalBusinessName === "string"
            ? draft.legalBusinessName
            : undefined,
        cinNumber:
          typeof draft.cinNumber === "string" ? draft.cinNumber : undefined,
        selfie: typeof draft.selfie === "string" ? draft.selfie : undefined,
        cninDocumentFrontSide:
          typeof draft.cninDocumentFrontSide === "string"
            ? draft.cninDocumentFrontSide
            : undefined,
        cnicDocumentBackSide:
          typeof draft.cnicDocumentBackSide === "string"
            ? draft.cnicDocumentBackSide
            : undefined,
      };
    }
  } catch {
    localStorage.removeItem(applicationStorageKey);
    return {};
  }

  localStorage.removeItem(applicationStorageKey);
  return {};
};

export default function BecomeProviderPage() {
  const [applicationDraft] = useState(loadApplicationDraft);
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState(
    () => applicationDraft.businessName ?? "",
  );
  const [selfie, setSelfie] = useState<File | null>(null);
  const [selfieUploadPath, setSelfieUploadPath] = useState<string | null>(
    () => applicationDraft.selfie || null,
  );
  const [serviceArea, setServiceArea] = useState(
    () => applicationDraft.serviceArea ?? "",
  );
  const [cinNumber, setCinNumber] = useState(
    () => applicationDraft.cinNumber ?? "",
  );
  const [legalBusinessName, setLegalBusinessName] = useState(
    () => applicationDraft.legalBusinessName ?? "",
  );
  const [cninDocumentFrontSide, setcninDocumentFrontSide] = useState<
    string | null
  >(() => applicationDraft.cninDocumentFrontSide || null);
  const [cnicDocumentBackSide, setCnicDocumentBackSide] = useState<
    string | null
  >(() => applicationDraft.cnicDocumentBackSide || null);
  const [frontDocumentFile, setFrontDocumentFile] = useState<File | null>(null);
  const [backDocumentFile, setBackDocumentFile] = useState<File | null>(null);
  const [uploadTarget, setUploadTarget] = useState<UploadTarget | null>(null);
  const [uploadErrorTarget, setUploadErrorTarget] =
    useState<UploadTarget | null>(null);
  const [documentError, setDocumentError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);
  const [submittedLocally, setSubmittedLocally] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const createProviderApplication = useCreateProviderApplication();
  const loading = createProviderApplication.isPending;
  const {
    uploadDocument,
    loading: imageLoading,
    error: imageError,
  } = useUploadDocument();

  const { currentUser } = useCurrentUser();
  const applicationStatusQuery = useProviderApplicationStatusQuery(
    currentUser?.id,
  );
  const applicationStatus = submittedLocally
    ? "PENDING"
    : (applicationStatusQuery.data ?? "");
  const applicationStatusloading =
    !currentUser?.id || applicationStatusQuery.isLoading;

  useEffect(() => {
    if (!applicationStatusQuery.error) return;
    toast.error(
      applicationStatusQuery.error instanceof Error
        ? applicationStatusQuery.error.message
        : "Could not load your provider application status.",
    );
  }, [applicationStatusQuery.error]);

  const openProviderDashboard = async () => {
    setSaveError("");
    try {
      const session = await getCurrentAuthSession(true);
      if (!session.groups.includes("PROVIDER")) {
        throw new Error(
          "Provider access isn't active yet. Please sign in again.",
        );
      }
      navigate("/provider");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not refresh your provider account session.";
      setSaveError(message);
      toast.error(message);
    }
  };

  if (applicationStatusloading) {
    return <BecomeProviderPageSkeleton />;
  }

  // if (loading || imageLoading) {
  //   return <BecomeProviderPageSkeleton />;
  // }

  const handleFileUpload = async (
    target: UploadTarget,
    event: ChangeEvent<HTMLInputElement>,
    onUploaded: (file: File, uploadPath: string) => void,
    onInvalid: () => void,
    options: {
      acceptedTypes?: string[];
      invalidTypeMessage?: string;
      tooLargeMessage?: string;
    } = {},
  ) => {
    const file = event.currentTarget.files?.[0] ?? null;
    event.currentTarget.value = "";
    if (!file) return;

    const acceptedTypes = options.acceptedTypes ?? [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];
    if (!acceptedTypes.includes(file.type)) {
      onInvalid();
      setDocumentError(
        options.invalidTypeMessage ?? "Upload a PDF, JPG, or PNG document.",
      );
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      onInvalid();
      setDocumentError(
        options.tooLargeMessage ??
          "The verification document must be 10 MB or smaller.",
      );
      return;
    }

    setDocumentError("");
    setUploadTarget(target);
    setUploadErrorTarget(null);
    try {
      const imageResponse = await uploadDocument(
        file,
        file.type.replace("/", "-"),
      );
      if (!imageResponse) {
        setUploadErrorTarget(target);
        return;
      }
      onUploaded(file, imageResponse);
      setSaved(false);
    } finally {
      setUploadTarget(null);
    }
  };

  const handleDocumentFrontSide = (event: ChangeEvent<HTMLInputElement>) =>
    handleFileUpload(
      "frontDocument",
      event,
      (file, uploadPath) => {
        setFrontDocumentFile(file);
        setcninDocumentFrontSide(uploadPath);
      },
      () => {
        setFrontDocumentFile(null);
        setcninDocumentFrontSide(null);
      },
    );

  const handleDocumentBackSide = (event: ChangeEvent<HTMLInputElement>) =>
    handleFileUpload(
      "backDocument",
      event,
      (file, uploadPath) => {
        setBackDocumentFile(file);
        setCnicDocumentBackSide(uploadPath);
      },
      () => {
        setBackDocumentFile(null);
        setCnicDocumentBackSide(null);
      },
    );

  const handleSelfie = (event: ChangeEvent<HTMLInputElement>) =>
    handleFileUpload(
      "selfie",
      event,
      (file, uploadPath) => {
        setSelfie(file);
        setSelfieUploadPath(uploadPath);
      },
      () => {
        setSelfie(null);
        setSelfieUploadPath(null);
      },
      {
        acceptedTypes: ["image/jpeg", "image/png"],
        invalidTypeMessage: "Upload a JPG or PNG selfie.",
        tooLargeMessage: "The selfie must be 10 MB or smaller.",
      },
    );

  const saveApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    if (!cninDocumentFrontSide) {
      setDocumentError("Upload a CIN verification document to continue.");
      return;
    }

    const application: ProviderApplication = {
      businessName: businessName.trim(),
      serviceArea: serviceArea.trim(),
      legalBusinessName: legalBusinessName.trim(),
      cinNumber: cinNumber.trim(),
      selfie: selfieUploadPath ?? "",
      cninDocumentFrontSide,
      cnicDocumentBackSide: cnicDocumentBackSide ?? "",
    };

    setSaveError("");
    try {
      localStorage.setItem(applicationStorageKey, JSON.stringify(application));
    } catch {
      setSaveError(
        "Could not save the application draft in this browser. Check available storage and try again.",
      );
    }

    try {
      const createdApplication = await createProviderApplication.mutateAsync({
        businessName: application.businessName,
        serviceArea: application.serviceArea,
        CNICNumber: application.cinNumber,
        CNICNAME: application.legalBusinessName,
        selfie: application.selfie,
        CNICFrontSide: application.cninDocumentFrontSide,
        CNICBackSide: application.cnicDocumentBackSide,
      });
      if (!createdApplication) {
        throw new Error("The provider application was not saved.");
      }

      localStorage.removeItem(applicationStorageKey);
      setSaved(true);
      setSubmittedLocally(true);
      setStep(totalSteps);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Unable to submit your provider application.",
      );
    }
  };

  const goNext = () => {
    if (step === 1 || step === 2 || step === 3) {
      if (step === 3 && !cninDocumentFrontSide) {
        setDocumentError("Upload a CIN verification document to continue.");
        return;
      }
      if (!formRef.current?.reportValidity()) {
        toast.error("testing toast design");
        return;
      }
      setStep((current) => Math.min(current + 1, totalSteps - 1));
      return;
    }
    if (step === 4) formRef.current?.requestSubmit();
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 1));
    setSaveError("");
  };

  return (
    <section className="mx-auto  space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      {applicationStatus !== "PENDING" && applicationStatus !== "APPROVED" && (
        <>
          <BecomeProviderHeader />
          <BecomeProviderProgressBar
            totalSteps={totalSteps}
            step={step}
            setStep={setStep}
          />
        </>
      )}

      {applicationStatus === "APPROVED" || applicationStatus === "PENDING" ? (
        <>
          <ApplicationSubmitted
            status={applicationStatus}
            onBackToDashboard={() =>
              applicationStatus === "APPROVED"
                ? void openProviderDashboard()
                : navigate("/provider/dashboard")
            }
          />
          {saveError && (
            <p
              className="mx-auto mt-4 max-w-lg text-sm text-primary"
              role="alert"
            >
              {saveError}
            </p>
          )}
        </>
      ) : (
        <form
          ref={formRef}
          onSubmit={(event) => {
            if (step < totalSteps - 1) {
              event.preventDefault();
              goNext();
              return;
            }
            void saveApplication(event);
          }}
          aria-busy={loading || imageLoading}
          className="space-y-5"
        >
          {loading && (
            <p className="text-sm text-[var(--muted)]" role="status">
              Submitting your application...
            </p>
          )}
          {step === 1 && (
            <BasicDetail
              businessName={businessName}
              setBusinessName={(value) => {
                setBusinessName(value);
                setSaved(false);
              }}
              selfie={selfie}
              handleSelfie={handleSelfie}
              selfieUploading={uploadTarget === "selfie"}
              selfieUploadError={
                uploadErrorTarget === "selfie"
                  ? (imageError?.message ?? null)
                  : null
              }
              serviceArea={serviceArea}
              setServiceArea={(value) => {
                setServiceArea(value);
                setSaved(false);
              }}
              setSaved={setSaved}
            />
          )}

          {step === 2 && (
            <CnicVerfication
              legalBusinessName={legalBusinessName}
              setLegalBusinessName={(value) => {
                setLegalBusinessName(value);
                setSaved(false);
              }}
              cinNumber={cinNumber}
              setCinNumber={(value) => {
                setCinNumber(value);
                setSaved(false);
              }}
              cninDocumentFrontSide={frontDocumentFile}
              cnicDocumentBackSide={backDocumentFile}
              saved={saved}
              handleDocumentFrontSide={handleDocumentFrontSide}
              handleDocumentBackSide={handleDocumentBackSide}
              documentError={documentError}
              frontDocumentUploading={uploadTarget === "frontDocument"}
              backDocumentUploading={uploadTarget === "backDocument"}
              frontDocumentUploadError={
                uploadErrorTarget === "frontDocument"
                  ? (imageError?.message ?? null)
                  : null
              }
              backDocumentUploadError={
                uploadErrorTarget === "backDocument"
                  ? (imageError?.message ?? null)
                  : null
              }
              documentUploadDisabled={imageLoading}
              documentInputRef={documentInputRef}
              setSaved={setSaved}
            />
          )}

          {step === 3 && (
            <BecomeProviderReview
              legalBusinessName={legalBusinessName}
              cinNumber={cinNumber}
              selfie={selfie}
              cninDocumentFrontSide={frontDocumentFile}
              cnicDocumentBackSide={backDocumentFile}
              businessName={businessName}
              serviceArea={serviceArea}
            />
          )}
          {step === 3 && documentError && (
            <p className="text-sm text-primary" role="alert">
              {documentError}
            </p>
          )}
          {saveError && (
            <p className="text-sm text-primary" role="alert">
              {saveError}
            </p>
          )}
        </form>
      )}

      {applicationStatus !== "PENDING" && applicationStatus !== "APPROVED" && (
        <BecomeProviderFooter
          step={step}
          totalSteps={totalSteps}
          saved={saved}
          loading={loading}
          onPrevious={goBack}
          onNext={goNext}
          onSave={() => formRef.current?.requestSubmit()}
          onReview={() => {
            setStep(totalSteps - 1);
          }}
        />
      )}
    </section>
  );
}
