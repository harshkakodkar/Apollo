"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { FilterParams } from "@/types/doctor"

interface FiltersProps {
  onFilterChange: (filters: Partial<FilterParams>) => void
  activeFilters: FilterParams
  onClearAll: () => void
}

export default function Filters({ onFilterChange, activeFilters, onClearAll }: FiltersProps) {
  const [showAllExperience, setShowAllExperience] = useState(false)

  const handleConsultModeChange = (value: string, checked: boolean) => {
    let newConsultMode = [...activeFilters.consultMode]

    if (checked) {
      newConsultMode.push(value)
    } else {
      newConsultMode = newConsultMode.filter((mode) => mode !== value)
    }

    onFilterChange({ consultMode: newConsultMode })
  }

  const handleExperienceChange = (value: string, checked: boolean) => {
    let newExperience = [...activeFilters.experience]

    if (checked) {
      newExperience.push(value)
    } else {
      newExperience = newExperience.filter((exp) => exp !== value)
    }

    onFilterChange({ experience: newExperience })
  }

  const handleFeesChange = (value: string, checked: boolean) => {
    let newFees = [...activeFilters.fees]

    if (checked) {
      newFees.push(value)
    } else {
      newFees = newFees.filter((fee) => fee !== value)
    }

    onFilterChange({ fees: newFees })
  }

  const handleLanguageChange = (value: string, checked: boolean) => {
    let newLanguage = [...activeFilters.language]

    if (checked) {
      newLanguage.push(value)
    } else {
      newLanguage = newLanguage.filter((lang) => lang !== value)
    }

    onFilterChange({ language: newLanguage })
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button variant="link" className="text-teal-600" onClick={onClearAll}>
          Clear All
        </Button>
      </div>

      <div className="mb-6">
        <Button variant="outline" className="w-full justify-start">
          Show Doctors Near Me
        </Button>
      </div>

      <div className="border-t border-gray-200 py-4">
        <h3 className="font-medium mb-3">Mode of Consult</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hospital-visit"
              checked={activeFilters.consultMode.includes("hospital")}
              onCheckedChange={(checked) => handleConsultModeChange("hospital", checked as boolean)}
            />
            <label
              htmlFor="hospital-visit"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hospital Visit
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="online-consult"
              checked={activeFilters.consultMode.includes("online")}
              onCheckedChange={(checked) => handleConsultModeChange("online", checked as boolean)}
            />
            <label
              htmlFor="online-consult"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Online Consult
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <h3 className="font-medium mb-3">Experience (In Years)</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exp-0-5"
              checked={activeFilters.experience.includes("0-5")}
              onCheckedChange={(checked) => handleExperienceChange("0-5", checked as boolean)}
            />
            <label
              htmlFor="exp-0-5"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              0-5
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exp-6-10"
              checked={activeFilters.experience.includes("6-10")}
              onCheckedChange={(checked) => handleExperienceChange("6-10", checked as boolean)}
            />
            <label
              htmlFor="exp-6-10"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              6-10
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exp-11-16"
              checked={activeFilters.experience.includes("11-16")}
              onCheckedChange={(checked) => handleExperienceChange("11-16", checked as boolean)}
            />
            <label
              htmlFor="exp-11-16"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              11-16
            </label>
          </div>
          {!showAllExperience && (
            <Button
              variant="link"
              className="text-teal-600 p-0 h-auto text-sm"
              onClick={() => setShowAllExperience(true)}
            >
              +1 More
            </Button>
          )}
          {showAllExperience && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exp-17-plus"
                checked={activeFilters.experience.includes("17+")}
                onCheckedChange={(checked) => handleExperienceChange("17+", checked as boolean)}
              />
              <label
                htmlFor="exp-17-plus"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                17+
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <h3 className="font-medium mb-3">Fees (In Rupees)</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fee-100-500"
              checked={activeFilters.fees.includes("100-500")}
              onCheckedChange={(checked) => handleFeesChange("100-500", checked as boolean)}
            />
            <label
              htmlFor="fee-100-500"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              100-500
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fee-500-1000"
              checked={activeFilters.fees.includes("500-1000")}
              onCheckedChange={(checked) => handleFeesChange("500-1000", checked as boolean)}
            />
            <label
              htmlFor="fee-500-1000"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              500-1000
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fee-1000-plus"
              checked={activeFilters.fees.includes("1000+")}
              onCheckedChange={(checked) => handleFeesChange("1000+", checked as boolean)}
            />
            <label
              htmlFor="fee-1000-plus"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              1000+
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <h3 className="font-medium mb-3">Language</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lang-english"
              checked={activeFilters.language.includes("english")}
              onCheckedChange={(checked) => handleLanguageChange("english", checked as boolean)}
            />
            <label
              htmlFor="lang-english"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              English
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lang-hindi"
              checked={activeFilters.language.includes("hindi")}
              onCheckedChange={(checked) => handleLanguageChange("hindi", checked as boolean)}
            />
            <label
              htmlFor="lang-hindi"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hindi
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lang-telugu"
              checked={activeFilters.language.includes("telugu")}
              onCheckedChange={(checked) => handleLanguageChange("telugu", checked as boolean)}
            />
            <label
              htmlFor="lang-telugu"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Telugu
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
