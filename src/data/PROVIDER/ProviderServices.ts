import { fetchAuthSession } from "aws-amplify/auth";
import { getUrl, uploadData } from "aws-amplify/storage";
import { client } from "../../lib/amplify";
import { throwModelErrors } from "../../lib/errors";
import type {
  createProviderApplicationInput,
  CreateProviderServiceInput,
  UpdateServiceInput,
} from "../../lib/type";

// PROVIDER APPLICATION

export async function createProviderApplication(
  input: createProviderApplicationInput,
) {
  const { data, errors } = await client.mutations.createMyProviderApplication(
    input,
    { authMode: "userPool" },
  );

  throwModelErrors(errors, "Unable to create provider application.");

  return data;
}

export async function getCurrentProviderApplicationStatus(userId: string) {
  const { data, errors } = await client.models.ProviderApplication.list({
    filter: { userId: { eq: userId } },
    authMode: "userPool",
    selectionSet: ["id", "applicationStatus"],
  });

  throwModelErrors(errors, "Unable to load your provider application status.");
  return String(
    data?.find((application) => application !== null)?.applicationStatus ?? "",
  );
}

// export async function updateProviderApplication(input: {
//   id: string;
//   businessName?: string;
//   serviceArea?: string;
//   experience?: string;
//   CNICNAME?: string;
//   CNICNumber?: string;
//   bio?: string;
// }) {
//   const { data, errors } = await client.mutations.updateMyProviderApplication(
//     input,
//     { authMode: "userPool" },
//   );

//   throwModelErrors(errors, "Unable to update provider application.");

//   return data;
// }

// export async function getProviderApplication() {
//   const { data, errors } = await client.queries.getMyProviderApplication(
//     {},
//     { authMode: "userPool" },
//   );

//   throwModelErrors(errors, "Unable to fetch provider application.");

//   return data;
// }

// SERVICES

export async function createService(input: CreateProviderServiceInput) {
  const { data, errors } = await client.models.ProviderService.create(
    input as unknown as Parameters<
      typeof client.models.ProviderService.create
    >[0],
  );
  throwModelErrors(errors, "Unable to create listing.");
  return data;
}

export async function updateService(input: UpdateServiceInput) {
  const { data, errors } = await client.models.ProviderService.update(
    input as unknown as Parameters<
      typeof client.models.ProviderService.update
    >[0],
  );

  throwModelErrors(errors, "Unable to update listing.");

  return data;
}

export async function deleteService(id: string) {
  const { data, errors } = await client.models.ProviderService.delete({ id });

  throwModelErrors(errors, "Unable to delete listing.");
  return data;
}

export async function getServiceList() {
  const { data, errors } = await client.models.ProviderService.list();

  throwModelErrors(errors, "Unable to fetch services.");

  return data;
}

export async function getCurrentProvider(userId: string) {
  const { data, errors } = await client.models.NearFixProvider.list({
    filter: { userId: { eq: userId } },
    limit: 1,
  });

  throwModelErrors(errors, "Unable to load your provider profile.");
  return data?.find((provider) => provider !== null) ?? null;
}

export async function getProviderWorkspace(providerId: string) {
  const [servicesResult, bookingsResult, reviewsResult] = await Promise.all([
    client.models.ProviderService.list({
      filter: { providerId: { eq: providerId } },
      limit: 200,
    }),
    client.models.Booking.list({
      filter: { providerId: { eq: providerId } },
      limit: 200,
    }),
    client.models.Reviews.list({
      filter: { revieweeId: { eq: providerId } },
      limit: 200,
    }),
  ]);

  throwModelErrors(servicesResult.errors, "Unable to load provider services.");
  throwModelErrors(bookingsResult.errors, "Unable to load provider bookings.");
  throwModelErrors(reviewsResult.errors, "Unable to load provider reviews.");

  return {
    services: (servicesResult.data ?? [])
      .filter((service) => service !== null)
      .map((service) => ({
        id: service.id,
        category: service.category ?? "",
        price: service.price ?? 0,
        isActive: service.isActive ?? false,
      })),
    bookings: (bookingsResult.data ?? [])
      .filter((booking) => booking !== null)
      .map((booking) => ({
        id: booking.id,
        providerServiceId: booking.providerServiceId ?? "",
        status: booking.status ?? null,
        createdAt: booking.createdAt ?? "",
        updatedAt: booking.updatedAt ?? "",
        completedAt: booking.completedAt ?? null,
      })),
    reviews: (reviewsResult.data ?? [])
      .filter((review) => review !== null)
      .map((review) => ({
        id: review.id,
        rating: review.rating ?? 0,
        comment: review.comment ?? null,
        bookingId: review.bookingId ?? "",
        reviewerId: review.reviewerId ?? "",
        createdAt: review.createdAt ?? "",
      })),
  };
}

export async function getProviderDocumentUrl(path: string) {
  const { url } = await getUrl({ path, options: { expiresIn: 60 } });
  return url.toString();
}

export async function uploadProviderDocument({
  file,
  fileType,
}: {
  file: File;
  fileType: string;
}) {
  if (!/^[a-zA-Z0-9_-]+$/.test(fileType)) {
    throw new Error(
      "Document type must contain only letters, numbers, - or _.",
    );
  }

  const { identityId } = await fetchAuthSession();
  if (!identityId) throw new Error("Sign in before uploading a document.");

  const path = `provider-applications/${identityId}/${fileType}/${crypto.randomUUID()}-${encodeURIComponent(file.name)}`;
  await uploadData({
    path,
    data: file,
    options: { contentType: file.type },
  }).result;
  return path;
}
