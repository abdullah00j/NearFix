/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getBooking = /* GraphQL */ `query GetBooking($id: ID!) {
  getBooking(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetBookingQueryVariables,
  APITypes.GetBookingQuery
>;
export const getCategory = /* GraphQL */ `query GetCategory($id: ID!) {
  getCategory(id: $id) {
    createdAt
    id
    isActive
    name
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCategoryQueryVariables,
  APITypes.GetCategoryQuery
>;
export const getFavourite = /* GraphQL */ `query GetFavourite($id: ID!) {
  getFavourite(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetFavouriteQueryVariables,
  APITypes.GetFavouriteQuery
>;
export const getNearFixProvider =
  /* GraphQL */ `query GetNearFixProvider($id: ID!) {
  getNearFixProvider(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetNearFixProviderQueryVariables,
    APITypes.GetNearFixProviderQuery
  >;
export const getNearFixUser = /* GraphQL */ `query GetNearFixUser($id: ID!) {
  getNearFixUser(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetNearFixUserQueryVariables,
  APITypes.GetNearFixUserQuery
>;
export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const getProviderService =
  /* GraphQL */ `query GetProviderService($id: ID!) {
  getProviderService(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetProviderServiceQueryVariables,
    APITypes.GetProviderServiceQuery
  >;
export const getReviews = /* GraphQL */ `query GetReviews($id: ID!) {
  getReviews(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetReviewsQueryVariables,
  APITypes.GetReviewsQuery
>;
export const getSupport = /* GraphQL */ `query GetSupport($id: ID!) {
  getSupport(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetSupportQueryVariables,
  APITypes.GetSupportQuery
>;
export const getWarning = /* GraphQL */ `query GetWarning($id: ID!) {
  getWarning(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetWarningQueryVariables,
  APITypes.GetWarningQuery
>;
export const listBookings = /* GraphQL */ `query ListBookings(
  $filter: ModelBookingFilterInput
  $limit: Int
  $nextToken: String
) {
  listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      providerId
      providerServiceId
      scheduledAt
      startedAt
      status
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBookingsQueryVariables,
  APITypes.ListBookingsQuery
>;
export const listCategories = /* GraphQL */ `query ListCategories(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      isActive
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCategoriesQueryVariables,
  APITypes.ListCategoriesQuery
>;
export const listFavourites = /* GraphQL */ `query ListFavourites(
  $filter: ModelFavouriteFilterInput
  $limit: Int
  $nextToken: String
) {
  listFavourites(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      owner
      providerId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFavouritesQueryVariables,
  APITypes.ListFavouritesQuery
>;
export const listNearFixProviders = /* GraphQL */ `query ListNearFixProviders(
  $filter: ModelNearFixProviderFilterInput
  $limit: Int
  $nextToken: String
) {
  listNearFixProviders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNearFixProvidersQueryVariables,
  APITypes.ListNearFixProvidersQuery
>;
export const listNearFixUsers = /* GraphQL */ `query ListNearFixUsers(
  $filter: ModelNearFixUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listNearFixUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNearFixUsersQueryVariables,
  APITypes.ListNearFixUsersQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      description
      id
      isRead
      owner
      providerId
      title
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const listProviderServices = /* GraphQL */ `query ListProviderServices(
  $filter: ModelProviderServiceFilterInput
  $limit: Int
  $nextToken: String
) {
  listProviderServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      category
      createdAt
      description
      id
      isActive
      owner
      price
      providerId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProviderServicesQueryVariables,
  APITypes.ListProviderServicesQuery
>;
export const listReviews = /* GraphQL */ `query ListReviews(
  $filter: ModelReviewsFilterInput
  $limit: Int
  $nextToken: String
) {
  listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      bookingId
      comment
      createdAt
      id
      rating
      revieweeId
      reviewerId
      type
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReviewsQueryVariables,
  APITypes.ListReviewsQuery
>;
export const listSupports = /* GraphQL */ `query ListSupports(
  $filter: ModelSupportFilterInput
  $limit: Int
  $nextToken: String
) {
  listSupports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSupportsQueryVariables,
  APITypes.ListSupportsQuery
>;
export const listWarnings = /* GraphQL */ `query ListWarnings(
  $filter: ModelWarningFilterInput
  $limit: Int
  $nextToken: String
) {
  listWarnings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      issuedBy
      issuedTo
      reason
      supportId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListWarningsQueryVariables,
  APITypes.ListWarningsQuery
>;
