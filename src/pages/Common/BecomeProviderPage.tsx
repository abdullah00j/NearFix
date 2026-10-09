import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check } from "lucide-react";
import BecomeProviderHeader from "../../components/Pages/CUSTOMER/BecomeProvider/BecomeProviderHeader";
import BecomeProviderFooter from "../../components/Pages/CUSTOMER/BecomeProvider/BecomeProviderFooter";
import BasicDetail from "../../components/Pages/CUSTOMER/BecomeProvider/BasicDetail";
import CnicVerfication from "../../components/Pages/CUSTOMER/BecomeProvider/CnicVerfication";
import BecomeProviderReview from "../../components/Pages/CUSTOMER/BecomeProvider/BecomeProviderReview";
import BecomeProviderProgressBar from "../../components/Pages/CUSTOMER/BecomeProvider/BecomeProviderProgressBar";

type ServiceOffering = {
  id: string;
  category: string;
  description: string;
  price: string;
};

type ProviderApplication = {
  businessName: string;
  experience: string;
  serviceArea: string;
  bio: string;
  services: ServiceOffering[];
  submittedAt: string;
};

const applicationStorageKey = "nearfix:provider-application-draft";

const totalSteps = 4;

const createService = (): ServiceOffering => ({
  id: crypto.randomUUID(),
  category: "",
  description: "",
  price: "",
});

export default function BecomeProviderPage() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [experience, setExperience] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [bio, setBio] = useState("");
  const [services] = useState<ServiceOffering[]>([createService()]);
  const [cinNumber, setCinNumber] = useState("");
  const [legalBusinessName, setLegalBusinessName] = useState("");
  const [cinDocument, setCinDocument] = useState<File | null>(null);
  const [documentError, setDocumentError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  console.log(setBio, setExperience);
  const handleDocument = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    event.currentTarget.value = "";
    if (!file) return;

    const acceptedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!acceptedTypes.includes(file.type)) {
      setCinDocument(null);
      setDocumentError("Upload a PDF, JPG, or PNG document.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setCinDocument(null);
      setDocumentError("The verification document must be 10 MB or smaller.");
      return;
    }

    setDocumentError("");
    setCinDocument(file);
    setSaved(false);
  };

  const saveApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const application: ProviderApplication = {
      businessName: businessName.trim(),
      experience: experience.trim(),
      serviceArea: serviceArea.trim(),
      bio: bio.trim(),
      services: services.map((service) => ({
        ...service,
        category: service.category.trim(),
        description: service.description.trim(),
        price: service.price.trim(),
      })),
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(applicationStorageKey, JSON.stringify(application));
      setSaveError("");
      setSaved(true);
      setStep(totalSteps);
    } catch {
      setSaveError(
        "Could not save the application draft in this browser. Check available storage and try again.",
      );
    }
  };

  const goNext = () => {
    if (step === 1 || step === 2 || step === 3) {
      if (step === 3 && !cinDocument) {
        setDocumentError("Upload a CIN verification document to continue.");
        return;
      }
      if (!formRef.current?.reportValidity()) return;
      setStep((current) => Math.min(current + 1, totalSteps - 1));
      return;
    }
    if (step === 4) formRef.current?.requestSubmit();
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 1));
    setSaved(false);
    setSaveError("");
  };

  return (
    <section className="mx-auto max-w-[960px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <BecomeProviderHeader />

      <BecomeProviderProgressBar totalSteps={totalSteps} step={step} />

      {step === totalSteps ? (
        <section className="rounded-2xl border border-line bg-[var(--panel)] px-5 py-12 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-panel-soft text-primary">
            <Check size={26} />
          </span>
          <h2 className="mt-4 text-xl font-semibold">
            {saved ? "Application draft saved" : "Application draft"}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">
            Your non-sensitive provider details are saved in this browser. CIN
            information and its document are not stored or uploaded by this
            prototype, and the application is not sent for verification.
          </p>
        </section>
      ) : (
        <form
          ref={formRef}
          onSubmit={(event) => {
            if (step !== 4) {
              event.preventDefault();
              goNext();
              return;
            }
            saveApplication(event);
          }}
          className="space-y-5"
        >
          {step === 1 && (
            <BasicDetail
              businessName={businessName}
              setBusinessName={(value) => {
                setBusinessName(value);
                setSaved(false);
              }}

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
              cinDocument={cinDocument}
              setCinDocument={setCinDocument}
              saved={saved}
              handleDocument={handleDocument}
              documentError={documentError}
              documentInputRef={documentInputRef}
              setSaved={setSaved}
            />
          )}

          {step === 3 && (
            <BecomeProviderReview
              legalBusinessName={legalBusinessName}
              cinNumber={cinNumber}
              cinDocument={cinDocument}
              businessName={businessName}
              experience={experience}
              serviceArea={serviceArea}
              bio={bio}
              services={services.map((service) => ({
                ...service,
                price: Number(service.price),
              }))}
            />
          )}
          {saveError && (
            <p className="text-sm text-primary" role="alert">
              {saveError}
            </p>
          )}
        </form>
      )}

      <BecomeProviderFooter
        step={step}
        totalSteps={totalSteps}
        saved={saved}
        onPrevious={goBack}
        onNext={goNext}
        onSave={() => formRef.current?.requestSubmit()}
        onReview={() => {
          setStep(4);
          setSaved(false);
        }}
      />
    </section>
  );
}
