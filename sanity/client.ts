import { createClient } from "next-sanity";

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } = process.env;

// Check if configuration is available
export const isSanityConfigured = () => {
  return !!(SANITY_PROJECT_ID && SANITY_DATASET);
};

export const client = createClient({
  projectId: SANITY_PROJECT_ID || "dummy-project-id",
  dataset: SANITY_DATASET || "production",
  apiVersion: SANITY_API_VERSION || "2023-12-01",
  useCdn: false,
});