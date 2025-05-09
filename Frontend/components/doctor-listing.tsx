"use client"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { Info, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import type { Doctor, FilterParams } from "@/types/doctor"

interface DoctorListingProps {
  filters: FilterParams
  onPageChange: (page: number) => void
}

export default function DoctorListing({ filters, onPageChange }: DoctorListingProps) {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("availability")
  const [currentPage, setCurrentPage] = useState(filters.page)
  const doctorsPerPage = 5

  // Hardcoded doctors with proper consultModes
  const hardcodedDoctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Liritha C",
      specialty: "General Physician/ Internal Medicine Specialist",
      experience: "5 YEARS",
      qualification: "MBBS, MD (GENERAL MEDICINE)",
      location: "Apollo 24|7 Virtual Clinic - Telangana Hyderabad",
      fee: "₹429",
      badge: "DOCTOR OF THE HOUR",
      image: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
      languages: ["english", "telugu"],
      consultModes: ["online"],
      experienceYears: 5,
    },
    {
      id: "2",
      name: "Dr. Thandra Ramoji Babu",
      specialty: "General Physician/ Internal Medicine Specialist",
      experience: "5 YEARS",
      qualification: "MBBS, DNB(GENERAL MEDICINE)",
      location: "Warangal",
      hospital: "Sai Ram Multi-Specialty Hospital, Warangal",
      onlineFee: "₹375",
      visitFee: "₹400",
      image: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
      languages: ["english", "hindi", "telugu"],
      consultModes: ["online", "hospital"],
      experienceYears: 5,
    }
  ]

  useEffect(() => {
    fetchDoctors()
  }, [filters, sortBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const fetchDoctors = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()

      if (filters.consultMode.length > 0) {
        queryParams.append("consultMode", filters.consultMode.join(","))
      }
      if (filters.experience.length > 0) {
        queryParams.append("experience", filters.experience.join(","))
      }
      if (filters.fees.length > 0) {
        queryParams.append("fees", filters.fees.join(","))
      }
      if (filters.language.length > 0) {
        queryParams.append("language", filters.language.join(","))
      }
      queryParams.append("sortBy", sortBy)

      const response = await fetch(`http://localhost:5000/api/list-doctor-with-filter?${queryParams.toString()}`)
      const apiData = await response.json()
      
      // Transform API data with proper consultModes
      const apiDoctors: Doctor[] = apiData.data.map((doctor: any) => ({
        id: doctor._id,
        name: doctor.name,
        specialty: doctor.specialty,
        experience: doctor.experience,
        qualification: doctor.qualification,
        location: doctor.location,
        hospital: doctor.hospital,
        fee: doctor.fee ? `₹${doctor.fee}` : undefined,
        onlineFee: doctor.onlineFee ? `₹${doctor.onlineFee}` : undefined,
        visitFee: doctor.visitFee ? `₹${doctor.visitFee}` : undefined,
        image: doctor.image || "/placeholder.svg?height=80&width=80",
        languages: doctor.languages || [],
        consultModes: doctor.consultModes || 
                     (doctor.onlineFee ? ["online"] : [])
                     .concat(doctor.visitFee ? ["hospital"] : []),
        experienceYears: doctor.experienceYears || 0
      }))

      // First filter hardcoded doctors
      const filteredHardcoded = hardcodedDoctors.filter(doctor => {
        // Consult mode filter
        if (filters.consultMode.length > 0) {
          if (!doctor.consultModes || !filters.consultMode.some(mode => 
              doctor.consultModes.includes(mode))) {
            return false
          }
        }
        return true
      })

      // Then combine with API doctors (which are already filtered by the API)
      const combinedDoctors = [...filteredHardcoded, ...apiDoctors]

      // Apply remaining filters that couldn't be handled by API
      const filteredDoctors = applyClientSideFilters(combinedDoctors, filters)

      // Apply sorting
      const sortedDoctors = sortDoctors(filteredDoctors, sortBy)

      setAllDoctors(sortedDoctors)
    } catch (error) {
      console.error("Error fetching doctors:", error)
      // Fallback - filter only hardcoded doctors
      const filteredHardcoded = hardcodedDoctors.filter(doctor => {
        if (filters.consultMode.length > 0 && 
            (!doctor.consultModes || !filters.consultMode.some(mode => doctor.consultModes.includes(mode)))) {
          return false
        }
        return true
      })
      setAllDoctors(filteredHardcoded)
    } finally {
      setLoading(false)
    }
  }

  const applyClientSideFilters = (doctors: Doctor[], filters: FilterParams) => {
    let filtered = [...doctors]

    // Experience filter
    if (filters.experience.length > 0) {
      filtered = filtered.filter((doctor) => {
        const years = doctor.experienceYears || Number.parseInt(doctor.experience.split(" ")[0])
        return filters.experience.some((range) => {
          if (range === "0-5") return years >= 0 && years <= 5
          if (range === "6-10") return years >= 6 && years <= 10
          if (range === "11-16") return years >= 11 && years <= 16
          if (range === "17+") return years >= 17
          return false
        })
      })
    }

    // Fees filter
    if (filters.fees.length > 0) {
      filtered = filtered.filter((doctor) => {
        const fee = Number.parseInt(doctor.fee?.replace(/[^\d]/g, "") || "0")
        const onlineFee = Number.parseInt(doctor.onlineFee?.replace(/[^\d]/g, "") || "0")
        const visitFee = Number.parseInt(doctor.visitFee?.replace(/[^\d]/g, "") || "0")

        return filters.fees.some((range) => {
          if (range === "100-500") {
            return (
              (fee >= 100 && fee <= 500) ||
              (onlineFee >= 100 && onlineFee <= 500) ||
              (visitFee >= 100 && visitFee <= 500)
            )
          }
          if (range === "500-1000") {
            return (
              (fee >= 500 && fee <= 1000) ||
              (onlineFee >= 500 && onlineFee <= 1000) ||
              (visitFee >= 500 && visitFee <= 1000)
            )
          }
          if (range === "1000+") {
            return fee > 1000 || onlineFee > 1000 || visitFee > 1000
          }
          return false
        })
      })
    }

    // Language filter
    if (filters.language.length > 0) {
      filtered = filtered.filter((doctor) =>
        filters.language.some((lang) => doctor.languages?.includes(lang))
      )
    }

    return filtered
  }

  const sortDoctors = (doctors: Doctor[], sortBy: string) => {
    const sorted = [...doctors]
    
    if (sortBy === "experience") {
      sorted.sort((a, b) => {
        const yearsA = a.experienceYears || Number.parseInt(a.experience.split(" ")[0])
        const yearsB = b.experienceYears || Number.parseInt(b.experience.split(" ")[0])
        return yearsB - yearsA
      })
    } else if (sortBy === "fees") {
      sorted.sort((a, b) => {
        const feeA = Number.parseInt(a.fee?.replace(/[^\d]/g, "") || "0")
        const feeB = Number.parseInt(b.fee?.replace(/[^\d]/g, "") || "0")
        return feeA - feeB
      })
    }

    return sorted
  }

  // Calculate paginated doctors
  const paginatedDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * doctorsPerPage
    return allDoctors.slice(startIndex, startIndex + doctorsPerPage)
  }, [allDoctors, currentPage])

  // Calculate total pages
  const totalPages = Math.ceil(allDoctors.length / doctorsPerPage)

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Consult General Physicians Online - Internal Medicine Specialists</h1>
          <p className="text-gray-600">({allDoctors.length} doctors)</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link href="/doctors/add">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
          </Link>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="availability">Availability</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="fees">Fees: Low to High</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : paginatedDoctors.length === 0 ? (
        <div className="text-center py-10 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No doctors found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedDoctors.map((doctor) => (
            <div key={doctor.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-start mb-4 md:mb-0">
                  <div className="relative mr-4">
                    <Image
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold">{doctor.name}</h2>
                      <Info className="h-4 w-4 ml-2 text-gray-400" />
                      {doctor.badge && (
                        <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">{doctor.badge}</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {doctor.experience} • {doctor.qualification}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">{doctor.location}</p>
                    {doctor.hospital && <p className="text-gray-500 text-sm">{doctor.hospital}</p>}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {doctor.languages?.map((lang) => (
                        <span key={lang} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:ml-auto flex flex-col md:items-end">
                  <div className="flex items-center justify-between md:justify-end mb-4">
                    {doctor.fee && <div className="text-xl font-bold">{doctor.fee}</div>}
                    {doctor.cashback && (
                      <div className="ml-4 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded flex items-center">
                        <span className="h-4 w-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs mr-1">
                          ₹
                        </span>
                        {doctor.cashback}
                      </div>
                    )}
                  </div>

                  {doctor.onlineFee ? (
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <div className="text-center">
                        <div className="text-xl font-bold">{doctor.onlineFee}</div>
                        <Button variant="outline" className="w-full mt-2">
                          <span className="text-sm">Consult Online</span>
                          <span className="text-xs block text-green-600">Available</span>
                        </Button>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{doctor.visitFee}</div>
                        <Button variant="outline" className="w-full mt-2 bg-teal-600 text-white hover:bg-teal-700">
                          <span className="text-sm">Visit Doctor</span>
                          <span className="text-xs block">Available</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white">
                      Consult Online
                    </Button>
                  )}

                  {doctor.noBookingFee && <span className="text-xs text-gray-500 mt-2">{doctor.noBookingFee}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {allDoctors.length > doctorsPerPage && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
