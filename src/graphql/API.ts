/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Booking = {
  __typename: "Booking";
  arrivedAt?: string | null;
  canceledBy?: string | null;
  canceledReason?: string | null;
  completedAt?: string | null;
  coordinates?: string | null;
  createdAt: string;
  description?: string | null;
  id: string;
  location: string;
  photos?: Array<string | null> | null;
  provider?: NearFixProvider | null;
  providerId: string;
  providerServiceId: string;
  scheduledAt?: string | null;
  startedAt?: string | null;
  status?: BookingStatus | null;
  updatedAt: string;
  user?: NearFixUser | null;
  userId: string;
};

export type NearFixProvider = {
  __typename: "NearFixProvider";
  availabilityStatus: AvailabilityStatus;
  bio?: string | null;
  bookings?: ModelBookingConnection | null;
  businessName?: string | null;
  createdAt: string;
  experience?: string | null;
  id: string;
  owner?: string | null;
  reviews?: ModelReviewsConnection | null;
  serviceArea?: string | null;
  services?: ModelProviderServiceConnection | null;
  updatedAt: string;
  user?: NearFixUser | null;
  userId: string;
  verificationStatus: VerificationStatus;
};

export enum AvailabilityStatus {
  BUSY = "BUSY",
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
}

export type ModelBookingConnection = {
  __typename: "ModelBookingConnection";
  items: Array<Booking | null>;
  nextToken?: string | null;
};

export type ModelReviewsConnection = {
  __typename: "ModelReviewsConnection";
  items: Array<Reviews | null>;
  nextToken?: string | null;
};

export type Reviews = {
  __typename: "Reviews";
  bookingId: string;
  comment?: string | null;
  createdAt: string;
  id: string;
  provider?: NearFixProvider | null;
  rating: number;
  revieweeId: string;
  reviewerId: string;
  type?: ReviewsType | null;
  updatedAt: string;
  userReview?: NearFixUser | null;
};

export enum ReviewsType {
  CUSTOMER_TO_PROVIDER = "CUSTOMER_TO_PROVIDER",
  PROVIDER_TO_CUSTOMER = "PROVIDER_TO_CUSTOMER",
}

export type NearFixUser = {
  __typename: "NearFixUser";
  bookings?: ModelBookingConnection | null;
  createdAt: string;
  email: string;
  favourites?: ModelFavouriteConnection | null;
  id: string;
  isPhoneVerified?: boolean | null;
  location?: string | null;
  name: string;
  notifications?: ModelNotificationConnection | null;
  owner?: string | null;
  phone?: string | null;
  profileImage?: string | null;
  provider?: NearFixProvider | null;
  pushToken?: string | null;
  reviews?: ModelReviewsConnection | null;
  status: Status;
  supportTickets?: ModelSupportConnection | null;
  updatedAt: string;
  warnings?: ModelWarningConnection | null;
};

export type ModelFavouriteConnection = {
  __typename: "ModelFavouriteConnection";
  items: Array<Favourite | null>;
  nextToken?: string | null;
};

export type Favourite = {
  __typename: "Favourite";
  createdAt: string;
  id: string;
  owner?: string | null;
  providerId: string;
  updatedAt: string;
  user?: NearFixUser | null;
  userId: string;
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection";
  items: Array<Notification | null>;
  nextToken?: string | null;
};

export type Notification = {
  __typename: "Notification";
  createdAt: string;
  description?: string | null;
  id: string;
  isRead?: boolean | null;
  owner?: string | null;
  providerId?: string | null;
  title?: string | null;
  updatedAt: string;
  user?: NearFixUser | null;
  userId: string;
};

export enum Status {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  WARNED = "WARNED",
}

export type ModelSupportConnection = {
  __typename: "ModelSupportConnection";
  items: Array<Support | null>;
  nextToken?: string | null;
};

export type Support = {
  __typename: "Support";
  adminResponse?: string | null;
  againstUserId?: string | null;
  attachments?: Array<string | null> | null;
  complaint: string;
  createdAt: string;
  id: string;
  owner?: string | null;
  resolvedAt?: string | null;
  resolvedBy?: string | null;
  status?: SupportStatus | null;
  submitterRole: SubmitterRole;
  updatedAt: string;
  user?: NearFixUser | null;
  userId: string;
};

export enum SupportStatus {
  IN_REVIEW = "IN_REVIEW",
  OPEN = "OPEN",
  RESOLVED = "RESOLVED",
}

export enum SubmitterRole {
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
}

export type ModelWarningConnection = {
  __typename: "ModelWarningConnection";
  items: Array<Warning | null>;
  nextToken?: string | null;
};

export type Warning = {
  __typename: "Warning";
  createdAt: string;
  id: string;
  issuedBy: string;
  issuedTo: string;
  reason: string;
  supportId?: string | null;
  updatedAt: string;
  userWarnngs?: NearFixUser | null;
};

export type ModelProviderServiceConnection = {
  __typename: "ModelProviderServiceConnection";
  items: Array<ProviderService | null>;
  nextToken?: string | null;
};

export type ProviderService = {
  __typename: "ProviderService";
  category: string;
  createdAt: string;
  description?: string | null;
  id: string;
  isActive?: boolean | null;
  owner?: string | null;
  price: number;
  provider?: NearFixProvider | null;
  providerId: string;
  updatedAt: string;
};

export enum VerificationStatus {
  APPROVED = "APPROVED",
  CHANGE_REQUESTED = "CHANGE_REQUESTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum BookingStatus {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

export type Category = {
  __typename: "Category";
  createdAt: string;
  id: string;
  isActive?: boolean | null;
  name: string;
  updatedAt: string;
};

export type ModelBookingFilterInput = {
  and?: Array<ModelBookingFilterInput | null> | null;
  arrivedAt?: ModelStringInput | null;
  canceledBy?: ModelStringInput | null;
  canceledReason?: ModelStringInput | null;
  completedAt?: ModelStringInput | null;
  coordinates?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  id?: ModelIDInput | null;
  location?: ModelStringInput | null;
  not?: ModelBookingFilterInput | null;
  or?: Array<ModelBookingFilterInput | null> | null;
  photos?: ModelStringInput | null;
  providerId?: ModelStringInput | null;
  providerServiceId?: ModelStringInput | null;
  scheduledAt?: ModelStringInput | null;
  startedAt?: ModelStringInput | null;
  status?: ModelBookingStatusInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
};

export type ModelStringInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}

export type ModelSizeInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
};

export type ModelIDInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  size?: ModelSizeInput | null;
};

export type ModelBookingStatusInput = {
  eq?: BookingStatus | null;
  ne?: BookingStatus | null;
};

export type ModelCategoryFilterInput = {
  and?: Array<ModelCategoryFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  isActive?: ModelBooleanInput | null;
  name?: ModelStringInput | null;
  not?: ModelCategoryFilterInput | null;
  or?: Array<ModelCategoryFilterInput | null> | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  eq?: boolean | null;
  ne?: boolean | null;
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection";
  items: Array<Category | null>;
  nextToken?: string | null;
};

export type ModelFavouriteFilterInput = {
  and?: Array<ModelFavouriteFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelFavouriteFilterInput | null;
  or?: Array<ModelFavouriteFilterInput | null> | null;
  owner?: ModelStringInput | null;
  providerId?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
};

export type ModelNearFixProviderFilterInput = {
  and?: Array<ModelNearFixProviderFilterInput | null> | null;
  availabilityStatus?: ModelAvailabilityStatusInput | null;
  bio?: ModelStringInput | null;
  businessName?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  experience?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelNearFixProviderFilterInput | null;
  or?: Array<ModelNearFixProviderFilterInput | null> | null;
  owner?: ModelStringInput | null;
  serviceArea?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
  verificationStatus?: ModelVerificationStatusInput | null;
};

export type ModelAvailabilityStatusInput = {
  eq?: AvailabilityStatus | null;
  ne?: AvailabilityStatus | null;
};

export type ModelVerificationStatusInput = {
  eq?: VerificationStatus | null;
  ne?: VerificationStatus | null;
};

export type ModelNearFixProviderConnection = {
  __typename: "ModelNearFixProviderConnection";
  items: Array<NearFixProvider | null>;
  nextToken?: string | null;
};

export type ModelNearFixUserFilterInput = {
  and?: Array<ModelNearFixUserFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  email?: ModelStringInput | null;
  id?: ModelIDInput | null;
  isPhoneVerified?: ModelBooleanInput | null;
  location?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelNearFixUserFilterInput | null;
  or?: Array<ModelNearFixUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  profileImage?: ModelStringInput | null;
  pushToken?: ModelStringInput | null;
  status?: ModelStatusInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelStatusInput = {
  eq?: Status | null;
  ne?: Status | null;
};

export type ModelNearFixUserConnection = {
  __typename: "ModelNearFixUserConnection";
  items: Array<NearFixUser | null>;
  nextToken?: string | null;
};

export type ModelNotificationFilterInput = {
  and?: Array<ModelNotificationFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  id?: ModelIDInput | null;
  isRead?: ModelBooleanInput | null;
  not?: ModelNotificationFilterInput | null;
  or?: Array<ModelNotificationFilterInput | null> | null;
  owner?: ModelStringInput | null;
  providerId?: ModelStringInput | null;
  title?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
};

export type ModelProviderServiceFilterInput = {
  and?: Array<ModelProviderServiceFilterInput | null> | null;
  category?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  id?: ModelIDInput | null;
  isActive?: ModelBooleanInput | null;
  not?: ModelProviderServiceFilterInput | null;
  or?: Array<ModelProviderServiceFilterInput | null> | null;
  owner?: ModelStringInput | null;
  price?: ModelIntInput | null;
  providerId?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelIntInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
};

export type ModelReviewsFilterInput = {
  and?: Array<ModelReviewsFilterInput | null> | null;
  bookingId?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelReviewsFilterInput | null;
  or?: Array<ModelReviewsFilterInput | null> | null;
  rating?: ModelIntInput | null;
  revieweeId?: ModelStringInput | null;
  reviewerId?: ModelStringInput | null;
  type?: ModelReviewsTypeInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelReviewsTypeInput = {
  eq?: ReviewsType | null;
  ne?: ReviewsType | null;
};

export type ModelSupportFilterInput = {
  adminResponse?: ModelStringInput | null;
  againstUserId?: ModelStringInput | null;
  and?: Array<ModelSupportFilterInput | null> | null;
  attachments?: ModelStringInput | null;
  complaint?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelSupportFilterInput | null;
  or?: Array<ModelSupportFilterInput | null> | null;
  owner?: ModelStringInput | null;
  resolvedAt?: ModelStringInput | null;
  resolvedBy?: ModelStringInput | null;
  status?: ModelSupportStatusInput | null;
  submitterRole?: ModelSubmitterRoleInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
};

export type ModelSupportStatusInput = {
  eq?: SupportStatus | null;
  ne?: SupportStatus | null;
};

export type ModelSubmitterRoleInput = {
  eq?: SubmitterRole | null;
  ne?: SubmitterRole | null;
};

export type ModelWarningFilterInput = {
  and?: Array<ModelWarningFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  issuedBy?: ModelStringInput | null;
  issuedTo?: ModelStringInput | null;
  not?: ModelWarningFilterInput | null;
  or?: Array<ModelWarningFilterInput | null> | null;
  reason?: ModelStringInput | null;
  supportId?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelBookingConditionInput = {
  and?: Array<ModelBookingConditionInput | null> | null;
  arrivedAt?: ModelStringInput | null;
  canceledBy?: ModelStringInput | null;
  canceledReason?: ModelStringInput | null;
  completedAt?: ModelStringInput | null;
  coordinates?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  location?: ModelStringInput | null;
  not?: ModelBookingConditionInput | null;
  or?: Array<ModelBookingConditionInput | null> | null;
  photos?: ModelStringInput | null;
  providerId?: ModelStringInput | null;
  providerServiceId?: ModelStringInput | null;
  scheduledAt?: ModelStringInput | null;
  startedAt?: ModelStringInput | null;
  status?: ModelBookingStatusInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
};

export type CreateBookingInput = {
  arrivedAt?: string | null;
  canceledBy?: string | null;
  canceledReason?: string | null;
  completedAt?: string | null;
  coordinates?: string | null;
  description?: string | null;
  id?: string | null;
  location: string;
  photos?: Array<string | null> | null;
  providerId: string;
  providerServiceId: string;
  scheduledAt?: string | null;
  startedAt?: string | null;
  status?: BookingStatus | null;
  userId: string;
};

export type ModelCategoryConditionInput = {
  and?: Array<ModelCategoryConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  isActive?: ModelBooleanInput | null;
  name?: ModelStringInput | null;
  not?: ModelCategoryConditionInput | null;
  or?: Array<ModelCategoryConditionInput | null> | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateCategoryInput = {
  id?: string | null;
  isActive?: boolean | null;
  name: string;
};

export type ModelFavouriteConditionInput = {
  and?: Array<ModelFavouriteConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  not?: ModelFavouriteConditionInput | null;
  or?: Array<ModelFavouriteConditionInput | null> | null;
  owner?: ModelStringInput | null;
  providerId?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
};

export type CreateFavouriteInput = {
  id?: string | null;
  providerId: string;
  userId: string;
};

export type ModelNearFixProviderConditionInput = {
  and?: Array<ModelNearFixProviderConditionInput | null> | null;
  availabilityStatus?: ModelAvailabilityStatusInput | null;
  bio?: ModelStringInput | null;
  businessName?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  experience?: ModelStringInput | null;
  not?: ModelNearFixProviderConditionInput | null;
  or?: Array<ModelNearFixProviderConditionInput | null> | null;
  owner?: ModelStringInput | null;
  serviceArea?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
  verificationStatus?: ModelVerificationStatusInput | null;
};

export type CreateNearFixProviderInput = {
  availabilityStatus: AvailabilityStatus;
  bio?: string | null;
  businessName?: string | null;
  experience?: string | null;
  id?: string | null;
  serviceArea?: string | null;
  userId: string;
  verificationStatus: VerificationStatus;
};

export type ModelNearFixUserConditionInput = {
  and?: Array<ModelNearFixUserConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  email?: ModelStringInput | null;
  isPhoneVerified?: ModelBooleanInput | null;
  location?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelNearFixUserConditionInput | null;
  or?: Array<ModelNearFixUserConditionInput | null> | null;
  owner?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  profileImage?: ModelStringInput | null;
  pushToken?: ModelStringInput | null;
  status?: ModelStatusInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateNearFixUserInput = {
  email: string;
  id?: string | null;
  isPhoneVerified?: boolean | null;
  location?: string | null;
  name: string;
  phone?: string | null;
  profileImage?: string | null;
  pushToken?: string | null;
  status: Status;
};

export type ModelNotificationConditionInput = {
  and?: Array<ModelNotificationConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  isRead?: ModelBooleanInput | null;
  not?: ModelNotificationConditionInput | null;
  or?: Array<ModelNotificationConditionInput | null> | null;
  owner?: ModelStringInput | null;
  providerId?: ModelStringInput | null;
  title?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
};

export type CreateNotificationInput = {
  description?: string | null;
  id?: string | null;
  isRead?: boolean | null;
  providerId?: string | null;
  title?: string | null;
  userId: string;
};

export type ModelProviderServiceConditionInput = {
  and?: Array<ModelProviderServiceConditionInput | null> | null;
  category?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  isActive?: ModelBooleanInput | null;
  not?: ModelProviderServiceConditionInput | null;
  or?: Array<ModelProviderServiceConditionInput | null> | null;
  owner?: ModelStringInput | null;
  price?: ModelIntInput | null;
  providerId?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateProviderServiceInput = {
  category: string;
  description?: string | null;
  id?: string | null;
  isActive?: boolean | null;
  price: number;
  providerId: string;
};

export type ModelReviewsConditionInput = {
  and?: Array<ModelReviewsConditionInput | null> | null;
  bookingId?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  not?: ModelReviewsConditionInput | null;
  or?: Array<ModelReviewsConditionInput | null> | null;
  rating?: ModelIntInput | null;
  revieweeId?: ModelStringInput | null;
  reviewerId?: ModelStringInput | null;
  type?: ModelReviewsTypeInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateReviewsInput = {
  bookingId: string;
  comment?: string | null;
  id?: string | null;
  rating: number;
  revieweeId: string;
  reviewerId: string;
  type?: ReviewsType | null;
};

export type ModelSupportConditionInput = {
  adminResponse?: ModelStringInput | null;
  againstUserId?: ModelStringInput | null;
  and?: Array<ModelSupportConditionInput | null> | null;
  attachments?: ModelStringInput | null;
  complaint?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  not?: ModelSupportConditionInput | null;
  or?: Array<ModelSupportConditionInput | null> | null;
  owner?: ModelStringInput | null;
  resolvedAt?: ModelStringInput | null;
  resolvedBy?: ModelStringInput | null;
  status?: ModelSupportStatusInput | null;
  submitterRole?: ModelSubmitterRoleInput | null;
  updatedAt?: ModelStringInput | null;
  userId?: ModelStringInput | null;
};

export type CreateSupportInput = {
  adminResponse?: string | null;
  againstUserId?: string | null;
  attachments?: Array<string | null> | null;
  complaint: string;
  id?: string | null;
  resolvedAt?: string | null;
  resolvedBy?: string | null;
  status?: SupportStatus | null;
  submitterRole: SubmitterRole;
  userId: string;
};

export type ModelWarningConditionInput = {
  and?: Array<ModelWarningConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  issuedBy?: ModelStringInput | null;
  issuedTo?: ModelStringInput | null;
  not?: ModelWarningConditionInput | null;
  or?: Array<ModelWarningConditionInput | null> | null;
  reason?: ModelStringInput | null;
  supportId?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateWarningInput = {
  id?: string | null;
  issuedBy: string;
  issuedTo: string;
  reason: string;
  supportId?: string | null;
};

export type DeleteBookingInput = {
  id: string;
};

export type DeleteCategoryInput = {
  id: string;
};

export type DeleteFavouriteInput = {
  id: string;
};

export type DeleteNearFixProviderInput = {
  id: string;
};

export type DeleteNearFixUserInput = {
  id: string;
};

export type DeleteNotificationInput = {
  id: string;
};

export type DeleteProviderServiceInput = {
  id: string;
};

export type DeleteReviewsInput = {
  id: string;
};

export type DeleteSupportInput = {
  id: string;
};

export type DeleteWarningInput = {
  id: string;
};

export type UpdateBookingInput = {
  arrivedAt?: string | null;
  canceledBy?: string | null;
  canceledReason?: string | null;
  completedAt?: string | null;
  coordinates?: string | null;
  description?: string | null;
  id: string;
  location?: string | null;
  photos?: Array<string | null> | null;
  providerId?: string | null;
  providerServiceId?: string | null;
  scheduledAt?: string | null;
  startedAt?: string | null;
  status?: BookingStatus | null;
  userId?: string | null;
};

export type UpdateCategoryInput = {
  id: string;
  isActive?: boolean | null;
  name?: string | null;
};

export type UpdateFavouriteInput = {
  id: string;
  providerId?: string | null;
  userId?: string | null;
};

export type UpdateNearFixProviderInput = {
  availabilityStatus?: AvailabilityStatus | null;
  bio?: string | null;
  businessName?: string | null;
  experience?: string | null;
  id: string;
  serviceArea?: string | null;
  userId?: string | null;
  verificationStatus?: VerificationStatus | null;
};

export type UpdateNearFixUserInput = {
  email?: string | null;
  id: string;
  isPhoneVerified?: boolean | null;
  location?: string | null;
  name?: string | null;
  phone?: string | null;
  profileImage?: string | null;
  pushToken?: string | null;
  status?: Status | null;
};

export type UpdateNotificationInput = {
  description?: string | null;
  id: string;
  isRead?: boolean | null;
  providerId?: string | null;
  title?: string | null;
  userId?: string | null;
};

export type UpdateProviderServiceInput = {
  category?: string | null;
  description?: string | null;
  id: string;
  isActive?: boolean | null;
  price?: number | null;
  providerId?: string | null;
};

export type UpdateReviewsInput = {
  bookingId?: string | null;
  comment?: string | null;
  id: string;
  rating?: number | null;
  revieweeId?: string | null;
  reviewerId?: string | null;
  type?: ReviewsType | null;
};

export type UpdateSupportInput = {
  adminResponse?: string | null;
  againstUserId?: string | null;
  attachments?: Array<string | null> | null;
  complaint?: string | null;
  id: string;
  resolvedAt?: string | null;
  resolvedBy?: string | null;
  status?: SupportStatus | null;
  submitterRole?: SubmitterRole | null;
  userId?: string | null;
};

export type UpdateWarningInput = {
  id: string;
  issuedBy?: string | null;
  issuedTo?: string | null;
  reason?: string | null;
  supportId?: string | null;
};

export type ModelSubscriptionBookingFilterInput = {
  and?: Array<ModelSubscriptionBookingFilterInput | null> | null;
  arrivedAt?: ModelSubscriptionStringInput | null;
  canceledBy?: ModelSubscriptionStringInput | null;
  canceledReason?: ModelSubscriptionStringInput | null;
  completedAt?: ModelSubscriptionStringInput | null;
  coordinates?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  location?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionBookingFilterInput | null> | null;
  photos?: ModelSubscriptionStringInput | null;
  providerId?: ModelStringInput | null;
  providerServiceId?: ModelSubscriptionStringInput | null;
  scheduledAt?: ModelSubscriptionStringInput | null;
  startedAt?: ModelSubscriptionStringInput | null;
  status?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  userId?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  in?: Array<string | null> | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  in?: Array<string | null> | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionCategoryFilterInput = {
  and?: Array<ModelSubscriptionCategoryFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  isActive?: ModelSubscriptionBooleanInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionCategoryFilterInput | null> | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

export type ModelSubscriptionFavouriteFilterInput = {
  and?: Array<ModelSubscriptionFavouriteFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionFavouriteFilterInput | null> | null;
  owner?: ModelStringInput | null;
  providerId?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  userId?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionNearFixProviderFilterInput = {
  and?: Array<ModelSubscriptionNearFixProviderFilterInput | null> | null;
  availabilityStatus?: ModelSubscriptionStringInput | null;
  bio?: ModelSubscriptionStringInput | null;
  businessName?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  experience?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionNearFixProviderFilterInput | null> | null;
  owner?: ModelStringInput | null;
  serviceArea?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  userId?: ModelSubscriptionStringInput | null;
  verificationStatus?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionNearFixUserFilterInput = {
  and?: Array<ModelSubscriptionNearFixUserFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  isPhoneVerified?: ModelSubscriptionBooleanInput | null;
  location?: ModelSubscriptionStringInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionNearFixUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  phone?: ModelSubscriptionStringInput | null;
  profileImage?: ModelSubscriptionStringInput | null;
  pushToken?: ModelSubscriptionStringInput | null;
  status?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionNotificationFilterInput = {
  and?: Array<ModelSubscriptionNotificationFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  isRead?: ModelSubscriptionBooleanInput | null;
  or?: Array<ModelSubscriptionNotificationFilterInput | null> | null;
  owner?: ModelStringInput | null;
  providerId?: ModelSubscriptionStringInput | null;
  title?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  userId?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionProviderServiceFilterInput = {
  and?: Array<ModelSubscriptionProviderServiceFilterInput | null> | null;
  category?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  isActive?: ModelSubscriptionBooleanInput | null;
  or?: Array<ModelSubscriptionProviderServiceFilterInput | null> | null;
  owner?: ModelStringInput | null;
  price?: ModelSubscriptionIntInput | null;
  providerId?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionIntInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  in?: Array<number | null> | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionReviewsFilterInput = {
  and?: Array<ModelSubscriptionReviewsFilterInput | null> | null;
  bookingId?: ModelSubscriptionStringInput | null;
  comment?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionReviewsFilterInput | null> | null;
  rating?: ModelSubscriptionIntInput | null;
  revieweeId?: ModelSubscriptionStringInput | null;
  reviewerId?: ModelStringInput | null;
  type?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionSupportFilterInput = {
  adminResponse?: ModelSubscriptionStringInput | null;
  againstUserId?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionSupportFilterInput | null> | null;
  attachments?: ModelSubscriptionStringInput | null;
  complaint?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionSupportFilterInput | null> | null;
  owner?: ModelStringInput | null;
  resolvedAt?: ModelSubscriptionStringInput | null;
  resolvedBy?: ModelSubscriptionStringInput | null;
  status?: ModelSubscriptionStringInput | null;
  submitterRole?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  userId?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionWarningFilterInput = {
  and?: Array<ModelSubscriptionWarningFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  issuedBy?: ModelSubscriptionStringInput | null;
  issuedTo?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionWarningFilterInput | null> | null;
  reason?: ModelSubscriptionStringInput | null;
  supportId?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type GetBookingQueryVariables = {
  id: string;
};

export type GetBookingQuery = {
  getBooking?: {
    __typename: "Booking";
    arrivedAt?: string | null;
    canceledBy?: string | null;
    canceledReason?: string | null;
    completedAt?: string | null;
    coordinates?: string | null;
    createdAt: string;
    description?: string | null;
    id: string;
    location: string;
    photos?: Array<string | null> | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    providerServiceId: string;
    scheduledAt?: string | null;
    startedAt?: string | null;
    status?: BookingStatus | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type GetCategoryQueryVariables = {
  id: string;
};

export type GetCategoryQuery = {
  getCategory?: {
    __typename: "Category";
    createdAt: string;
    id: string;
    isActive?: boolean | null;
    name: string;
    updatedAt: string;
  } | null;
};

export type GetFavouriteQueryVariables = {
  id: string;
};

export type GetFavouriteQuery = {
  getFavourite?: {
    __typename: "Favourite";
    createdAt: string;
    id: string;
    owner?: string | null;
    providerId: string;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type GetNearFixProviderQueryVariables = {
  id: string;
};

export type GetNearFixProviderQuery = {
  getNearFixProvider?: {
    __typename: "NearFixProvider";
    availabilityStatus: AvailabilityStatus;
    bio?: string | null;
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    businessName?: string | null;
    createdAt: string;
    experience?: string | null;
    id: string;
    owner?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    serviceArea?: string | null;
    services?: {
      __typename: "ModelProviderServiceConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
    verificationStatus: VerificationStatus;
  } | null;
};

export type GetNearFixUserQueryVariables = {
  id: string;
};

export type GetNearFixUserQuery = {
  getNearFixUser?: {
    __typename: "NearFixUser";
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    email: string;
    favourites?: {
      __typename: "ModelFavouriteConnection";
      nextToken?: string | null;
    } | null;
    id: string;
    isPhoneVerified?: boolean | null;
    location?: string | null;
    name: string;
    notifications?: {
      __typename: "ModelNotificationConnection";
      nextToken?: string | null;
    } | null;
    owner?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    pushToken?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    status: Status;
    supportTickets?: {
      __typename: "ModelSupportConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    warnings?: {
      __typename: "ModelWarningConnection";
      nextToken?: string | null;
    } | null;
  } | null;
};

export type GetNotificationQueryVariables = {
  id: string;
};

export type GetNotificationQuery = {
  getNotification?: {
    __typename: "Notification";
    createdAt: string;
    description?: string | null;
    id: string;
    isRead?: boolean | null;
    owner?: string | null;
    providerId?: string | null;
    title?: string | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type GetProviderServiceQueryVariables = {
  id: string;
};

export type GetProviderServiceQuery = {
  getProviderService?: {
    __typename: "ProviderService";
    category: string;
    createdAt: string;
    description?: string | null;
    id: string;
    isActive?: boolean | null;
    owner?: string | null;
    price: number;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    updatedAt: string;
  } | null;
};

export type GetReviewsQueryVariables = {
  id: string;
};

export type GetReviewsQuery = {
  getReviews?: {
    __typename: "Reviews";
    bookingId: string;
    comment?: string | null;
    createdAt: string;
    id: string;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    rating: number;
    revieweeId: string;
    reviewerId: string;
    type?: ReviewsType | null;
    updatedAt: string;
    userReview?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type GetSupportQueryVariables = {
  id: string;
};

export type GetSupportQuery = {
  getSupport?: {
    __typename: "Support";
    adminResponse?: string | null;
    againstUserId?: string | null;
    attachments?: Array<string | null> | null;
    complaint: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    resolvedAt?: string | null;
    resolvedBy?: string | null;
    status?: SupportStatus | null;
    submitterRole: SubmitterRole;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type GetWarningQueryVariables = {
  id: string;
};

export type GetWarningQuery = {
  getWarning?: {
    __typename: "Warning";
    createdAt: string;
    id: string;
    issuedBy: string;
    issuedTo: string;
    reason: string;
    supportId?: string | null;
    updatedAt: string;
    userWarnngs?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type ListBookingsQueryVariables = {
  filter?: ModelBookingFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListBookingsQuery = {
  listBookings?: {
    __typename: "ModelBookingConnection";
    items: Array<{
      __typename: "Booking";
      arrivedAt?: string | null;
      canceledBy?: string | null;
      canceledReason?: string | null;
      completedAt?: string | null;
      coordinates?: string | null;
      createdAt: string;
      description?: string | null;
      id: string;
      location: string;
      photos?: Array<string | null> | null;
      providerId: string;
      providerServiceId: string;
      scheduledAt?: string | null;
      startedAt?: string | null;
      status?: BookingStatus | null;
      updatedAt: string;
      userId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListCategoriesQuery = {
  listCategories?: {
    __typename: "ModelCategoryConnection";
    items: Array<{
      __typename: "Category";
      createdAt: string;
      id: string;
      isActive?: boolean | null;
      name: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListFavouritesQueryVariables = {
  filter?: ModelFavouriteFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListFavouritesQuery = {
  listFavourites?: {
    __typename: "ModelFavouriteConnection";
    items: Array<{
      __typename: "Favourite";
      createdAt: string;
      id: string;
      owner?: string | null;
      providerId: string;
      updatedAt: string;
      userId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListNearFixProvidersQueryVariables = {
  filter?: ModelNearFixProviderFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListNearFixProvidersQuery = {
  listNearFixProviders?: {
    __typename: "ModelNearFixProviderConnection";
    items: Array<{
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListNearFixUsersQueryVariables = {
  filter?: ModelNearFixUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListNearFixUsersQuery = {
  listNearFixUsers?: {
    __typename: "ModelNearFixUserConnection";
    items: Array<{
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListNotificationsQuery = {
  listNotifications?: {
    __typename: "ModelNotificationConnection";
    items: Array<{
      __typename: "Notification";
      createdAt: string;
      description?: string | null;
      id: string;
      isRead?: boolean | null;
      owner?: string | null;
      providerId?: string | null;
      title?: string | null;
      updatedAt: string;
      userId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListProviderServicesQueryVariables = {
  filter?: ModelProviderServiceFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListProviderServicesQuery = {
  listProviderServices?: {
    __typename: "ModelProviderServiceConnection";
    items: Array<{
      __typename: "ProviderService";
      category: string;
      createdAt: string;
      description?: string | null;
      id: string;
      isActive?: boolean | null;
      owner?: string | null;
      price: number;
      providerId: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListReviewsQueryVariables = {
  filter?: ModelReviewsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListReviewsQuery = {
  listReviews?: {
    __typename: "ModelReviewsConnection";
    items: Array<{
      __typename: "Reviews";
      bookingId: string;
      comment?: string | null;
      createdAt: string;
      id: string;
      rating: number;
      revieweeId: string;
      reviewerId: string;
      type?: ReviewsType | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListSupportsQueryVariables = {
  filter?: ModelSupportFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListSupportsQuery = {
  listSupports?: {
    __typename: "ModelSupportConnection";
    items: Array<{
      __typename: "Support";
      adminResponse?: string | null;
      againstUserId?: string | null;
      attachments?: Array<string | null> | null;
      complaint: string;
      createdAt: string;
      id: string;
      owner?: string | null;
      resolvedAt?: string | null;
      resolvedBy?: string | null;
      status?: SupportStatus | null;
      submitterRole: SubmitterRole;
      updatedAt: string;
      userId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListWarningsQueryVariables = {
  filter?: ModelWarningFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListWarningsQuery = {
  listWarnings?: {
    __typename: "ModelWarningConnection";
    items: Array<{
      __typename: "Warning";
      createdAt: string;
      id: string;
      issuedBy: string;
      issuedTo: string;
      reason: string;
      supportId?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type CreateBookingMutationVariables = {
  condition?: ModelBookingConditionInput | null;
  input: CreateBookingInput;
};

export type CreateBookingMutation = {
  createBooking?: {
    __typename: "Booking";
    arrivedAt?: string | null;
    canceledBy?: string | null;
    canceledReason?: string | null;
    completedAt?: string | null;
    coordinates?: string | null;
    createdAt: string;
    description?: string | null;
    id: string;
    location: string;
    photos?: Array<string | null> | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    providerServiceId: string;
    scheduledAt?: string | null;
    startedAt?: string | null;
    status?: BookingStatus | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type CreateCategoryMutationVariables = {
  condition?: ModelCategoryConditionInput | null;
  input: CreateCategoryInput;
};

export type CreateCategoryMutation = {
  createCategory?: {
    __typename: "Category";
    createdAt: string;
    id: string;
    isActive?: boolean | null;
    name: string;
    updatedAt: string;
  } | null;
};

export type CreateFavouriteMutationVariables = {
  condition?: ModelFavouriteConditionInput | null;
  input: CreateFavouriteInput;
};

export type CreateFavouriteMutation = {
  createFavourite?: {
    __typename: "Favourite";
    createdAt: string;
    id: string;
    owner?: string | null;
    providerId: string;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type CreateNearFixProviderMutationVariables = {
  condition?: ModelNearFixProviderConditionInput | null;
  input: CreateNearFixProviderInput;
};

export type CreateNearFixProviderMutation = {
  createNearFixProvider?: {
    __typename: "NearFixProvider";
    availabilityStatus: AvailabilityStatus;
    bio?: string | null;
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    businessName?: string | null;
    createdAt: string;
    experience?: string | null;
    id: string;
    owner?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    serviceArea?: string | null;
    services?: {
      __typename: "ModelProviderServiceConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
    verificationStatus: VerificationStatus;
  } | null;
};

export type CreateNearFixUserMutationVariables = {
  condition?: ModelNearFixUserConditionInput | null;
  input: CreateNearFixUserInput;
};

export type CreateNearFixUserMutation = {
  createNearFixUser?: {
    __typename: "NearFixUser";
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    email: string;
    favourites?: {
      __typename: "ModelFavouriteConnection";
      nextToken?: string | null;
    } | null;
    id: string;
    isPhoneVerified?: boolean | null;
    location?: string | null;
    name: string;
    notifications?: {
      __typename: "ModelNotificationConnection";
      nextToken?: string | null;
    } | null;
    owner?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    pushToken?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    status: Status;
    supportTickets?: {
      __typename: "ModelSupportConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    warnings?: {
      __typename: "ModelWarningConnection";
      nextToken?: string | null;
    } | null;
  } | null;
};

export type CreateNotificationMutationVariables = {
  condition?: ModelNotificationConditionInput | null;
  input: CreateNotificationInput;
};

export type CreateNotificationMutation = {
  createNotification?: {
    __typename: "Notification";
    createdAt: string;
    description?: string | null;
    id: string;
    isRead?: boolean | null;
    owner?: string | null;
    providerId?: string | null;
    title?: string | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type CreateProviderServiceMutationVariables = {
  condition?: ModelProviderServiceConditionInput | null;
  input: CreateProviderServiceInput;
};

export type CreateProviderServiceMutation = {
  createProviderService?: {
    __typename: "ProviderService";
    category: string;
    createdAt: string;
    description?: string | null;
    id: string;
    isActive?: boolean | null;
    owner?: string | null;
    price: number;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    updatedAt: string;
  } | null;
};

export type CreateReviewsMutationVariables = {
  condition?: ModelReviewsConditionInput | null;
  input: CreateReviewsInput;
};

export type CreateReviewsMutation = {
  createReviews?: {
    __typename: "Reviews";
    bookingId: string;
    comment?: string | null;
    createdAt: string;
    id: string;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    rating: number;
    revieweeId: string;
    reviewerId: string;
    type?: ReviewsType | null;
    updatedAt: string;
    userReview?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type CreateSupportMutationVariables = {
  condition?: ModelSupportConditionInput | null;
  input: CreateSupportInput;
};

export type CreateSupportMutation = {
  createSupport?: {
    __typename: "Support";
    adminResponse?: string | null;
    againstUserId?: string | null;
    attachments?: Array<string | null> | null;
    complaint: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    resolvedAt?: string | null;
    resolvedBy?: string | null;
    status?: SupportStatus | null;
    submitterRole: SubmitterRole;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type CreateWarningMutationVariables = {
  condition?: ModelWarningConditionInput | null;
  input: CreateWarningInput;
};

export type CreateWarningMutation = {
  createWarning?: {
    __typename: "Warning";
    createdAt: string;
    id: string;
    issuedBy: string;
    issuedTo: string;
    reason: string;
    supportId?: string | null;
    updatedAt: string;
    userWarnngs?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type DeleteBookingMutationVariables = {
  condition?: ModelBookingConditionInput | null;
  input: DeleteBookingInput;
};

export type DeleteBookingMutation = {
  deleteBooking?: {
    __typename: "Booking";
    arrivedAt?: string | null;
    canceledBy?: string | null;
    canceledReason?: string | null;
    completedAt?: string | null;
    coordinates?: string | null;
    createdAt: string;
    description?: string | null;
    id: string;
    location: string;
    photos?: Array<string | null> | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    providerServiceId: string;
    scheduledAt?: string | null;
    startedAt?: string | null;
    status?: BookingStatus | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type DeleteCategoryMutationVariables = {
  condition?: ModelCategoryConditionInput | null;
  input: DeleteCategoryInput;
};

export type DeleteCategoryMutation = {
  deleteCategory?: {
    __typename: "Category";
    createdAt: string;
    id: string;
    isActive?: boolean | null;
    name: string;
    updatedAt: string;
  } | null;
};

export type DeleteFavouriteMutationVariables = {
  condition?: ModelFavouriteConditionInput | null;
  input: DeleteFavouriteInput;
};

export type DeleteFavouriteMutation = {
  deleteFavourite?: {
    __typename: "Favourite";
    createdAt: string;
    id: string;
    owner?: string | null;
    providerId: string;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type DeleteNearFixProviderMutationVariables = {
  condition?: ModelNearFixProviderConditionInput | null;
  input: DeleteNearFixProviderInput;
};

export type DeleteNearFixProviderMutation = {
  deleteNearFixProvider?: {
    __typename: "NearFixProvider";
    availabilityStatus: AvailabilityStatus;
    bio?: string | null;
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    businessName?: string | null;
    createdAt: string;
    experience?: string | null;
    id: string;
    owner?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    serviceArea?: string | null;
    services?: {
      __typename: "ModelProviderServiceConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
    verificationStatus: VerificationStatus;
  } | null;
};

export type DeleteNearFixUserMutationVariables = {
  condition?: ModelNearFixUserConditionInput | null;
  input: DeleteNearFixUserInput;
};

export type DeleteNearFixUserMutation = {
  deleteNearFixUser?: {
    __typename: "NearFixUser";
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    email: string;
    favourites?: {
      __typename: "ModelFavouriteConnection";
      nextToken?: string | null;
    } | null;
    id: string;
    isPhoneVerified?: boolean | null;
    location?: string | null;
    name: string;
    notifications?: {
      __typename: "ModelNotificationConnection";
      nextToken?: string | null;
    } | null;
    owner?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    pushToken?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    status: Status;
    supportTickets?: {
      __typename: "ModelSupportConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    warnings?: {
      __typename: "ModelWarningConnection";
      nextToken?: string | null;
    } | null;
  } | null;
};

export type DeleteNotificationMutationVariables = {
  condition?: ModelNotificationConditionInput | null;
  input: DeleteNotificationInput;
};

export type DeleteNotificationMutation = {
  deleteNotification?: {
    __typename: "Notification";
    createdAt: string;
    description?: string | null;
    id: string;
    isRead?: boolean | null;
    owner?: string | null;
    providerId?: string | null;
    title?: string | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type DeleteProviderServiceMutationVariables = {
  condition?: ModelProviderServiceConditionInput | null;
  input: DeleteProviderServiceInput;
};

export type DeleteProviderServiceMutation = {
  deleteProviderService?: {
    __typename: "ProviderService";
    category: string;
    createdAt: string;
    description?: string | null;
    id: string;
    isActive?: boolean | null;
    owner?: string | null;
    price: number;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    updatedAt: string;
  } | null;
};

export type DeleteReviewsMutationVariables = {
  condition?: ModelReviewsConditionInput | null;
  input: DeleteReviewsInput;
};

export type DeleteReviewsMutation = {
  deleteReviews?: {
    __typename: "Reviews";
    bookingId: string;
    comment?: string | null;
    createdAt: string;
    id: string;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    rating: number;
    revieweeId: string;
    reviewerId: string;
    type?: ReviewsType | null;
    updatedAt: string;
    userReview?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type DeleteSupportMutationVariables = {
  condition?: ModelSupportConditionInput | null;
  input: DeleteSupportInput;
};

export type DeleteSupportMutation = {
  deleteSupport?: {
    __typename: "Support";
    adminResponse?: string | null;
    againstUserId?: string | null;
    attachments?: Array<string | null> | null;
    complaint: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    resolvedAt?: string | null;
    resolvedBy?: string | null;
    status?: SupportStatus | null;
    submitterRole: SubmitterRole;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type DeleteWarningMutationVariables = {
  condition?: ModelWarningConditionInput | null;
  input: DeleteWarningInput;
};

export type DeleteWarningMutation = {
  deleteWarning?: {
    __typename: "Warning";
    createdAt: string;
    id: string;
    issuedBy: string;
    issuedTo: string;
    reason: string;
    supportId?: string | null;
    updatedAt: string;
    userWarnngs?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type UpdateBookingMutationVariables = {
  condition?: ModelBookingConditionInput | null;
  input: UpdateBookingInput;
};

export type UpdateBookingMutation = {
  updateBooking?: {
    __typename: "Booking";
    arrivedAt?: string | null;
    canceledBy?: string | null;
    canceledReason?: string | null;
    completedAt?: string | null;
    coordinates?: string | null;
    createdAt: string;
    description?: string | null;
    id: string;
    location: string;
    photos?: Array<string | null> | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    providerServiceId: string;
    scheduledAt?: string | null;
    startedAt?: string | null;
    status?: BookingStatus | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type UpdateCategoryMutationVariables = {
  condition?: ModelCategoryConditionInput | null;
  input: UpdateCategoryInput;
};

export type UpdateCategoryMutation = {
  updateCategory?: {
    __typename: "Category";
    createdAt: string;
    id: string;
    isActive?: boolean | null;
    name: string;
    updatedAt: string;
  } | null;
};

export type UpdateFavouriteMutationVariables = {
  condition?: ModelFavouriteConditionInput | null;
  input: UpdateFavouriteInput;
};

export type UpdateFavouriteMutation = {
  updateFavourite?: {
    __typename: "Favourite";
    createdAt: string;
    id: string;
    owner?: string | null;
    providerId: string;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type UpdateNearFixProviderMutationVariables = {
  condition?: ModelNearFixProviderConditionInput | null;
  input: UpdateNearFixProviderInput;
};

export type UpdateNearFixProviderMutation = {
  updateNearFixProvider?: {
    __typename: "NearFixProvider";
    availabilityStatus: AvailabilityStatus;
    bio?: string | null;
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    businessName?: string | null;
    createdAt: string;
    experience?: string | null;
    id: string;
    owner?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    serviceArea?: string | null;
    services?: {
      __typename: "ModelProviderServiceConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
    verificationStatus: VerificationStatus;
  } | null;
};

export type UpdateNearFixUserMutationVariables = {
  condition?: ModelNearFixUserConditionInput | null;
  input: UpdateNearFixUserInput;
};

export type UpdateNearFixUserMutation = {
  updateNearFixUser?: {
    __typename: "NearFixUser";
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    email: string;
    favourites?: {
      __typename: "ModelFavouriteConnection";
      nextToken?: string | null;
    } | null;
    id: string;
    isPhoneVerified?: boolean | null;
    location?: string | null;
    name: string;
    notifications?: {
      __typename: "ModelNotificationConnection";
      nextToken?: string | null;
    } | null;
    owner?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    pushToken?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    status: Status;
    supportTickets?: {
      __typename: "ModelSupportConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    warnings?: {
      __typename: "ModelWarningConnection";
      nextToken?: string | null;
    } | null;
  } | null;
};

export type UpdateNotificationMutationVariables = {
  condition?: ModelNotificationConditionInput | null;
  input: UpdateNotificationInput;
};

export type UpdateNotificationMutation = {
  updateNotification?: {
    __typename: "Notification";
    createdAt: string;
    description?: string | null;
    id: string;
    isRead?: boolean | null;
    owner?: string | null;
    providerId?: string | null;
    title?: string | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type UpdateProviderServiceMutationVariables = {
  condition?: ModelProviderServiceConditionInput | null;
  input: UpdateProviderServiceInput;
};

export type UpdateProviderServiceMutation = {
  updateProviderService?: {
    __typename: "ProviderService";
    category: string;
    createdAt: string;
    description?: string | null;
    id: string;
    isActive?: boolean | null;
    owner?: string | null;
    price: number;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    updatedAt: string;
  } | null;
};

export type UpdateReviewsMutationVariables = {
  condition?: ModelReviewsConditionInput | null;
  input: UpdateReviewsInput;
};

export type UpdateReviewsMutation = {
  updateReviews?: {
    __typename: "Reviews";
    bookingId: string;
    comment?: string | null;
    createdAt: string;
    id: string;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    rating: number;
    revieweeId: string;
    reviewerId: string;
    type?: ReviewsType | null;
    updatedAt: string;
    userReview?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type UpdateSupportMutationVariables = {
  condition?: ModelSupportConditionInput | null;
  input: UpdateSupportInput;
};

export type UpdateSupportMutation = {
  updateSupport?: {
    __typename: "Support";
    adminResponse?: string | null;
    againstUserId?: string | null;
    attachments?: Array<string | null> | null;
    complaint: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    resolvedAt?: string | null;
    resolvedBy?: string | null;
    status?: SupportStatus | null;
    submitterRole: SubmitterRole;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type UpdateWarningMutationVariables = {
  condition?: ModelWarningConditionInput | null;
  input: UpdateWarningInput;
};

export type UpdateWarningMutation = {
  updateWarning?: {
    __typename: "Warning";
    createdAt: string;
    id: string;
    issuedBy: string;
    issuedTo: string;
    reason: string;
    supportId?: string | null;
    updatedAt: string;
    userWarnngs?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnCreateBookingSubscriptionVariables = {
  filter?: ModelSubscriptionBookingFilterInput | null;
  providerId?: string | null;
};

export type OnCreateBookingSubscription = {
  onCreateBooking?: {
    __typename: "Booking";
    arrivedAt?: string | null;
    canceledBy?: string | null;
    canceledReason?: string | null;
    completedAt?: string | null;
    coordinates?: string | null;
    createdAt: string;
    description?: string | null;
    id: string;
    location: string;
    photos?: Array<string | null> | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    providerServiceId: string;
    scheduledAt?: string | null;
    startedAt?: string | null;
    status?: BookingStatus | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnCreateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null;
};

export type OnCreateCategorySubscription = {
  onCreateCategory?: {
    __typename: "Category";
    createdAt: string;
    id: string;
    isActive?: boolean | null;
    name: string;
    updatedAt: string;
  } | null;
};

export type OnCreateFavouriteSubscriptionVariables = {
  filter?: ModelSubscriptionFavouriteFilterInput | null;
  owner?: string | null;
};

export type OnCreateFavouriteSubscription = {
  onCreateFavourite?: {
    __typename: "Favourite";
    createdAt: string;
    id: string;
    owner?: string | null;
    providerId: string;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnCreateNearFixProviderSubscriptionVariables = {
  filter?: ModelSubscriptionNearFixProviderFilterInput | null;
  owner?: string | null;
};

export type OnCreateNearFixProviderSubscription = {
  onCreateNearFixProvider?: {
    __typename: "NearFixProvider";
    availabilityStatus: AvailabilityStatus;
    bio?: string | null;
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    businessName?: string | null;
    createdAt: string;
    experience?: string | null;
    id: string;
    owner?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    serviceArea?: string | null;
    services?: {
      __typename: "ModelProviderServiceConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
    verificationStatus: VerificationStatus;
  } | null;
};

export type OnCreateNearFixUserSubscriptionVariables = {
  filter?: ModelSubscriptionNearFixUserFilterInput | null;
  owner?: string | null;
};

export type OnCreateNearFixUserSubscription = {
  onCreateNearFixUser?: {
    __typename: "NearFixUser";
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    email: string;
    favourites?: {
      __typename: "ModelFavouriteConnection";
      nextToken?: string | null;
    } | null;
    id: string;
    isPhoneVerified?: boolean | null;
    location?: string | null;
    name: string;
    notifications?: {
      __typename: "ModelNotificationConnection";
      nextToken?: string | null;
    } | null;
    owner?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    pushToken?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    status: Status;
    supportTickets?: {
      __typename: "ModelSupportConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    warnings?: {
      __typename: "ModelWarningConnection";
      nextToken?: string | null;
    } | null;
  } | null;
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null;
  owner?: string | null;
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?: {
    __typename: "Notification";
    createdAt: string;
    description?: string | null;
    id: string;
    isRead?: boolean | null;
    owner?: string | null;
    providerId?: string | null;
    title?: string | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnCreateProviderServiceSubscriptionVariables = {
  filter?: ModelSubscriptionProviderServiceFilterInput | null;
  owner?: string | null;
};

export type OnCreateProviderServiceSubscription = {
  onCreateProviderService?: {
    __typename: "ProviderService";
    category: string;
    createdAt: string;
    description?: string | null;
    id: string;
    isActive?: boolean | null;
    owner?: string | null;
    price: number;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    updatedAt: string;
  } | null;
};

export type OnCreateReviewsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewsFilterInput | null;
  reviewerId?: string | null;
};

export type OnCreateReviewsSubscription = {
  onCreateReviews?: {
    __typename: "Reviews";
    bookingId: string;
    comment?: string | null;
    createdAt: string;
    id: string;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    rating: number;
    revieweeId: string;
    reviewerId: string;
    type?: ReviewsType | null;
    updatedAt: string;
    userReview?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnCreateSupportSubscriptionVariables = {
  filter?: ModelSubscriptionSupportFilterInput | null;
  owner?: string | null;
};

export type OnCreateSupportSubscription = {
  onCreateSupport?: {
    __typename: "Support";
    adminResponse?: string | null;
    againstUserId?: string | null;
    attachments?: Array<string | null> | null;
    complaint: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    resolvedAt?: string | null;
    resolvedBy?: string | null;
    status?: SupportStatus | null;
    submitterRole: SubmitterRole;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnCreateWarningSubscriptionVariables = {
  filter?: ModelSubscriptionWarningFilterInput | null;
};

export type OnCreateWarningSubscription = {
  onCreateWarning?: {
    __typename: "Warning";
    createdAt: string;
    id: string;
    issuedBy: string;
    issuedTo: string;
    reason: string;
    supportId?: string | null;
    updatedAt: string;
    userWarnngs?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnDeleteBookingSubscriptionVariables = {
  filter?: ModelSubscriptionBookingFilterInput | null;
  providerId?: string | null;
};

export type OnDeleteBookingSubscription = {
  onDeleteBooking?: {
    __typename: "Booking";
    arrivedAt?: string | null;
    canceledBy?: string | null;
    canceledReason?: string | null;
    completedAt?: string | null;
    coordinates?: string | null;
    createdAt: string;
    description?: string | null;
    id: string;
    location: string;
    photos?: Array<string | null> | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    providerServiceId: string;
    scheduledAt?: string | null;
    startedAt?: string | null;
    status?: BookingStatus | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnDeleteCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null;
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?: {
    __typename: "Category";
    createdAt: string;
    id: string;
    isActive?: boolean | null;
    name: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteFavouriteSubscriptionVariables = {
  filter?: ModelSubscriptionFavouriteFilterInput | null;
  owner?: string | null;
};

export type OnDeleteFavouriteSubscription = {
  onDeleteFavourite?: {
    __typename: "Favourite";
    createdAt: string;
    id: string;
    owner?: string | null;
    providerId: string;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnDeleteNearFixProviderSubscriptionVariables = {
  filter?: ModelSubscriptionNearFixProviderFilterInput | null;
  owner?: string | null;
};

export type OnDeleteNearFixProviderSubscription = {
  onDeleteNearFixProvider?: {
    __typename: "NearFixProvider";
    availabilityStatus: AvailabilityStatus;
    bio?: string | null;
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    businessName?: string | null;
    createdAt: string;
    experience?: string | null;
    id: string;
    owner?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    serviceArea?: string | null;
    services?: {
      __typename: "ModelProviderServiceConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
    verificationStatus: VerificationStatus;
  } | null;
};

export type OnDeleteNearFixUserSubscriptionVariables = {
  filter?: ModelSubscriptionNearFixUserFilterInput | null;
  owner?: string | null;
};

export type OnDeleteNearFixUserSubscription = {
  onDeleteNearFixUser?: {
    __typename: "NearFixUser";
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    email: string;
    favourites?: {
      __typename: "ModelFavouriteConnection";
      nextToken?: string | null;
    } | null;
    id: string;
    isPhoneVerified?: boolean | null;
    location?: string | null;
    name: string;
    notifications?: {
      __typename: "ModelNotificationConnection";
      nextToken?: string | null;
    } | null;
    owner?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    pushToken?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    status: Status;
    supportTickets?: {
      __typename: "ModelSupportConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    warnings?: {
      __typename: "ModelWarningConnection";
      nextToken?: string | null;
    } | null;
  } | null;
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null;
  owner?: string | null;
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?: {
    __typename: "Notification";
    createdAt: string;
    description?: string | null;
    id: string;
    isRead?: boolean | null;
    owner?: string | null;
    providerId?: string | null;
    title?: string | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnDeleteProviderServiceSubscriptionVariables = {
  filter?: ModelSubscriptionProviderServiceFilterInput | null;
  owner?: string | null;
};

export type OnDeleteProviderServiceSubscription = {
  onDeleteProviderService?: {
    __typename: "ProviderService";
    category: string;
    createdAt: string;
    description?: string | null;
    id: string;
    isActive?: boolean | null;
    owner?: string | null;
    price: number;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteReviewsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewsFilterInput | null;
  reviewerId?: string | null;
};

export type OnDeleteReviewsSubscription = {
  onDeleteReviews?: {
    __typename: "Reviews";
    bookingId: string;
    comment?: string | null;
    createdAt: string;
    id: string;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    rating: number;
    revieweeId: string;
    reviewerId: string;
    type?: ReviewsType | null;
    updatedAt: string;
    userReview?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnDeleteSupportSubscriptionVariables = {
  filter?: ModelSubscriptionSupportFilterInput | null;
  owner?: string | null;
};

export type OnDeleteSupportSubscription = {
  onDeleteSupport?: {
    __typename: "Support";
    adminResponse?: string | null;
    againstUserId?: string | null;
    attachments?: Array<string | null> | null;
    complaint: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    resolvedAt?: string | null;
    resolvedBy?: string | null;
    status?: SupportStatus | null;
    submitterRole: SubmitterRole;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnDeleteWarningSubscriptionVariables = {
  filter?: ModelSubscriptionWarningFilterInput | null;
};

export type OnDeleteWarningSubscription = {
  onDeleteWarning?: {
    __typename: "Warning";
    createdAt: string;
    id: string;
    issuedBy: string;
    issuedTo: string;
    reason: string;
    supportId?: string | null;
    updatedAt: string;
    userWarnngs?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnUpdateBookingSubscriptionVariables = {
  filter?: ModelSubscriptionBookingFilterInput | null;
  providerId?: string | null;
};

export type OnUpdateBookingSubscription = {
  onUpdateBooking?: {
    __typename: "Booking";
    arrivedAt?: string | null;
    canceledBy?: string | null;
    canceledReason?: string | null;
    completedAt?: string | null;
    coordinates?: string | null;
    createdAt: string;
    description?: string | null;
    id: string;
    location: string;
    photos?: Array<string | null> | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    providerServiceId: string;
    scheduledAt?: string | null;
    startedAt?: string | null;
    status?: BookingStatus | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnUpdateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null;
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?: {
    __typename: "Category";
    createdAt: string;
    id: string;
    isActive?: boolean | null;
    name: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateFavouriteSubscriptionVariables = {
  filter?: ModelSubscriptionFavouriteFilterInput | null;
  owner?: string | null;
};

export type OnUpdateFavouriteSubscription = {
  onUpdateFavourite?: {
    __typename: "Favourite";
    createdAt: string;
    id: string;
    owner?: string | null;
    providerId: string;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnUpdateNearFixProviderSubscriptionVariables = {
  filter?: ModelSubscriptionNearFixProviderFilterInput | null;
  owner?: string | null;
};

export type OnUpdateNearFixProviderSubscription = {
  onUpdateNearFixProvider?: {
    __typename: "NearFixProvider";
    availabilityStatus: AvailabilityStatus;
    bio?: string | null;
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    businessName?: string | null;
    createdAt: string;
    experience?: string | null;
    id: string;
    owner?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    serviceArea?: string | null;
    services?: {
      __typename: "ModelProviderServiceConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
    verificationStatus: VerificationStatus;
  } | null;
};

export type OnUpdateNearFixUserSubscriptionVariables = {
  filter?: ModelSubscriptionNearFixUserFilterInput | null;
  owner?: string | null;
};

export type OnUpdateNearFixUserSubscription = {
  onUpdateNearFixUser?: {
    __typename: "NearFixUser";
    bookings?: {
      __typename: "ModelBookingConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    email: string;
    favourites?: {
      __typename: "ModelFavouriteConnection";
      nextToken?: string | null;
    } | null;
    id: string;
    isPhoneVerified?: boolean | null;
    location?: string | null;
    name: string;
    notifications?: {
      __typename: "ModelNotificationConnection";
      nextToken?: string | null;
    } | null;
    owner?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    pushToken?: string | null;
    reviews?: {
      __typename: "ModelReviewsConnection";
      nextToken?: string | null;
    } | null;
    status: Status;
    supportTickets?: {
      __typename: "ModelSupportConnection";
      nextToken?: string | null;
    } | null;
    updatedAt: string;
    warnings?: {
      __typename: "ModelWarningConnection";
      nextToken?: string | null;
    } | null;
  } | null;
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null;
  owner?: string | null;
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?: {
    __typename: "Notification";
    createdAt: string;
    description?: string | null;
    id: string;
    isRead?: boolean | null;
    owner?: string | null;
    providerId?: string | null;
    title?: string | null;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnUpdateProviderServiceSubscriptionVariables = {
  filter?: ModelSubscriptionProviderServiceFilterInput | null;
  owner?: string | null;
};

export type OnUpdateProviderServiceSubscription = {
  onUpdateProviderService?: {
    __typename: "ProviderService";
    category: string;
    createdAt: string;
    description?: string | null;
    id: string;
    isActive?: boolean | null;
    owner?: string | null;
    price: number;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    providerId: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateReviewsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewsFilterInput | null;
  reviewerId?: string | null;
};

export type OnUpdateReviewsSubscription = {
  onUpdateReviews?: {
    __typename: "Reviews";
    bookingId: string;
    comment?: string | null;
    createdAt: string;
    id: string;
    provider?: {
      __typename: "NearFixProvider";
      availabilityStatus: AvailabilityStatus;
      bio?: string | null;
      businessName?: string | null;
      createdAt: string;
      experience?: string | null;
      id: string;
      owner?: string | null;
      serviceArea?: string | null;
      updatedAt: string;
      userId: string;
      verificationStatus: VerificationStatus;
    } | null;
    rating: number;
    revieweeId: string;
    reviewerId: string;
    type?: ReviewsType | null;
    updatedAt: string;
    userReview?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnUpdateSupportSubscriptionVariables = {
  filter?: ModelSubscriptionSupportFilterInput | null;
  owner?: string | null;
};

export type OnUpdateSupportSubscription = {
  onUpdateSupport?: {
    __typename: "Support";
    adminResponse?: string | null;
    againstUserId?: string | null;
    attachments?: Array<string | null> | null;
    complaint: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    resolvedAt?: string | null;
    resolvedBy?: string | null;
    status?: SupportStatus | null;
    submitterRole: SubmitterRole;
    updatedAt: string;
    user?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
    userId: string;
  } | null;
};

export type OnUpdateWarningSubscriptionVariables = {
  filter?: ModelSubscriptionWarningFilterInput | null;
};

export type OnUpdateWarningSubscription = {
  onUpdateWarning?: {
    __typename: "Warning";
    createdAt: string;
    id: string;
    issuedBy: string;
    issuedTo: string;
    reason: string;
    supportId?: string | null;
    updatedAt: string;
    userWarnngs?: {
      __typename: "NearFixUser";
      createdAt: string;
      email: string;
      id: string;
      isPhoneVerified?: boolean | null;
      location?: string | null;
      name: string;
      owner?: string | null;
      phone?: string | null;
      profileImage?: string | null;
      pushToken?: string | null;
      status: Status;
      updatedAt: string;
    } | null;
  } | null;
};
