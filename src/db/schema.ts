import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  submittedBy: uuid("submittedBy").references(() => users.id),
  payload: jsonb("payload").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt"),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("member"),
  passwordHash: text("passwordHash").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const approvalAttempts = pgTable("approval_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  formId: uuid("formId").references(() => forms.id),
  attemptNumber: integer("attemptNumber").notNull(),
  status: text("status").notNull().default("in_progress"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt"),
});

export const approvals = pgTable("approvals", {
  id: uuid("id").defaultRandom().primaryKey(),
  approvalAttemptId: uuid("approvalAttemptId").references(
    () => approvalAttempts.id
  ),
  approverId: uuid("approverId").references(() => users.id),
  formId: uuid("formId").references(() => forms.id),
  sequenceOrder: integer("sequenceOrder").notNull(),
  status: text("status").notNull().default("pending"),
  decidedAt: timestamp("decidedAt"),
  deletedAt: timestamp("deletedAt"),
});
