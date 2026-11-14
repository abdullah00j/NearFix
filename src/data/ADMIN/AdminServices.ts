import { generateClient } from "aws-amplify/data";
import { getUrl } from "aws-amplify/storage";
import type { Schema } from "../../../amplify/data/resource";
import { nonNullRecords, throwModelErrors } from "../../lib/errors";
import type { ProviderApplication } from "./AdminTypes";

const client = generateClient<Schema>();

export type AdminDashboardData = {
  users: Schema["NearFixUser"]["type"][];
  providers: Schema["NearFixProvider"]["type"][];
  bookings: Schema["Booking"]["type"][];
  categories: Schema["Category"]["type"][];
  services: Schema["ProviderService"]["type"][];
  notifications: Schema["Notification"]["type"][];
  providerApplications: ProviderApplication[];
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const [
    usersResult,
    providersResult,
    bookingsResult,
    categoriesResult,
    servicesResult,
    notificationsResult,
    applicationsResult,
  ] = await Promise.all([
    client.models.NearFixUser.list({ limit: 200 }),
    client.models.NearFixProvider.list({ limit: 200 }),
    client.models.Booking.list({ limit: 200 }),
    client.models.Category.list({ limit: 200 }),
    client.models.ProviderService.list({ limit: 200 }),
    client.models.Notification.list({ limit: 200 }),
    client.models.ProviderApplication.list({
      limit: 200,
      authMode: "userPool",
    }),
  ]);

  throwModelErrors(usersResult.errors, "Unable to load customers.");
  throwModelErrors(providersResult.errors, "Unable to load providers.");
  throwModelErrors(bookingsResult.errors, "Unable to load bookings.");
  throwModelErrors(categoriesResult.errors, "Unable to load categories.");
  throwModelErrors(servicesResult.errors, "Unable to load service listings.");
  throwModelErrors(notificationsResult.errors, "Unable to load notifications.");
  throwModelErrors(
    applicationsResult.errors,
    "Unable to load provider applications.",
  );

  const users = nonNullRecords(usersResult.data);
  const usersById = new Map<string, Schema["NearFixUser"]["type"]>(
    users.map((user) => [user.id, user] as const),
  );
  const providerApplications = nonNullRecords(applicationsResult.data)
    .filter(
      (application) =>
        application.applicationStatus === "PENDING" ||
        application.applicationStatus === "REJECTED",
    )
    .map((application) => {
      const user = usersById.get(application.userId);
      return {
        ...application,
        selfie: application.selfie ?? null,
        CNICNumber: application.CNICNumber ?? null,
        CNICNAME: application.CNICNAME ?? null,
        CNICFrontSide: application.CNICFrontSide ?? null,
        CNICBackSide: application.CNICBackSide ?? null,
        owner: application.owner ?? null,
        users: user
          ? {
              id: user.id,
              name: user.name,
              email: user.email,
              profileImage: user.profileImage,
            }
          : null,
      };
    });

  return {
    users,
    providers: nonNullRecords(providersResult.data),
    bookings: nonNullRecords(bookingsResult.data),
    categories: nonNullRecords(categoriesResult.data),
    services: nonNullRecords(servicesResult.data),
    notifications: nonNullRecords(notificationsResult.data),
    providerApplications,
  };
}

export async function updateAdminUserStatus(input: {
  id: string;
  status: "ACTIVE" | "WARNED" | "SUSPENDED";
}) {
  const result = await client.models.NearFixUser.update(input);
  throwModelErrors(result.errors, "Unable to update this user.");
  if (!result.data) throw new Error("The user status was not updated.");
  return result.data;
}

export async function createAdminCategory(name: string) {
  const input = { name, isActive: true } as unknown as Parameters<
    typeof client.models.Category.create
  >[0];
  const result = await client.models.Category.create(input);
  throwModelErrors(result.errors, "Unable to create this category.");
  if (!result.data) throw new Error("The category was not created.");
  return result.data;
}

export async function updateAdminCategory(input: {
  id: string;
  isActive: boolean;
}) {
  const result = await client.models.Category.update(
    input as unknown as Parameters<typeof client.models.Category.update>[0],
  );
  throwModelErrors(result.errors, "Unable to update this category.");
  if (!result.data) throw new Error("The category was not updated.");
  return result.data;
}

export async function updateAdminService(input: {
  id: string;
  isActive: boolean;
}) {
  const result = await client.models.ProviderService.update(
    input as unknown as Parameters<
      typeof client.models.ProviderService.update
    >[0],
  );
  throwModelErrors(result.errors, "Unable to update this service.");
  if (!result.data) throw new Error("The service listing was not updated.");
  return result.data;
}

export async function markAdminNotificationRead(id: string) {
  const result = await client.models.Notification.update({
    id,
    isRead: true,
  } as unknown as Parameters<typeof client.models.Notification.update>[0]);
  throwModelErrors(result.errors, "Unable to update this notification.");
  if (!result.data) throw new Error("The notification was not updated.");
  return result.data;
}

export async function reviewProviderApplication(input: {
  applicationId: string;
  applicationStatus: "APPROVED" | "REJECTED";
}) {
  const result = await client.mutations.reviewProviderApplication(input);
  throwModelErrors(result.errors, "Unable to update provider application.");
  if (!result.data) {
    throw new Error("The provider application status was not updated.");
  }
  return result.data;
}

export function observeAdminProviderApplications(
  onItems: (items: Schema["ProviderApplication"]["type"][]) => void,
  onError?: (error: Error) => void,
) {
  return client.models.ProviderApplication.observeQuery({
    authMode: "userPool",
  }).subscribe({
    next: ({ items }) => onItems(items),
    error: (error: unknown) =>
      onError?.(
        error instanceof Error
          ? error
          : new Error("Unable to observe provider applications."),
      ),
  });
}

export async function getAdminDocumentUrl(path: string) {
  const { url } = await getUrl({ path, options: { expiresIn: 60 } });
  return url.toString();
}
