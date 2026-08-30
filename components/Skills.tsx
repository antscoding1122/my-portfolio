// Server component for the Skills section (Technologies).
import Image from "next/image";

export default function Skills() {
  const groups = [
    {
      title: "Front-End",
      items: [
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
        { name: "JavaScript", icon: "js" },
        { name: "TypeScript", icon: "typescript" },
        { name: "React.js", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind CSS", icon: "tailwind" },
      ],
    },
    {
      title: "Back-End",
      items: [
        { name: "Node.js", icon: "nodejs" },
        // { name: "Express.js", icon: "express" },
        { name: "Python", icon: "python" },
        { name: "SQL", icon: "mysql" },
        { name: "Git", icon: "git" },
        { name: "Github", icon: "github" },
      ],
    },
    {
      title: "Data",
      items: [
        { name: "Excel", icon: "https://img.icons8.com/color/48/microsoft-excel-2019.png" },
        { name: "SQL", icon: "mysql" },
        { name: "Tableau", icon: "https://img.icons8.com/color/48/tableau-software.png" },
        { name: "PowerBI", icon: "https://img.icons8.com/color/48/power-bi.png" },
        { name: "Python", icon: "python" },
        { name: "Pandas", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg" },
        { name: "NumPy", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg" },
        { name: "Jupyter Notebook", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original.svg" },
      ],
    },
  ];

  return (
    <section id="skills" className="mb-[50vh] space-y-6 px-8 py-20 md:px-20">
      {/* Header */}
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 rounded-lg border border-white transition-colors hover:border-green-500 bg-black/80 p-6 text-center backdrop-blur-sm">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          Technical Skills
        </h2>
        <p className="max-w-[85%] text-zinc-300 sm:text-lg">
          I&apos;ve used the following technologies and tools.
        </p>
      </div>

      {/* Category grid */}
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.title}
            className="flex flex-col gap-4 rounded-lg border border-black transition-colors hover:border-green-500 bg-white/80 p-6 backdrop-blur-sm"
          >
            <h3 className="text-center text-2xl font-bold text-zinc-900">{group.title}</h3>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
              {group.items.map((item) => (
                <li key={item.name} className="group relative flex">
                  {/* Icon tile */}
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-black transition-colors hover:border-green-500 bg-white/80 text-2xl font-bold shadow-sm backdrop-blur-sm">
                    <Image
                      src={item.icon.startsWith('http') ? item.icon : `https://skillicons.dev/icons?i=${item.icon}`}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </span>
                  {/* Hover tooltip label */}
                  <span className="pointer-events-none absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 rounded-md bg-zinc-800 px-2 text-sm text-zinc-100 opacity-0 transition-opacity group-hover:opacity-100 z-10">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}