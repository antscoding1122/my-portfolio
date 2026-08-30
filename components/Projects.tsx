"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getTrackBackground } from "react-range";
import Range from "react-range/lib/Range";

import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "The first portfolio website I made.",
    image: "/images/portfolio-website.png",
    href: "/",
    tags: ["Frontend"],
    skills: ["Next.js", "Tailwind CSS"],
    uploaded: "2026-08-29",
    updated: "2026-08-29",
  },
  {
    title: "Video Game Sales Analytics",
    description:
      "The first data analysis project I made. It aims to analyze several KPIs and a few business questions.",
    image: "/images/video-games-sales-dashboard.png",
    href: "https://github.com/antscoding1122/vg-sales-analysis",
    tags: ["Data Analysis", "Data Visualization"],
    skills: ["Excel", "Python", "Pandas", "SQL", "Tableau"],
    uploaded: "2026-08-28",
    updated: "2026-08-28",
  },
];

// All unique tags, for the filter dropdowns.
const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
const allSkills = Array.from(new Set(projects.flatMap((p) => p.skills)));

// Month range for the sliders (month index = year * 12 + month).
function toMonth(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.getFullYear() * 12 + d.getMonth();
}

// Format a month index as "Mar 2024".
function formatMonth(m: number) {
  return new Date(Math.floor(m / 12), m % 12, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const uploadMonths = projects.map((p) => toMonth(p.uploaded)).sort((a, b) => a - b);
const updateMonths = projects.map((p) => toMonth(p.updated)).sort((a, b) => a - b);
const monthBounds = (months: number[]) => [months[0], months[months.length - 1]] as const;
const [minUploadMonth, maxUploadMonth] = monthBounds(uploadMonths);
const [minUpdateMonth, maxUpdateMonth] = monthBounds(updateMonths);

// Dual-thumb month range slider (react-range).
function MonthRangeSlider({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const [lo, hi] = value;
  // react-range requires min < max; when all projects share one month,
  // pad the max so the slider stays valid.
  const rangeMax = max > min ? max : min + 1;
  return (
    <div className="flex flex-col items-center gap-1 text-sm font-medium text-zinc-700">
      <span>
        {label}: {formatMonth(lo)} – {formatMonth(hi)}
      </span>
      <div className="w-64">
        <Range
          values={value}
          min={min}
          max={rangeMax}
          step={1}
          onChange={(vals) => onChange([vals[0], vals[1]])}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-1.5 w-full self-center rounded-full"
              style={{
                ...props.style,
                background: getTrackBackground({
                  values: value,
                  colors: ["#e4e4e7", "#60a5fa", "#e4e4e7"],
                  min,
                  max: rangeMax,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              key={props.key}
              className="h-4 w-4 rounded-full border-2 border-blue-500 bg-white shadow"
              style={props.style}
              tabIndex={props.tabIndex}
              role={props.role}
              ref={props.ref}
              aria-valuemax={props["aria-valuemax"]}
              aria-valuemin={props["aria-valuemin"]}
              aria-valuenow={props["aria-valuenow"]}
              aria-label={props["aria-label"]}
              aria-labelledby={props["aria-labelledby"]}
              draggable={props.draggable}
              onKeyDown={props.onKeyDown}
              onKeyUp={props.onKeyUp}
              onFocus={undefined}
              onBlur={undefined}
            />
          )}
        />
      </div>
    </div>
  );
}

// Format an ISO date string as "Jan 2024".
function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// Multi-select checkbox dropdown used for filtering by tag or skill.
function FilterDropdown({
  label,
  options,
  active,
  onToggle,
}: {
  label: string;
  options: string[];
  active: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <details className="relative text-sm font-medium text-zinc-700">
      <summary className="flex w-64 cursor-pointer list-none items-center justify-between gap-3 rounded-md border hover-green bg-white/80 px-4 py-2">
        {label}
        <span className="text-zinc-500">
          {active.length === 0
            ? "All"
            : active.length === 1
              ? active[0]
              : `${active.length} selected`}
        </span>
        <Image
          src="https://img.icons8.com/ios-glyphs/30/chevron-down.png"
          alt=""
          width={14}
          height={14}
          className="ml-auto shrink-0 opacity-60"
        />
      </summary>
      <div className="absolute z-10 mt-1 w-64 rounded-md border hover-green bg-white p-2 shadow-lg">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-zinc-50"
          >
            <input
              type="checkbox"
              checked={active.includes(option)}
              onChange={() => onToggle(option)}
              className="accent-blue-500"
            />
            {option}
          </label>
        ))}
      </div>
    </details>
  );
}

export default function Projects() {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [uploadRange, setUploadRange] = useState<[number, number]>([minUploadMonth, maxUploadMonth]);
  const [updateRange, setUpdateRange] = useState<[number, number]>([minUpdateMonth, maxUpdateMonth]);
  const [showAll, setShowAll] = useState(false);

  const filtered = projects.filter((p) => {
    const matchesTag = activeTags.length === 0 || p.tags.some((t) => activeTags.includes(t));
    const matchesSkill =
      activeSkills.length === 0 || p.skills.some((s) => activeSkills.includes(s));
    const matchesUpload =
      toMonth(p.uploaded) >= uploadRange[0] && toMonth(p.uploaded) <= uploadRange[1];
    const matchesUpdate =
      toMonth(p.updated) >= updateRange[0] && toMonth(p.updated) <= updateRange[1];
    return matchesTag && matchesSkill && matchesUpload && matchesUpdate;
  });

  // Sort by upload date, most recent first.
  const sorted = [...filtered].sort((a, b) => b.uploaded.localeCompare(a.uploaded));

  const toggle =
    (setter: Dispatch<SetStateAction<string[]>>) => (value: string) =>
      setter((list) =>
        list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
      );

  // Close any open dropdown when clicking outside of one, so only
  // one dropdown is open at a time.
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("details")) {
        document.querySelectorAll("details[open]").forEach((d) => d.removeAttribute("open"));
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <section id="projects" className="mb-[50vh] space-y-6 px-8 py-20 md:px-20">
      {/* Header */}
      <div className="mx-auto flex max-w-[60rem] flex-col items-center space-y-4 text-center">
        <div className="w-full rounded-lg border border-white transition-colors hover:border-green-500 bg-black/80 px-6 py-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Projects
          </h2>
          <p className="mx-auto mt-2 max-w-[85%] text-zinc-300 sm:text-lg">
            Showcasing impactful projects and technical achievements.
          </p>
        </div>
      </div>

      {/* Filter dropdowns */}
      <div className="relative z-20 mx-auto flex max-w-[44rem] flex-col items-center gap-4 rounded-lg border border-black transition-colors hover:border-green-500 bg-white/80 px-6 py-4 backdrop-blur-sm">
        {/* Row 1: dropdowns */}
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
          <FilterDropdown
            label="Project Types"
            options={allTags}
            active={activeTags}
            onToggle={toggle(setActiveTags)}
          />

          <FilterDropdown
            label="Tech Skills"
            options={allSkills}
            active={activeSkills}
            onToggle={toggle(setActiveSkills)}
          />
        </div>

        {/* Row 2: year sliders */}
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
        {/* Range slider: Upload Month */}
        <MonthRangeSlider
          label="Uploaded"
          min={minUploadMonth}
          max={maxUploadMonth}
          value={uploadRange}
          onChange={setUploadRange}
        />

        {/* Range slider: Last Updated Month */}
        <MonthRangeSlider
          label="Updated"
          min={minUpdateMonth}
          max={maxUpdateMonth}
          value={updateRange}
          onChange={setUpdateRange}
        />
        </div>
      </div>

      {/* Grid of project cards */}
      <div className="w-full">
        <ul className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(showAll ? sorted : sorted.slice(0, 3)).map((project) => (
            <li key={project.title} className="h-full w-full min-w-0">
              <div className="relative flex h-full flex-col rounded-lg border border-black transition-colors hover:border-green-500 bg-white/80 p-6 backdrop-blur-sm">
                {/* Project image */}
                <div className="relative h-[200px] w-full flex-shrink-0 overflow-hidden rounded-lg border border-black">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-grow flex-col items-center space-y-3 pt-5 text-center">
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                    {project.title}
                  </h3>
                  <p className="font-normal text-zinc-600">
                    {project.description}
                  </p>
                  <div className="flex flex-grow flex-wrap content-start justify-center gap-2 pb-3">
                    {[...project.tags, ...project.skills].map((label) => (
                      <span key={label} className="pill">
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Date tags, on their own row */}
                  <div className="flex flex-wrap justify-center gap-2 pb-3">
                    <span className="pill">Uploaded: {formatDate(project.uploaded)}</span>
                    <span className="pill">Updated: {formatDate(project.updated)}</span>
                  </div>
                </div>

                {/* Read more */}
                <Link
                  href={project.href}
                  className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400 sm:w-auto"
                >
                  READ MORE
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Show all toggle (only when there are more than 3 projects) */}
      {sorted.length > 3 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 rounded-md border border-black transition-colors hover:border-green-500 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-900 backdrop-blur-sm transition-colors hover:border-green-500"
          >
            {showAll ? "Show fewer projects" : `Show ${sorted.length - 3} more projects`}
            <Image
              src={
                showAll
                  ? "https://img.icons8.com/ios-glyphs/30/collapse-arrow.png"
                  : "https://img.icons8.com/ios-glyphs/30/expand-arrow.png"
              }
              alt=""
              width={14}
              height={14}
              className="shrink-0 opacity-60"
            />
          </button>
        </div>
      )}
    </section>
  );
}