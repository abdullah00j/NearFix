/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateBooking = /* GraphQL */ `subscription OnCreateBooking(
  $filter: ModelSubscriptionBookingFilterInput
  $providerId: String
) {
  onCreateBooking(filter: $filter, providerId: $providerId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBookingSubscriptionVariables,
  APITypes.OnCreateBookingSubscription
>;
export const onCreateCategory =
  /* GraphQL */ `subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onCreateCategory(filter: $filter) {
    createdAt
    id
    isActive
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnCreateCategorySubscriptionVariables,
    APITypes.OnCreateCategorySubscription
  >;
export const onCreateFavourite = /* GraphQL */ `subscription OnCreateFavourite(
  $filter: ModelSubscriptionFavouriteFilterInput
  $owner: String
) {
  onCreateFavourite(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFavouriteSubscriptionVariables,
  APITypes.OnCreateFavouriteSubscription
>;
export const onCreateNearFixProvider =
  /* GraphQL */ `subscription OnCreateNearFixProvider(
  $filter: ModelSubscriptionNearFixProviderFilterInput
  $owner: String
) {
  onCreateNearFixProvider(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnCreateNearFixProviderSubscriptionVariables,
    APITypes.OnCreateNearFixProviderSubscription
  >;
export const onCreateNearFixUser =
  /* GraphQL */ `subscription OnCreateNearFixUser(
  $filter: ModelSubscriptionNearFixUserFilterInput
  $owner: String
) {
  onCreateNearFixUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnCreateNearFixUserSubscriptionVariables,
    APITypes.OnCreateNearFixUserSubscription
  >;
export const onCreateNotification =
  /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onCreateNotification(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnCreateNotificationSubscriptionVariables,
    APITypes.OnCreateNotificationSubscription
  >;
export const onCreateProviderService =
  /* GraphQL */ `subscription OnCreateProviderService(
  $filter: ModelSubscriptionProviderServiceFilterInput
  $owner: String
) {
  onCreateProviderService(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnCreateProviderServiceSubscriptionVariables,
    APITypes.OnCreateProviderServiceSubscription
  >;
export const onCreateReviews = /* GraphQL */ `subscription OnCreateReviews(
  $filter: ModelSubscriptionReviewsFilterInput
  $reviewerId: String
) {
  onCreateReviews(filter: $filter, reviewerId: $reviewerId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateReviewsSubscriptionVariables,
  APITypes.OnCreateReviewsSubscription
>;
export const onCreateSupport = /* GraphQL */ `subscription OnCreateSupport(
  $filter: ModelSubscriptionSupportFilterInput
  $owner: String
) {
  onCreateSupport(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSupportSubscriptionVariables,
  APITypes.OnCreateSupportSubscription
>;
export const onCreateWarning =
  /* GraphQL */ `subscription OnCreateWarning($filter: ModelSubscriptionWarningFilterInput) {
  onCreateWarning(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateWarningSubscriptionVariables,
    APITypes.OnCreateWarningSubscription
  >;
export const onDeleteBooking = /* GraphQL */ `subscription OnDeleteBooking(
  $filter: ModelSubscriptionBookingFilterInput
  $providerId: String
) {
  onDeleteBooking(filter: $filter, providerId: $providerId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBookingSubscriptionVariables,
  APITypes.OnDeleteBookingSubscription
>;
export const onDeleteCategory =
  /* GraphQL */ `subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onDeleteCategory(filter: $filter) {
    createdAt
    id
    isActive
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnDeleteCategorySubscriptionVariables,
    APITypes.OnDeleteCategorySubscription
  >;
export const onDeleteFavourite = /* GraphQL */ `subscription OnDeleteFavourite(
  $filter: ModelSubscriptionFavouriteFilterInput
  $owner: String
) {
  onDeleteFavourite(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFavouriteSubscriptionVariables,
  APITypes.OnDeleteFavouriteSubscription
>;
export const onDeleteNearFixProvider =
  /* GraphQL */ `subscription OnDeleteNearFixProvider(
  $filter: ModelSubscriptionNearFixProviderFilterInput
  $owner: String
) {
  onDeleteNearFixProvider(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteNearFixProviderSubscriptionVariables,
    APITypes.OnDeleteNearFixProviderSubscription
  >;
export const onDeleteNearFixUser =
  /* GraphQL */ `subscription OnDeleteNearFixUser(
  $filter: ModelSubscriptionNearFixUserFilterInput
  $owner: String
) {
  onDeleteNearFixUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteNearFixUserSubscriptionVariables,
    APITypes.OnDeleteNearFixUserSubscription
  >;
export const onDeleteNotification =
  /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onDeleteNotification(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteNotificationSubscriptionVariables,
    APITypes.OnDeleteNotificationSubscription
  >;
export const onDeleteProviderService =
  /* GraphQL */ `subscription OnDeleteProviderService(
  $filter: ModelSubscriptionProviderServiceFilterInput
  $owner: String
) {
  onDeleteProviderService(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteProviderServiceSubscriptionVariables,
    APITypes.OnDeleteProviderServiceSubscription
  >;
export const onDeleteReviews = /* GraphQL */ `subscription OnDeleteReviews(
  $filter: ModelSubscriptionReviewsFilterInput
  $reviewerId: String
) {
  onDeleteReviews(filter: $filter, reviewerId: $reviewerId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteReviewsSubscriptionVariables,
  APITypes.OnDeleteReviewsSubscription
>;
export const onDeleteSupport = /* GraphQL */ `subscription OnDeleteSupport(
  $filter: ModelSubscriptionSupportFilterInput
  $owner: String
) {
  onDeleteSupport(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSupportSubscriptionVariables,
  APITypes.OnDeleteSupportSubscription
>;
export const onDeleteWarning =
  /* GraphQL */ `subscription OnDeleteWarning($filter: ModelSubscriptionWarningFilterInput) {
  onDeleteWarning(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteWarningSubscriptionVariables,
    APITypes.OnDeleteWarningSubscription
  >;
export const onUpdateBooking = /* GraphQL */ `subscription OnUpdateBooking(
  $filter: ModelSubscriptionBookingFilterInput
  $providerId: String
) {
  onUpdateBooking(filter: $filter, providerId: $providerId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBookingSubscriptionVariables,
  APITypes.OnUpdateBookingSubscription
>;
export const onUpdateCategory =
  /* GraphQL */ `subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onUpdateCategory(filter: $filter) {
    createdAt
    id
    isActive
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnUpdateCategorySubscriptionVariables,
    APITypes.OnUpdateCategorySubscription
  >;
export const onUpdateFavourite = /* GraphQL */ `subscription OnUpdateFavourite(
  $filter: ModelSubscriptionFavouriteFilterInput
  $owner: String
) {
  onUpdateFavourite(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFavouriteSubscriptionVariables,
  APITypes.OnUpdateFavouriteSubscription
>;
export const onUpdateNearFixProvider =
  /* GraphQL */ `subscription OnUpdateNearFixProvider(
  $filter: ModelSubscriptionNearFixProviderFilterInput
  $owner: String
) {
  onUpdateNearFixProvider(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateNearFixProviderSubscriptionVariables,
    APITypes.OnUpdateNearFixProviderSubscription
  >;
export const onUpdateNearFixUser =
  /* GraphQL */ `subscription OnUpdateNearFixUser(
  $filter: ModelSubscriptionNearFixUserFilterInput
  $owner: String
) {
  onUpdateNearFixUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateNearFixUserSubscriptionVariables,
    APITypes.OnUpdateNearFixUserSubscription
  >;
export const onUpdateNotification =
  /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onUpdateNotification(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateNotificationSubscriptionVariables,
    APITypes.OnUpdateNotificationSubscription
  >;
export const onUpdateProviderService =
  /* GraphQL */ `subscription OnUpdateProviderService(
  $filter: ModelSubscriptionProviderServiceFilterInput
  $owner: String
) {
  onUpdateProviderService(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateProviderServiceSubscriptionVariables,
    APITypes.OnUpdateProviderServiceSubscription
  >;
export const onUpdateReviews = /* GraphQL */ `subscription OnUpdateReviews(
  $filter: ModelSubscriptionReviewsFilterInput
  $reviewerId: String
) {
  onUpdateReviews(filter: $filter, reviewerId: $reviewerId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateReviewsSubscriptionVariables,
  APITypes.OnUpdateReviewsSubscription
>;
export const onUpdateSupport = /* GraphQL */ `subscription OnUpdateSupport(
  $filter: ModelSubscriptionSupportFilterInput
  $owner: String
) {
  onUpdateSupport(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSupportSubscriptionVariables,
  APITypes.OnUpdateSupportSubscription
>;
export const onUpdateWarning =
  /* GraphQL */ `subscription OnUpdateWarning($filter: ModelSubscriptionWarningFilterInput) {
  onUpdateWarning(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateWarningSubscriptionVariables,
    APITypes.OnUpdateWarningSubscription
  >;
