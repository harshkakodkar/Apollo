import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://apollo247.com"

  // Generate static routes
  const routes = [
    "",
    "/doctors",
    "/doctors/general-physicians",
    "/doctors/cardiologists",
    "/doctors/dermatologists",
    "/medicines",
    "/lab-tests",
    "/circle-membership",
    "/health-records",
    "/diabetes-reversal",
    "/insurance",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }))

  return routes
}
