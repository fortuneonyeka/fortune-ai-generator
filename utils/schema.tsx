import { pgTable, serial,text,varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aioutput", {
      id: serial('id').primaryKey(),
     formData:varchar("formData").notNull(),
     templateSlug:varchar("templateSlug").notNull(),
     createdBy:varchar("email").notNull(),
      createdAt: text("createdAt"),
      updatedAt: text("updatedAt"),
      aiResponse:text("aiResponse")
//   name: text('name'),
//   desc: text('desc'),
})