import type { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  foreignKey,
  boolean,
} from 'drizzle-orm/pg-core';

// Updated User table for Clerk (string ID, no email/password)
export const user = pgTable('User', {
  id: text('id').primaryKey().notNull(), // Clerk User ID is text
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable('Chat', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  createdAt: timestamp('createdAt').notNull(),
  title: text('title').notNull(),
  userId: text('userId').notNull(), // Changed to text to match Clerk user ID
  visibility: varchar('visibility', { enum: ['public', 'private'] })
    .notNull()
    .default('private'),
  workspace_id: uuid('workspace_id').references(() => Workspaces.id, { onDelete: 'cascade' }).notNull(), // Added workspace ID
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable('Message', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chatId')
    .notNull()
    .references(() => chat.id),
  role: varchar('role').notNull(),
  parts: json('parts').notNull(),
  attachments: json('attachments').notNull(),
  createdAt: timestamp('createdAt').notNull(),
  workspace_id: uuid('workspace_id').references(() => Workspaces.id, { onDelete: 'cascade' }).notNull(), // Added workspace ID
});

export type DBMessage = InferSelectModel<typeof message>;

export const document = pgTable(
  'Document',
  {
    id: uuid('id').notNull().defaultRandom(),
    createdAt: timestamp('createdAt').notNull(),
    title: text('title').notNull(),
    content: text('content'),
    kind: varchar('text', { enum: ['text', 'code', 'image', 'sheet'] })
      .notNull()
      .default('text'),
    userId: text('userId').notNull(), // Changed to text to match Clerk user ID
    workspace_id: uuid('workspace_id').references(() => Workspaces.id, { onDelete: 'cascade' }).notNull(), // Added workspace ID
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdAt] }),
    };
  },
);

export type Document = InferSelectModel<typeof document>;

export const suggestion = pgTable(
  'Suggestion',
  {
    id: uuid('id').notNull().defaultRandom(),
    documentId: uuid('documentId').notNull(),
    documentCreatedAt: timestamp('documentCreatedAt').notNull(),
    originalText: text('originalText').notNull(),
    suggestedText: text('suggestedText').notNull(),
    description: text('description'),
    isResolved: boolean('isResolved').notNull().default(false),
    userId: text('userId').notNull(), // Changed to text to match Clerk user ID
    createdAt: timestamp('createdAt').notNull(),
    workspace_id: uuid('workspace_id').references(() => Workspaces.id, { onDelete: 'cascade' }).notNull(), // Added workspace ID
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt],
    }),
  }),
);

export type Suggestion = InferSelectModel<typeof suggestion>;

// === START: Added Workspace Schemas ===

// Define the workspaces table
export const Workspaces = pgTable('Workspaces', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  owner_user_id: text('owner_user_id').notNull(), // Clerk User ID
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Define the workspace_members table (join table for users and workspaces)
export const WorkspaceMembers = pgTable('WorkspaceMembers', {
  workspace_id: uuid('workspace_id').references(() => Workspaces.id, { onDelete: 'cascade' }).notNull(),
  user_id: text('user_id').notNull(), // Clerk User ID
  role: text('role', { enum: ['owner', 'admin', 'member'] }).default('member').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.workspace_id, table.user_id] }), // Composite primary key
  };
});

// Define the workspace_credentials table
export const WorkspaceCredentials = pgTable('WorkspaceCredentials', {
  id: uuid('id').defaultRandom().primaryKey(),
  workspace_id: uuid('workspace_id').references(() => Workspaces.id, { onDelete: 'cascade' }).notNull(),
  tool_name: text('tool_name').notNull(),
  encrypted_credentials: text('encrypted_credentials').notNull(), // Store encrypted value
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// === END: Added Workspace Schemas ===
