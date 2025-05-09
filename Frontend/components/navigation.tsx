import Link from "next/link"

export default function Navigation() {
  const navItems = [
    { name: "Buy Medicines", href: "/medicines" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "Lab Tests", href: "/lab-tests" },
    { name: "Circle Membership", href: "/circle-membership" },
    { name: "Health Records", href: "/health-records" },
    { name: "Diabetes Reversal", href: "/diabetes-reversal" },
    { name: "Buy Insurance", href: "/insurance", badge: "New" },
  ]

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-800 hover:text-teal-600 hover:border-b-2 hover:border-teal-600"
            >
              {item.name}
              {item.badge && (
                <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
