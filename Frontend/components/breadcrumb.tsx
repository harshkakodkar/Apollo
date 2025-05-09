import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Breadcrumb() {
  return (
    <nav className="flex py-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-teal-600">
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/doctors" className="ml-1 text-sm font-medium text-gray-700 hover:text-teal-600">
              Doctors
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-500">General Physicians</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
