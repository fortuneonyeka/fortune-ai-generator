/** @type { import("drizzle-kit").Config } */
export default {
      schema: "./utils/schema.tsx",
      dialect: 'postgresql',
      dbCredentials: {
        url:"postgresql://neondb_owner:Cp3tIvJYj5eg@ep-calm-band-a2q0cy0w.eu-central-1.aws.neon.tech/fortune-ai-generator?sslmode=require"
      }
    };