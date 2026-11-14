import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { ensureUser } from "../functions/ensureUser/resources";
import { createProviderApplication } from "../functions/CreateProviderApplication/resource";
import { updateProviderApplication } from "../functions/updateProviderApplication/resource";

const schema = a
  .schema({
    // ======================================================================
    // 1. ENUMS
    // ======================================================================
    SubmitterRole: a.enum(["PROVIDER", "CUSTOMER"]),
    VerificationStatus: a.enum([
      "PENDING",
      "APPROVED",
      "REJECTED",
      "CHANGE_REQUESTED",
    ]),
    AvailabilityStatus: a.enum(["ONLINE", "OFFLINE", "BUSY"]),
    Status: a.enum(["ACTIVE", "WARNED", "SUSPENDED"]),
    ApplicationStatus: a.enum(["PENDING", "APPROVED", "REJECTED"]),

    // ======================================================================
    // 2. MODELS
    // ======================================================================

    // ---- User ------------------------------------------------------------
    // Profile of every app user (customer or provider).
    NearFixUser: a
      .model({
        // Field-level rules: users can read these but cannot edit them.
        // Only ADMIN can update.
        name: a
          .string()
          .required()
          .authorization((allow) => [
            allow.authenticated().to(["read"]),
            allow.owner().to(["read"]),
            allow.group("ADMIN").to(["read", "update"]),
          ]),

        email: a
          .string()
          .required()
          .authorization((allow) => [
            allow.authenticated().to(["read"]),
            allow.owner().to(["read"]),
            allow.group("ADMIN").to(["read", "update"]),
          ]),

        status: a
          .ref("Status")
          .required()
          .authorization((allow) => [
            allow.authenticated().to(["read"]),
            allow.owner().to(["read"]),
            allow.group("ADMIN").to(["read", "update"]),
          ]),
        profileImage: a.string(),
        phone: a.string(),
        activeRole: a.enum(["CUSTOMER", "PROVIDER"]),
        // Only the owner (read) and ADMIN (read/update) can see this field.
        isPhoneVerified: a
          .boolean()
          .default(false)
          .authorization((allow) => [
            allow.owner().to(["read"]),
            allow.group("ADMIN").to(["read", "update"]),
          ]),
        location: a.string(),
        pushToken: a.string(),

        // relationship
        bookings: a.hasMany("Booking", "userId"), // one user -> many bookings
        favourites: a.hasMany("Favourite", "userId"),
        notifications: a.hasMany("Notification", "userId"),
        supportTickets: a.hasMany("Support", "userId"),
        provider: a.hasOne("NearFixProvider", "userId"),
        reviews: a.hasMany("Reviews", "reviewerId"),
        warnings: a.hasMany("Warning", "issuedTo"),
        providerApplication: a.hasOne("ProviderApplication", "userId"),
      })
      // Model-level rules (apply to fields that have no field-level rules)
      .authorization((allow) => [
        allow.authenticated().to(["read"]),
        allow.group("ADMIN"),
        allow.owner(),
      ]),

    // ---- Provider application ---------------------------------------------
    // Created ONLY through the createMyProviderApplication mutation (Lambda),
    // which sets userId from the signed-in user and applicationStatus to PENDING.
    // The user can read and delete their own application but cannot create or
    // update it directly. ADMIN has full access.
    // NOTE: the Lambda creates the record with IAM and does not set the
    // default "owner" field, so owner() will not match the user's own record.
    // Check that users can actually read their application (see ownerDefinedIn
    // on "userId" as an alternative).
    ProviderApplication: a
      .model({
        userId: a.string().required(),
        businessName: a.string().required(),
        serviceArea: a.string().required(),
        selfie: a.string(),
        CNICNumber: a.string(),
        CNICNAME: a.string(),
        CNICFrontSide: a.string(),
        CNICBackSide: a.string(),
        applicationStatus: a.ref("ApplicationStatus").required(),

        users: a.belongsTo("NearFixUser", "userId"),
      })
      .authorization((allow) => [
        allow.owner().to(["read", "delete"]),
        allow.authenticated().to(["read"]),
        allow.group("ADMIN"),
        allow.ownerDefinedIn("userId").identityClaim("sub").to(["read"]),
      ]),

    // ---- Provider ----------------------------------------------------------
    // Public provider profile, created after an application is approved.
    // Anyone can read it (guest included), only the owner/ADMIN can change it.
    NearFixProvider: a
      .model({
        userId: a
          .string()
          .required()
          .authorization((allow) => [
            allow.guest().to(["read"]),
            allow.authenticated().to(["read"]),
            allow.group("ADMIN"),
            allow.owner(),
          ]),
        experience: a.string(),
        bio: a.string(),
        businessName: a.string(),
        serviceArea: a.string(),
        selfie: a.string(),
        CNICNumber: a.string(),
        CNICNAME: a.string(),
        CNICFrontSide: a.string(),
        CNICBackSide: a.string(),

        verificationStatus: a
          .ref("VerificationStatus")
          .required()
          .authorization((allow) => [
            allow.guest().to(["read"]),
            allow.authenticated().to(["read"]),
            allow.group("ADMIN"),
            allow.owner(),
          ]),
        availabilityStatus: a
          .ref("AvailabilityStatus")
          .required()
          .authorization((allow) => [
            allow.guest().to(["read"]),
            allow.authenticated().to(["read"]),
            allow.group("ADMIN"),
            allow.owner(),
          ]),

        //RELATIONSHIP
        services: a.hasMany("ProviderService", "providerId"),
        user: a.belongsTo("NearFixUser", "userId"),
        reviews: a.hasMany("Reviews", "revieweeId"),
        bookings: a.hasMany("Booking", "providerId"),
      })
      .authorization((allow) => [
        allow.guest().to(["read"]),
        allow.authenticated().to(["read"]),
        allow.group("ADMIN"),
        allow.owner(),
      ]),

    // ---- Reviews -----------------------------------------------------------
    // Everyone signed in can read. Only the reviewer (reviewerId) can write.
    Reviews: a
      .model({
        reviewerId: a.string().required(),
        revieweeId: a.string().required(),
        bookingId: a.string().required(),
        rating: a.integer().required(),
        comment: a.string(),
        type: a.enum(["CUSTOMER_TO_PROVIDER", "PROVIDER_TO_CUSTOMER"]),

        //RELATIONSHIP
        provider: a.belongsTo("NearFixProvider", "revieweeId"),
        userReview: a.belongsTo("NearFixUser", "reviewerId"),
      })
      .authorization((allow) => [
        allow.authenticated().to(["read"]),
        allow.ownerDefinedIn("reviewerId"),
        allow.group("ADMIN"),
      ]),

    // ---- Favourite ---------------------------------------------------------
    // A customer's saved providers. Private to the owner.
    Favourite: a
      .model({
        userId: a.string().required(),
        providerId: a.string().required(),

        //RELATIONSHIP
        user: a.belongsTo("NearFixUser", "userId"),
      })
      .authorization((allow) => [allow.owner(), allow.group("ADMIN")]),

    // ---- Support -----------------------------------------------------------
    //problem usercan change status
    // (the owner has full access, so a user can edit status, adminResponse,
    // resolvedBy and resolvedAt. Add field-level rules to lock these to ADMIN.)
    Support: a
      .model({
        userId: a.string().required(),
        submitterRole: a.ref("SubmitterRole").required(),
        againstUserId: a.string(),
        complaint: a.string().required(),
        attachments: a.string().array(),
        status: a.enum(["OPEN", "IN_REVIEW", "RESOLVED"]),
        adminResponse: a.string(),
        resolvedBy: a.string(),
        resolvedAt: a.datetime(),

        //RELATIONSHIP
        user: a.belongsTo("NearFixUser", "userId"),
      })
      .authorization((allow) => [allow.owner(), allow.group("ADMIN")]),

    // ---- Notification ------------------------------------------------------
    // Private to the owner.
    Notification: a
      .model({
        userId: a.string().required(),
        providerId: a.string(),
        title: a.string(),
        description: a.string(),
        isRead: a.boolean().default(false),

        //RELATIONSHIP
        user: a.belongsTo("NearFixUser", "userId"),
      })
      .authorization((allow) => [allow.owner(), allow.group("ADMIN")]),

    // ---- Booking -----------------------------------------------------------
    // The provider (providerId) can read. ADMIN has full access.
    // NOTE: the customer (userId) has no rule here, so the customer cannot
    // read their own booking yet.
    Booking: a
      .model({
        userId: a.string().required(),
        providerId: a.string().required(),
        providerServiceId: a.string().required(),
        description: a.string(),
        photos: a.string().array(),
        status: a.enum([
          "PENDING",
          "ACCEPTED",
          "IN_PROGRESS",
          "COMPLETED",
          "CANCELED",
        ]),
        location: a.string().required(),
        coordinates: a.string(),
        scheduledAt: a.datetime(),
        canceledBy: a.string(),
        canceledReason: a.string(),
        arrivedAt: a.datetime(),
        startedAt: a.datetime(),
        completedAt: a.datetime(),

        //RELATIONSHIP
        user: a.belongsTo("NearFixUser", "userId"),
        provider: a.belongsTo("NearFixProvider", "providerId"),
      })
      .authorization((allow) => [
        allow.ownerDefinedIn("providerId").to(["read"]),
        allow.group("ADMIN"),
      ]),

    // ---- Category ----------------------------------------------------------
    // Service categories. Everyone signed in can read, only ADMIN can manage.
    Category: a
      .model({
        name: a.string().required(),
        isActive: a.boolean().default(true),
      })
      .authorization((allow) => [
        allow.authenticated().to(["read"]),
        allow.group("ADMIN"),
      ]),

    // ---- Provider service --------------------------------------------------
    // A service offered by a provider, with price. Signed-in users can read.
    ProviderService: a
      .model({
        providerId: a.string().required(),
        price: a.integer().required(),
        description: a.string(),
        isActive: a.boolean().default(true),
        category: a.string().required(),
        pricingType: a.enum(["PER_TASK", "PER_HOUR", "PER_PRODUCT", "PER_DAY"]),
        provider: a.belongsTo("NearFixProvider", "providerId"),
        ProductImages: a.string().array(),
      })
      .authorization((allow) => [
        allow.owner(),
        allow.authenticated().to(["read"]),
        allow.group("ADMIN"),
      ]),

    // ---- Warning -----------------------------------------------------------
    // Warnings issued to users by ADMIN. Signed-in users can read.
    Warning: a
      .model({
        issuedTo: a.string().required(),
        issuedBy: a.string().required(),
        reason: a.string().required(),
        supportId: a.string(),

        //RELATIONSHIP
        userWarnngs: a.belongsTo("NearFixUser", "issuedTo"),
      })

      .authorization((allow) => [
        allow.group("ADMIN"),
        allow.authenticated().to(["read"]),
      ]),

    // ======================================================================
    // 3. CUSTOM MUTATIONS (handled by Lambda functions)
    // ======================================================================
    /// lambdas

    // Makes sure a NearFixUser record exists for the signed-in user.
    ensureUser: a
      .mutation()
      .arguments({})
      .returns(a.boolean())
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(ensureUser)),

    // A signed-in user submits a provider application.
    // The Lambda reads the user id from the token, sets the status to
    // PENDING and saves the record using its own IAM role.
    createMyProviderApplication: a
      .mutation()
      .arguments({
        businessName: a.string().required(),
        serviceArea: a.string().required(),
        selfie: a.string(),
        CNICNumber: a.string(),
        CNICNAME: a.string(),
        CNICFrontSide: a.string(),
        CNICBackSide: a.string(),
      })
      .returns(a.ref("ProviderApplication"))
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(createProviderApplication)),

    reviewProviderApplication: a
      .mutation()
      .arguments({
        applicationId: a.id().required(),
        applicationStatus: a.ref("ApplicationStatus").required(),
      })
      .returns(a.ref("ProviderApplication"))
      .authorization((allow) => [allow.group("ADMIN")])
      .handler(a.handler.function(updateProviderApplication)),
  })
  // ========================================================================
  // 4. SCHEMA-LEVEL AUTHORIZATION
  // Lets this Lambda call the data API with its IAM role (authMode: "iam").
  // This is also what injects AMPLIFY_DATA_DEFAULT_NAME into the function.
  // Any Lambda that uses the data client must be listed here.
  // ========================================================================
  .authorization((allow) => [
    allow.resource(createProviderApplication),
    allow.resource(updateProviderApplication).to(["query", "mutate"]),
  ]);

// ==========================================================================
// 5. EXPORTS
// ==========================================================================
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // Used when a request does not specify an auth mode (signed-in user)
    defaultAuthorizationMode: "userPool",
  },
});
