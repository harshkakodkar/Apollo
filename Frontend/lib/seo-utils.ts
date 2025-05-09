// Helper functions for SEO

export function generateCanonicalUrl(path: string): string {
  const baseUrl = "https://apollo247.com"
  return `${baseUrl}${path}`
}

export function generateStructuredData(type: "Organization" | "MedicalBusiness" | "FAQPage", data: any) {
  let structuredData = {}

  switch (type) {
    case "Organization":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Apollo 24/7",
        url: "https://apollo247.com",
        logo: "https://apollo247.com/logo.png",
        sameAs: [
          "https://www.facebook.com/Apollo247/",
          "https://twitter.com/apollo247",
          "https://www.instagram.com/apollo247official/",
          "https://www.linkedin.com/company/apollo247/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-8040245807",
          contactType: "customer service",
        },
      }
      break

    case "MedicalBusiness":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        name: data.name,
        image: data.image,
        address: {
          "@type": "PostalAddress",
          streetAddress: data.streetAddress,
          addressLocality: data.city,
          addressRegion: data.region,
          postalCode: data.postalCode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: data.latitude,
          longitude: data.longitude,
        },
        url: data.url,
        telephone: data.telephone,
        priceRange: data.priceRange,
        openingHoursSpecification: data.hours,
      }
      break

    case "FAQPage":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.map((item: any) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
      break
  }

  return JSON.stringify(structuredData)
}
