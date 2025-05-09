import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Apollo 24/7 - Online Doctor Consultations & Medicines",
  description:
    "Book doctor appointments online, order medicines, lab tests and consult with doctors 24/7 for any health concern.",
  keywords: "doctor appointment, online consultation, medicines, lab tests, healthcare, apollo",
  openGraph: {
    title: "Apollo 24/7 - Online Doctor Consultations & Medicines",
    description:
      "Book doctor appointments online, order medicines, lab tests and consult with doctors 24/7 for any health concern.",
    url: "https://apollo247.com",
    siteName: "Apollo 24/7",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apollo 24/7",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apollo 24/7 - Online Doctor Consultations & Medicines",
    description:
      "Book doctor appointments online, order medicines, lab tests and consult with doctors 24/7 for any health concern.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://apollo247.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://images.apollo247.in/images/icons/apollo247.svg" sizes="any" />
       
      </head>
      <body className={inter.className}>
        <Header />
        <Navigation />
        <main>{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </body>
    </html>
  )
}
