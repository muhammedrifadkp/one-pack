import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://onepackonline.com";

  const routes = [
    "",
    "/products",
    "/about",
    "/brands",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/products" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : route === "/products" ? 0.9 : 0.7
  }));
}
