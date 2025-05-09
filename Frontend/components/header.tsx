import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, ChevronDown, User } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="https://images.apollo247.in/images/icons/apollo247.svg"
              alt="Apollo 24/7"
              width={120}
              height={40}
              className="h-10"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-1 text-gray-700">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span className="text-sm">Select Location</span>
            <div className="flex items-center">
              <span className="text-sm font-medium">Select Address</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Doctors, Specialities, Conditions etc."
            />
          </div>
        </div>

        <div>
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 border border-teal-700 rounded-lg text-teal-700 font-medium"
          >
            <span>Login</span>
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
