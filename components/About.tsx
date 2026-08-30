import Image from "next/image";
import Link from "next/link";

// Server component for the About section.
export default function About() {
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/antscoding1122",
      src: "https://img.icons8.com/ios-glyphs/60/github.png",
    },
    // {
    //   label: "LinkedIn",
    //   href: "#",
    //   src: "https://img.icons8.com/ios-filled/100/linkedin.png",
    // },
  ];

  return (
    <section
      id="about"
      className="mb-[50vh] flex flex-col justify-start gap-10 px-24 pb-16 pt-28 md:flex-row md:items-center md:justify-between md:px-60"
    >
      {/* Left: name + short intro */}
      <div className="max-w-xl rounded-lg border border-black transition-colors hover:border-green-500 bg-white/80 p-6 backdrop-blur-sm text-center md:text-left">
        <div className="relative inline-block">
          <p className="text-lg font-medium text-zinc-800">
            My name is...
          </p>
        </div>
        <h1 className="mt-1 text-5xl font-bold tracking-tight md:text-6xl animate-gradient bg-gradient-to-r from-emerald-500 via-yellow-600 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent">
          Anthony
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          I graduated with a Bachelor&apos;s Degree in Computer Science and Mathematics from the University of Washington (2022-2026).
          <br /> <br />
          I&apos;m currently interested in Full-Stack Development, Data Science, and other hobbies!
          
        </p>

        {/* Social links (placeholder hrefs) */}
        <div className="mt-6 flex justify-center gap-6 md:justify-start">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              <Image src={social.src} alt={social.label} width={24} height={24} />
            </Link>
          ))}
        </div>
      </div>

      {/* Right: square animated GIF placeholder (swap for your own later) */}
      <div className="h-64 w-64 overflow-hidden rounded-2xl border border-white transition-colors hover:border-green-500 shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://media.giphy.com/media/2WUkAVDzuQbUA/giphy.gif"
          alt="Animated square placeholder"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}