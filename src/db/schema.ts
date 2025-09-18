import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
  bigint,
} from "drizzle-orm/pg-core";

/*****************************************************************************************************
 * Crews table definition
 *****************************************************************************************************/
export const crews = pgTable("crew", {
  id: uuid("id").primaryKey().defaultRandom(),
  cognitoId: varchar("cognitoId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image: text("image"),
})
export type Crew = InferSelectModel<typeof crews>;
export type NewCrew = Pick<InferInsertModel<typeof crews>, "cognitoId" | "name" | "email">;
export type UpdateCrew = InferInsertModel<typeof crews>;

export const crewsRelations = relations(crews, ({ many }) => ({
  events: many(events),
}));

/*****************************************************************************************************
 * Trustees table definition
 *****************************************************************************************************/
export const trustees = pgTable("trustee", {
  id: uuid("id").primaryKey().defaultRandom(),
  cognitoId: varchar("cognitoId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image: text("image"),
})
export type Trustee = InferSelectModel<typeof trustees>;
export type NewTrustee = Pick<InferInsertModel<typeof trustees>, "cognitoId" | "name" | "email">;
export type UpdateTrustee = InferInsertModel<typeof trustees>;

/*****************************************************************************************************
 * Admins table definition
 *****************************************************************************************************/
export const admins = pgTable("admin", {
  id: uuid("id").primaryKey().defaultRandom(),
  cognitoId: varchar("cognitoId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image: text("image"),
})
export type Admin = InferSelectModel<typeof admins>;
export type NewAdmin = Pick<InferInsertModel<typeof admins>, "cognitoId" | "name" | "email">;
export type UpdateAdmin = InferInsertModel<typeof admins>;

/*****************************************************************************************************
 * Event related types and table definition
 *****************************************************************************************************/
export interface PageData {
  [locale: string]: {
    content?: string; // Localized markdown-formatted description
  };
}

export interface VenueData {
  name: string;
  address?: {
    street?: string;                  // "3-5-1 Marunouchi"
    city: string;                     // "Chiyoda-ku"
    state: string;                    // "Tokyo"
    country: string;                  // "Japan"
    postalCode?: string;              // "100-0005"
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  capacity?: number;
  contact?: {
    name: string;
    phone?: string;
    email?: string;
  };
  url?: string;
  formatted?: string; // e.g., Google Maps-style full address
  notes?: string;
}

export const currencyEnum = pgEnum("currency", [
  "JPY",
  "USD",
])

export type Currency = (typeof currencyEnum.enumValues)[number];

export const eventStatusEnum = pgEnum("eventStatus", [
  "Draft",
  "InReview",
  "Approved",
  "Rejected",
  "Published",
  "Canceled",
  "Archived",
]);

export type EventStatus = (typeof eventStatusEnum.enumValues)[number];

export const events = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  status: eventStatusEnum("status"),
  name: text("name").notNull(),
  description: text("description"),
  venue: jsonb("venue").$type<VenueData>(),
  startDate: timestamp("start_date", { withTimezone: true, mode: "date" }),
  endDate: timestamp("end_date", { withTimezone: true, mode: "date" }),
  // todo
  // price: bigint("price", { mode: "number" }),
  // currency: currencyEnum(),
  tags: text("tags").array(),
  // defaultLocale: varchar("default_locale", { length: 10 }).notNull(),
  // page: jsonb("page").$type<PageData>(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;

export const eventsRelations = relations(events, ({ one }) => ({
  crew: one(crews, {
    fields: [events.createdBy],
    references: [crews.cognitoId],
  })
}));

/*****************************************************************************************************
 * Event related types and table definition
 *****************************************************************************************************/
export const visibilityEnum = pgEnum("visibility", [
  "Public",
  "Private",
]);

export type Visibility = (typeof visibilityEnum.enumValues)[number];

export const meetings = pgTable("meeting", {
  id: uuid("id").primaryKey().defaultRandom(),
  visibility: visibilityEnum("visibility").notNull(),
  startDate: timestamp("start_date", { withTimezone: true, mode: "date" }),
  endDate: timestamp("end_date", { withTimezone: true, mode: "date" }),
  description: text("description"),
  location: text("location").notNull(),
  allowedRoles: text("allowed_roles").array().$type<("Crew" | "Trustee")[]>(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export type Meeting = InferSelectModel<typeof meetings>;
export type NewMeeting = InferInsertModel<typeof meetings>;
