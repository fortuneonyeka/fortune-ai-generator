import { pgTable, serial,text,varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aioutput", {
      id: serial('id').primaryKey(),
     formData:varchar("formData").notNull(),
     templateSlug:varchar("templateSlug").notNull(),
     createdBy:varchar("email").notNull(),
      createdAt: text("createdAt"),
      aiResponse:text("aiResponse")
})