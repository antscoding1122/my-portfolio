// Server component for the Experience section.
import Image from "next/image";

export default function Experience() {
  const experiences = [
    {
      title: "SAT/High School Tutor",
      company: "",
      period: "July 2026 - Present",
      description:
        "SAT and High School Academic Tutor",
      bullets: [
        <>
          Provided one-on-one and group instruction to{" "}
          <strong>50+ middle and high school students</strong> in SAT
          Preparation and academic coursework.
        </>,
        <>
          Taught and reinforced <strong>Math, Reading, and Physics</strong>{" "}
          concepts, adapting instruction to individual learning needs and
          helping students strengthen foundational skills and advance beyond
          their coursework.
        </>,
        <>
          Created{" "}
          <strong>
            customized study guides, notesheets, and practice assignments
          </strong>{" "}
          targeting individual students&rsquo; SAT weaknesses and knowledge
          gaps.
        </>,
      ],
    },
    {
      title: "CLUE Math Tutor",
      company: "UW Academic Support Programs",
      period: "Sep 2024 - June 2026",
      description:
        "UW Undergraduate Math Tutor",
      bullets: [
        <>
          Provided one-on-one tutoring sessions for{" "}
          <strong>
            100+ different college students
          </strong>{" "}
          in various math subjects, most commonly Pre-Calculus, Calculus,
          Differential Equations, and Linear Algebra.
        </>,
        <>
          <strong>
            Promoted effective study techniques, note-taking skills, and
            test-taking strategies
          </strong>{" "}
          to enhance students&rsquo; academic performance and confidence in
          mathematics.
        </>,
      ],
    },
    {
      title: "Machine Learning Teaching Assistant",
      company: "UW CSE Department",
      period: "Jan 2025 - June 2025",
      description:
        "UW CSE Teaching Assistant",
      bullets: [
        <>
          <strong>Graded and provided constructive feedback</strong> on homework submissions of{" "}
          <strong>160 students</strong>, promoting understanding of{" "}
          Machine Learning concepts.
        </>,
        <>
          Held regular <strong>office hours</strong> and{" "}
          <strong>utilized EdStem</strong> to assist students with homework
          questions and other course topics, both in-person and online,
          fostering a supportive learning environment and clarifying complex
          topics.
        </>,
        <>
          Contributed to the{" "}
          <strong>
            development of homework assignments, section notes, and exam
            problems
          </strong>
          , ensuring alignment with course objectives and enhancing the
          learning experience for students.
        </>,
      ],
    },
  ];

  return (
    <section id="experience" className="mb-[50vh] px-8 py-24 md:px-20">
      {/* Header */}
      <div className="mx-auto mb-10 flex max-w-[52rem] flex-col items-center space-y-4 text-center">
        <div className="w-full rounded-lg border border-white transition-colors hover:border-green-500 bg-black/80 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Professional Experience
          </h2>
          <p className="mx-auto mt-2 max-w-[80%] text-zinc-300 sm:text-lg">
            Highlights of my work history and what I contributed in each role.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {experiences.map((job) => (
          <details
            key={`${job.title}-${job.company}`}
            className="group rounded-xl border border-black transition-colors hover:border-green-500 bg-white/80 shadow-sm backdrop-blur-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">{job.title}</h3>
                <p className="text-sm text-blue-600">
                  {job.company} &middot; {job.period}
                </p>
              </div>
              <Image
                src="https://img.icons8.com/ios-glyphs/60/chevron-down.png"
                alt=""
                width={28}
                height={28}
                className="shrink-0 text-zinc-700 opacity-80 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="px-6 pb-6">
              <p className="text-zinc-600">{job.description}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-zinc-700">
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}