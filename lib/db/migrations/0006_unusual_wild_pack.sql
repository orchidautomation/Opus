ALTER TABLE "Message_v2" RENAME TO "Message";
--> statement-breakpoint
ALTER TABLE "workspaces" RENAME TO "Workspaces";
--> statement-breakpoint
ALTER TABLE "workspace_members" RENAME TO "WorkspaceMembers";
--> statement-breakpoint
ALTER TABLE "workspace_credentials" RENAME TO "WorkspaceCredentials";
--> statement-breakpoint
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_workspace_id_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "Document" DROP CONSTRAINT "Document_workspace_id_workspaces_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "WorkspaceCredentials" ADD CONSTRAINT "WorkspaceCredentials_workspace_id_Workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."Workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "WorkspaceMembers" ADD CONSTRAINT "WorkspaceMembers_workspace_id_Workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."Workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Message" ADD CONSTRAINT "Message_workspace_id_Workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."Workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chat" ADD CONSTRAINT "Chat_workspace_id_Workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."Workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Document" ADD CONSTRAINT "Document_workspace_id_Workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."Workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_workspace_id_Workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."Workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
