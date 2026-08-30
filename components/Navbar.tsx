"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

// A single navigation entry shown in the navbar.
type NavLink = {
  label: string;
  href: string;
};

// Central place to define the navbar links. Add/remove entries here
// rather than editing markup each time.
const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

// Client Component: clicking a link always scrolls to its section,
// even when the URL hash is already on that section.
export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between border border-black transition-colors hover:border-green-500 bg-white/50 px-16 py-4 backdrop-blur-sm md:px-40">
      {/* Brand: icon + "Portfolio", clicking returns home */}
      <Link href="/" className="flex items-center gap-2">
        {/* Sun icon */}
        <FontAwesomeIcon
          icon={faSun}
          className="h-6 w-6 text-yellow-500 animate-spin-slow"
        />
        <span className="inline-block text-xl font-semibold tracking-tight text-zinc-900 transition-all hover:scale-110 hover:font-bold hover:text-green-600 active:scale-95 active:text-green-700">
          My Portfolio
        </span>
      </Link>

      {/* Nav links */}
      <ul className="flex items-center gap-10">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="relative text-lg font-medium text-zinc-800 transition-all hover:scale-110 hover:font-bold hover:text-green-600 active:scale-95 active:text-green-700"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(href.slice(1))
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

