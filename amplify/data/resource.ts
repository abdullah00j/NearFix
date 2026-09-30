import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  SubmitterRole: a.enum(["PROVIDER", "CUSTOMER"]),
  VerificationStatus: a.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "CHANGE_REQUESTED",
  ]),
  AvailabilityStatus: a.enum(["ONLINE", "OFFLINE", "BUSY"]),
  Status: a.enum(["ACTIVE", "WARNED", "SUSPENDED"]),

  NearFixUser: a
    .model({
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
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.group("ADMIN"),
      allow.owner(),
    ]),

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

  Favourite: a
    .model({
      userId: a.string().required(),
      providerId: a.string().required(),

      //RELATIONSHIP
      user: a.belongsTo("NearFixUser", "userId"),
    })
    .authorization((allow) => [allow.owner(), allow.group("ADMIN")]),
  //problem usercan change status
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

  Category: a
    .model({
      name: a.string().required(),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.group("ADMIN"),
    ]),

  ProviderService: a
    .model({
      providerId: a.string().required(),
      price: a.integer().required(),
      description: a.string(),
      isActive: a.boolean().default(true),
      category: a.string().required(),
      provider: a.belongsTo("NearFixProvider", "providerId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
      allow.group("ADMIN"),
    ]),

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
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
