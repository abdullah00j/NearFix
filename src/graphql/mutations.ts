/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createBooking = /* GraphQL */ `mutation CreateBooking(
  $condition: ModelBookingConditionInput
  $input: CreateBookingInput!
) {
  createBooking(condition: $condition, input: $input) {
    arrivedAt
    canceledBy
    canceledReason
    completedAt
    coordinates
    createdAt
    description
    id
    location
    photos
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    providerId
    providerServiceId
    scheduledAt
    startedAt
    status
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBookingMutationVariables,
  APITypes.CreateBookingMutation
>;
export const createCategory = /* GraphQL */ `mutation CreateCategory(
  $condition: ModelCategoryConditionInput
  $input: CreateCategoryInput!
) {
  createCategory(condition: $condition, input: $input) {
    createdAt
    id
    isActive
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCategoryMutationVariables,
  APITypes.CreateCategoryMutation
>;
export const createFavourite = /* GraphQL */ `mutation CreateFavourite(
  $condition: ModelFavouriteConditionInput
  $input: CreateFavouriteInput!
) {
  createFavourite(condition: $condition, input: $input) {
    createdAt
    id
    owner
    providerId
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFavouriteMutationVariables,
  APITypes.CreateFavouriteMutation
>;
export const createNearFixProvider =
  /* GraphQL */ `mutation CreateNearFixProvider(
  $condition: ModelNearFixProviderConditionInput
  $input: CreateNearFixProviderInput!
) {
  createNearFixProvider(condition: $condition, input: $input) {
    availabilityStatus
    bio
    bookings {
      nextToken
      __typename
    }
    businessName
    createdAt
    experience
    id
    owner
    reviews {
      nextToken
      __typename
    }
    serviceArea
    services {
      nextToken
      __typename
    }
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    verificationStatus
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateNearFixProviderMutationVariables,
    APITypes.CreateNearFixProviderMutation
  >;
export const createNearFixUser = /* GraphQL */ `mutation CreateNearFixUser(
  $condition: ModelNearFixUserConditionInput
  $input: CreateNearFixUserInput!
) {
  createNearFixUser(condition: $condition, input: $input) {
    bookings {
      nextToken
      __typename
    }
    createdAt
    email
    favourites {
      nextToken
      __typename
    }
    id
    isPhoneVerified
    location
    name
    notifications {
      nextToken
      __typename
    }
    owner
    phone
    profileImage
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    pushToken
    reviews {
      nextToken
      __typename
    }
    status
    supportTickets {
      nextToken
      __typename
    }
    updatedAt
    warnings {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNearFixUserMutationVariables,
  APITypes.CreateNearFixUserMutation
>;
export const createNotification = /* GraphQL */ `mutation CreateNotification(
  $condition: ModelNotificationConditionInput
  $input: CreateNotificationInput!
) {
  createNotification(condition: $condition, input: $input) {
    createdAt
    description
    id
    isRead
    owner
    providerId
    title
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNotificationMutationVariables,
  APITypes.CreateNotificationMutation
>;
export const createProviderService =
  /* GraphQL */ `mutation CreateProviderService(
  $condition: ModelProviderServiceConditionInput
  $input: CreateProviderServiceInput!
) {
  createProviderService(condition: $condition, input: $input) {
    category
    createdAt
    description
    id
    isActive
    owner
    price
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    providerId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateProviderServiceMutationVariables,
    APITypes.CreateProviderServiceMutation
  >;
export const createReviews = /* GraphQL */ `mutation CreateReviews(
  $condition: ModelReviewsConditionInput
  $input: CreateReviewsInput!
) {
  createReviews(condition: $condition, input: $input) {
    bookingId
    comment
    createdAt
    id
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    rating
    revieweeId
    reviewerId
    type
    updatedAt
    userReview {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReviewsMutationVariables,
  APITypes.CreateReviewsMutation
>;
export const createSupport = /* GraphQL */ `mutation CreateSupport(
  $condition: ModelSupportConditionInput
  $input: CreateSupportInput!
) {
  createSupport(condition: $condition, input: $input) {
    adminResponse
    againstUserId
    attachments
    complaint
    createdAt
    id
    owner
    resolvedAt
    resolvedBy
    status
    submitterRole
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSupportMutationVariables,
  APITypes.CreateSupportMutation
>;
export const createWarning = /* GraphQL */ `mutation CreateWarning(
  $condition: ModelWarningConditionInput
  $input: CreateWarningInput!
) {
  createWarning(condition: $condition, input: $input) {
    createdAt
    id
    issuedBy
    issuedTo
    reason
    supportId
    updatedAt
    userWarnngs {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateWarningMutationVariables,
  APITypes.CreateWarningMutation
>;
export const deleteBooking = /* GraphQL */ `mutation DeleteBooking(
  $condition: ModelBookingConditionInput
  $input: DeleteBookingInput!
) {
  deleteBooking(condition: $condition, input: $input) {
    arrivedAt
    canceledBy
    canceledReason
    completedAt
    coordinates
    createdAt
    description
    id
    location
    photos
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    providerId
    providerServiceId
    scheduledAt
    startedAt
    status
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBookingMutationVariables,
  APITypes.DeleteBookingMutation
>;
export const deleteCategory = /* GraphQL */ `mutation DeleteCategory(
  $condition: ModelCategoryConditionInput
  $input: DeleteCategoryInput!
) {
  deleteCategory(condition: $condition, input: $input) {
    createdAt
    id
    isActive
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCategoryMutationVariables,
  APITypes.DeleteCategoryMutation
>;
export const deleteFavourite = /* GraphQL */ `mutation DeleteFavourite(
  $condition: ModelFavouriteConditionInput
  $input: DeleteFavouriteInput!
) {
  deleteFavourite(condition: $condition, input: $input) {
    createdAt
    id
    owner
    providerId
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFavouriteMutationVariables,
  APITypes.DeleteFavouriteMutation
>;
export const deleteNearFixProvider =
  /* GraphQL */ `mutation DeleteNearFixProvider(
  $condition: ModelNearFixProviderConditionInput
  $input: DeleteNearFixProviderInput!
) {
  deleteNearFixProvider(condition: $condition, input: $input) {
    availabilityStatus
    bio
    bookings {
      nextToken
      __typename
    }
    businessName
    createdAt
    experience
    id
    owner
    reviews {
      nextToken
      __typename
    }
    serviceArea
    services {
      nextToken
      __typename
    }
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    verificationStatus
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteNearFixProviderMutationVariables,
    APITypes.DeleteNearFixProviderMutation
  >;
export const deleteNearFixUser = /* GraphQL */ `mutation DeleteNearFixUser(
  $condition: ModelNearFixUserConditionInput
  $input: DeleteNearFixUserInput!
) {
  deleteNearFixUser(condition: $condition, input: $input) {
    bookings {
      nextToken
      __typename
    }
    createdAt
    email
    favourites {
      nextToken
      __typename
    }
    id
    isPhoneVerified
    location
    name
    notifications {
      nextToken
      __typename
    }
    owner
    phone
    profileImage
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    pushToken
    reviews {
      nextToken
      __typename
    }
    status
    supportTickets {
      nextToken
      __typename
    }
    updatedAt
    warnings {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNearFixUserMutationVariables,
  APITypes.DeleteNearFixUserMutation
>;
export const deleteNotification = /* GraphQL */ `mutation DeleteNotification(
  $condition: ModelNotificationConditionInput
  $input: DeleteNotificationInput!
) {
  deleteNotification(condition: $condition, input: $input) {
    createdAt
    description
    id
    isRead
    owner
    providerId
    title
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNotificationMutationVariables,
  APITypes.DeleteNotificationMutation
>;
export const deleteProviderService =
  /* GraphQL */ `mutation DeleteProviderService(
  $condition: ModelProviderServiceConditionInput
  $input: DeleteProviderServiceInput!
) {
  deleteProviderService(condition: $condition, input: $input) {
    category
    createdAt
    description
    id
    isActive
    owner
    price
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    providerId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteProviderServiceMutationVariables,
    APITypes.DeleteProviderServiceMutation
  >;
export const deleteReviews = /* GraphQL */ `mutation DeleteReviews(
  $condition: ModelReviewsConditionInput
  $input: DeleteReviewsInput!
) {
  deleteReviews(condition: $condition, input: $input) {
    bookingId
    comment
    createdAt
    id
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    rating
    revieweeId
    reviewerId
    type
    updatedAt
    userReview {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReviewsMutationVariables,
  APITypes.DeleteReviewsMutation
>;
export const deleteSupport = /* GraphQL */ `mutation DeleteSupport(
  $condition: ModelSupportConditionInput
  $input: DeleteSupportInput!
) {
  deleteSupport(condition: $condition, input: $input) {
    adminResponse
    againstUserId
    attachments
    complaint
    createdAt
    id
    owner
    resolvedAt
    resolvedBy
    status
    submitterRole
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSupportMutationVariables,
  APITypes.DeleteSupportMutation
>;
export const deleteWarning = /* GraphQL */ `mutation DeleteWarning(
  $condition: ModelWarningConditionInput
  $input: DeleteWarningInput!
) {
  deleteWarning(condition: $condition, input: $input) {
    createdAt
    id
    issuedBy
    issuedTo
    reason
    supportId
    updatedAt
    userWarnngs {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteWarningMutationVariables,
  APITypes.DeleteWarningMutation
>;
export const updateBooking = /* GraphQL */ `mutation UpdateBooking(
  $condition: ModelBookingConditionInput
  $input: UpdateBookingInput!
) {
  updateBooking(condition: $condition, input: $input) {
    arrivedAt
    canceledBy
    canceledReason
    completedAt
    coordinates
    createdAt
    description
    id
    location
    photos
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    providerId
    providerServiceId
    scheduledAt
    startedAt
    status
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBookingMutationVariables,
  APITypes.UpdateBookingMutation
>;
export const updateCategory = /* GraphQL */ `mutation UpdateCategory(
  $condition: ModelCategoryConditionInput
  $input: UpdateCategoryInput!
) {
  updateCategory(condition: $condition, input: $input) {
    createdAt
    id
    isActive
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCategoryMutationVariables,
  APITypes.UpdateCategoryMutation
>;
export const updateFavourite = /* GraphQL */ `mutation UpdateFavourite(
  $condition: ModelFavouriteConditionInput
  $input: UpdateFavouriteInput!
) {
  updateFavourite(condition: $condition, input: $input) {
    createdAt
    id
    owner
    providerId
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFavouriteMutationVariables,
  APITypes.UpdateFavouriteMutation
>;
export const updateNearFixProvider =
  /* GraphQL */ `mutation UpdateNearFixProvider(
  $condition: ModelNearFixProviderConditionInput
  $input: UpdateNearFixProviderInput!
) {
  updateNearFixProvider(condition: $condition, input: $input) {
    availabilityStatus
    bio
    bookings {
      nextToken
      __typename
    }
    businessName
    createdAt
    experience
    id
    owner
    reviews {
      nextToken
      __typename
    }
    serviceArea
    services {
      nextToken
      __typename
    }
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    verificationStatus
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateNearFixProviderMutationVariables,
    APITypes.UpdateNearFixProviderMutation
  >;
export const updateNearFixUser = /* GraphQL */ `mutation UpdateNearFixUser(
  $condition: ModelNearFixUserConditionInput
  $input: UpdateNearFixUserInput!
) {
  updateNearFixUser(condition: $condition, input: $input) {
    bookings {
      nextToken
      __typename
    }
    createdAt
    email
    favourites {
      nextToken
      __typename
    }
    id
    isPhoneVerified
    location
    name
    notifications {
      nextToken
      __typename
    }
    owner
    phone
    profileImage
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    pushToken
    reviews {
      nextToken
      __typename
    }
    status
    supportTickets {
      nextToken
      __typename
    }
    updatedAt
    warnings {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNearFixUserMutationVariables,
  APITypes.UpdateNearFixUserMutation
>;
export const updateNotification = /* GraphQL */ `mutation UpdateNotification(
  $condition: ModelNotificationConditionInput
  $input: UpdateNotificationInput!
) {
  updateNotification(condition: $condition, input: $input) {
    createdAt
    description
    id
    isRead
    owner
    providerId
    title
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNotificationMutationVariables,
  APITypes.UpdateNotificationMutation
>;
export const updateProviderService =
  /* GraphQL */ `mutation UpdateProviderService(
  $condition: ModelProviderServiceConditionInput
  $input: UpdateProviderServiceInput!
) {
  updateProviderService(condition: $condition, input: $input) {
    category
    createdAt
    description
    id
    isActive
    owner
    price
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    providerId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateProviderServiceMutationVariables,
    APITypes.UpdateProviderServiceMutation
  >;
export const updateReviews = /* GraphQL */ `mutation UpdateReviews(
  $condition: ModelReviewsConditionInput
  $input: UpdateReviewsInput!
) {
  updateReviews(condition: $condition, input: $input) {
    bookingId
    comment
    createdAt
    id
    provider {
      availabilityStatus
      bio
      businessName
      createdAt
      experience
      id
      owner
      serviceArea
      updatedAt
      userId
      verificationStatus
      __typename
    }
    rating
    revieweeId
    reviewerId
    type
    updatedAt
    userReview {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReviewsMutationVariables,
  APITypes.UpdateReviewsMutation
>;
export const updateSupport = /* GraphQL */ `mutation UpdateSupport(
  $condition: ModelSupportConditionInput
  $input: UpdateSupportInput!
) {
  updateSupport(condition: $condition, input: $input) {
    adminResponse
    againstUserId
    attachments
    complaint
    createdAt
    id
    owner
    resolvedAt
    resolvedBy
    status
    submitterRole
    updatedAt
    user {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSupportMutationVariables,
  APITypes.UpdateSupportMutation
>;
export const updateWarning = /* GraphQL */ `mutation UpdateWarning(
  $condition: ModelWarningConditionInput
  $input: UpdateWarningInput!
) {
  updateWarning(condition: $condition, input: $input) {
    createdAt
    id
    issuedBy
    issuedTo
    reason
    supportId
    updatedAt
    userWarnngs {
      createdAt
      email
      id
      isPhoneVerified
      location
      name
      owner
      phone
      profileImage
      pushToken
      status
      updatedAt
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateWarningMutationVariables,
  APITypes.UpdateWarningMutation
>;
