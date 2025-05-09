"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// This component helps with tracking and managing off-page SEO
export default function SeoHelper() {
  const pathname = usePathname()

  useEffect(() => {
    // Track referrals for backlink analysis
    const referrer = document.referrer
    if (referrer && !referrer.includes(window.location.hostname)) {
      // Record the backlink
      fetch("/api/backlinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referrer,
          page: pathname,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error("Failed to record backlink:", err))
    }

    // Add social sharing metadata dynamically if needed
    const updateSocialMetaTags = () => {
      // This would be implemented based on the specific page content
    }

    updateSocialMetaTags()
  }, [pathname])

  return null // This component doesn't render anything
}
