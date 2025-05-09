"use client"
import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddDoctorPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    specialty: "General Physician/ Internal Medicine Specialist",
    experience: "",
    experienceYears: "",
    qualification: "",
    location: "",
    hospital: "",
    fee: "",
    onlineFee: "",
    visitFee: "",
    image: "https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2",
    languages: [] as string[],
    consultModes: [] as string[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentArray = prev[name as keyof typeof prev] as string[]
      if (checked) {
        return { ...prev, [name]: [...currentArray, value] }
      } else {
        return { ...prev, [name]: currentArray.filter((item) => item !== value) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:5000/api/add-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Redirect to doctors page on success
        router.push("/")
      } else {
        const data = await response.json()
        
        alert(`Error: ${data.error || "Failed to add doctor"}`)
      }
    } catch (error) {
      console.error("Error adding doctor:", error)
      alert("An error occurred while adding the doctor. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Doctors
        </Link>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Doctor</CardTitle>
          <CardDescription>Fill in the details to add a new doctor to the platform</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Doctor Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Dr. John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty*</Label>
                <Select value={formData.specialty} onValueChange={(value) => handleSelectChange("specialty", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Physician/ Internal Medicine Specialist">
                      General Physician/ Internal Medicine Specialist
                    </SelectItem>
                    <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                    <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                    <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                    <SelectItem value="Neurologist">Neurologist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience*</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="5 YEARS"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Experience in Years*</Label>
                <Input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  placeholder="5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification*</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="MBBS, MD (GENERAL MEDICINE)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Hyderabad"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital (Optional)</Label>
                <Input
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  placeholder="Apollo Hospital, Hyderabad"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee">Consultation Fee (Optional)</Label>
                <Input id="fee" name="fee" value={formData.fee} onChange={handleInputChange} placeholder="₹500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="onlineFee">Online Consultation Fee (Optional)</Label>
                <Input
                  id="onlineFee"
                  name="onlineFee"
                  value={formData.onlineFee}
                  onChange={handleInputChange}
                  placeholder="₹400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitFee">Visit Fee (Optional)</Label>
                <Input
                  id="visitFee"
                  name="visitFee"
                  value={formData.visitFee}
                  onChange={handleInputChange}
                  placeholder="₹600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://images.apollo247.in/images/consult_home/icons/male.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2"
                />
              </div>
            </div>

            <div className="space-y-2">
            <Label>Languages*</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lang-english"
                    checked={formData.languages.includes("english")}
                    onCheckedChange={(checked) => handleCheckboxChange("languages", "english", checked as boolean)}
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
                    checked={formData.languages.includes("hindi")}
                    onCheckedChange={(checked) => handleCheckboxChange("languages", "hindi", checked as boolean)}
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
                    checked={formData.languages.includes("telugu")}
                    onCheckedChange={(checked) => handleCheckboxChange("languages", "telugu", checked as boolean)}
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

            <div className="space-y-2">
              <Label>Consultation Modes*</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mode-in-person"
                    checked={formData.consultModes.includes("In-Person")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("consultModes", "In-Person", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="mode-in-person"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    In-Person
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mode-online"
                    checked={formData.consultModes.includes("Online")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("consultModes", "Online", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="mode-online"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Online
                  </label>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
