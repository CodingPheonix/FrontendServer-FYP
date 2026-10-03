const LOGO_SRC = `${import.meta.env.BASE_URL}imagelogo.png`; // file in your public folder

const COLUMNS = [
  {
    title: "Quick link",
    links: [
      { label: "Home", href: "#" },
      { label: "Scan Your Plant", href: "#" },
      { label: "Health Tracker", href: "#" },
      { label: "Fertilizer Store", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Others",
    links: [
      { label: "Blog", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Facebook", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#001c12]/90 text-gray-400">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-10 md:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo + description */}
          <div className="max-w-xs">
            <img src={LOGO_SRC} alt="Logo" className="h-16 w-auto object-contain md:h-20" />
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Detect plant diseases from a photo, track your plant's health and shop the right
              fertilizers, all in one place.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 sm:gap-x-12">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-medium text-gray-300">{col.title}</h4>
                <ul className="mt-2 space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-xs text-gray-400 transition hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col gap-1 border-t border-white/10 pt-3 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>©{new Date().getFullYear()} All rights reserved.</p>
          <p>
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <span className="mx-2">·</span>
            <a href="#" className="transition hover:text-white">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}