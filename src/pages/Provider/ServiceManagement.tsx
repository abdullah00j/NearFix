import { useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import {
  useCreateService,
  useDeleteService,
  useUpdateService,
  useUploadProviderServiceImage,
} from "@/data/PROVIDER/ProviderMutation";
import ServiceFormModal, {
  type ServiceForm,
} from "@/components/Pages/PROVIDER/ServiceManager/ServiceFormModal";
import DeleteServiceModal from "@/components/Pages/PROVIDER/ServiceManager/DeleteServiceModal";
import { useListServices } from "@/data/PROVIDER/ProviderQueries";
import { useProvider } from "@/context/ProviderContext";
import ServiceManagementHeader from "@/components/Pages/PROVIDER/ServiceManager/ServiceManagementHeader";
import ServiceManagementCard from "@/components/Pages/PROVIDER/ServiceManager/ServiceManagementCard";
import ServiceManagementListing from "@/components/Pages/PROVIDER/ServiceManager/ServiceManagementListing";
import {
  pricingUnitForType,
  pricingTypeForUnit,
  serviceCategories,
} from "@/components/Pages/PROVIDER/ServiceManager/serviceFormOptions";

type ProviderService = Schema["ProviderService"]["type"];

const emptyForm: ServiceForm = {
  category: "",
  customCategory: "",
  price: "",
  pricingUnit: "work",
  description: "",
  images: [],
};

export default function ServiceManagement() {
  const { data, error, isLoading, refetch } = useListServices();
  const { currentProvider: ProviderData } = useProvider();

  const createService = useCreateService();
  const updateServiceMutation = useUpdateService();
  const deleteServiceMutation = useDeleteService();
  const uploadServiceImage = useUploadProviderServiceImage();

  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingService, setEditingService] = useState<ProviderService | null>(
    null,
  );

  const [search, setSearch] = useState("");
  const [savingServiceId, setSavingServiceId] = useState<string | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(
    null,
  );
  const [servicePendingDelete, setServicePendingDelete] =
    useState<ProviderService | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const services = data ?? [];

  const query = search.trim().toLowerCase();

  const filteredServices = [...services]
    .filter((service) =>
      [service.category, service.description ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(query),
    )
    .sort((a, b) => Number(b.isActive) - Number(a.isActive));
  const activeCount = services.filter((service) => service.isActive).length;

  const openCreateForm = () => {
    setEditingService(null);
    setForm(emptyForm);
    setActionError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (service: ProviderService) => {
    setEditingService(service);
    const hasPresetCategory = serviceCategories.some(
      (category) => category === service.category,
    );
    setForm({
      category: hasPresetCategory ? service.category : "custom",
      customCategory: hasPresetCategory ? "" : service.category,
      price: String(service.price),
      pricingUnit: pricingUnitForType(service.pricingType),
      description: service.description ?? "",
      images: [],
    });
    setActionError(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (saving) return;
    setIsFormOpen(false);
    setEditingService(null);
    setForm(emptyForm);
  };

  const saveService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActionError(null);

    const price = Number(form.price);
    if (!Number.isInteger(price) || price < 0) {
      setActionError("Enter a valid whole-number price of zero or more.");
      return;
    }

    const category =
      form.category === "custom"
        ? form.customCategory.trim()
        : form.category.trim();
    if (!category || category.length > 80) {
      setActionError("Choose or enter a category up to 80 characters.");
      return;
    }
    if (!ProviderData) {
      setActionError("Your provider profile is not available.");
      return;
    }

    setSaving(true);
    try {
      const uploadedImagePaths = await Promise.all(
        form.images.map((file) => uploadServiceImage.mutateAsync(file)),
      );
      const input = {
        category,
        price,
        pricingType: pricingTypeForUnit(form.pricingUnit),
        description: form.description.trim(),
        ProductImages: [
          ...(editingService?.ProductImages ?? []).filter(
            (path): path is string => Boolean(path),
          ),
          ...uploadedImagePaths,
        ],
      };

      if (editingService) {
        const updatedService = await updateServiceMutation.mutateAsync({
          ...input,
          id: editingService.id,
        });

        if (!updatedService) {
          throw new Error("The service listing was not saved.");
        }
      } else {
        const createdService = await createService.mutateAsync({
          ...input,
          providerId: ProviderData.id,
          isActive: true,
        });

        if (!createdService) {
          throw new Error("The service listing was not saved.");
        }
      }
      setIsFormOpen(false);
      setEditingService(null);
      setForm(emptyForm);
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to save this service.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleService = async (service: ProviderService) => {
    setSavingServiceId(service.id);
    setActionError(null);
    try {
      const updatedService = await updateServiceMutation.mutateAsync({
        isActive: !service.isActive,
        id: service.id,
      });

      if (!updatedService) {
        throw new Error("The service listing was not saved.");
      }
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to update service availability.",
      );
    } finally {
      setSavingServiceId(null);
    }
  };

  const removeService = async () => {
    if (!servicePendingDelete) return;
    const service = servicePendingDelete;
    setDeletingServiceId(service.id);
    setActionError(null);
    try {
      await deleteServiceMutation.mutateAsync(service.id);
      setServicePendingDelete(null);
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to delete this service.",
      );
    } finally {
      setDeletingServiceId(null);
    }
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <ServiceManagementHeader
        isLoading={isLoading}
        onRefresh={() => void refetch()}
        onAddService={openCreateForm}
      />

      {(error || actionError) && (
        <div
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-700 dark:text-rose-300"
        >
          {actionError ?? (error instanceof Error ? error.message : error)}
        </div>
      )}

      {!isLoading && !error && data && !ProviderData && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800 dark:text-amber-200">
          Your provider profile is not ready yet. Service listings will be
          available once your provider profile is approved.
        </div>
      )}

      <ServiceManagementCard services={services} activeCount={activeCount} />

      <ServiceManagementListing
        services={services}
        filteredServices={filteredServices}
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        hasData={data !== undefined}
        hasProvider={Boolean(ProviderData)}
        savingServiceId={savingServiceId}
        deletingServiceId={deletingServiceId}
        onAddService={openCreateForm}
        onEditService={openEditForm}
        onToggleService={(service) => void toggleService(service)}
        onDeleteService={setServicePendingDelete}
      />

      {servicePendingDelete && (
        <DeleteServiceModal
          serviceName={servicePendingDelete.category}
          deleting={deletingServiceId === servicePendingDelete.id}
          onClose={() => {
            if (!deletingServiceId) setServicePendingDelete(null);
          }}
          onConfirm={() => void removeService()}
        />
      )}

      {isFormOpen && (
        <ServiceFormModal
          editing={Boolean(editingService)}
          form={form}
          saving={saving}
          error={actionError}
          onChange={setForm}
          onClose={closeForm}
          onSubmit={(event) => void saveService(event)}
        />
      )}
    </section>
  );
}
