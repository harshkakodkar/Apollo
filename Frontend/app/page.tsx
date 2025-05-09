"use client"
import { useState } from "react"
import DoctorListing from "@/components/doctor-listing"
import Filters from "@/components/filters"
import Breadcrumb from "@/components/breadcrumb"
import type { FilterParams } from "@/types/doctor"

export default function Home() {
  const [filters, setFilters] = useState<FilterParams>({
    consultMode: [],
    experience: [],
    fees: [],
    language: [],
    page: 1,
    limit: 10,
  })

  const handleFilterChange = (newFilters: Partial<FilterParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      consultMode: [],
      experience: [],
      fees: [],
      language: [],
      page: 1,
      limit: 10,
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Filters onFilterChange={handleFilterChange} activeFilters={filters} onClearAll={handleClearFilters} />
        </div>
        <div className="w-full md:w-3/4">
          <DoctorListing filters={filters} onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} />
        </div>
      </div>
    </div>
  )
}
