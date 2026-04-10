"use client";

import { useRouter } from "next/navigation";
import M3Card from "@/components/M3Card";
import M3IconButton from "@/components/M3IconButton";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
    <g transform="translate(-140.000000, -7559.000000)">
      <g transform="translate(56.000000, 160.000000)">
        <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" />
      </g>
    </g>
  </svg>
);

export default function ContactTeamPage() {
  const router = useRouter();

  const teamMembers = [
    {
      name: "Olanrewaju Oluwasegun",
      role: "Frontend Engineer",
      github: "https://github.com/shegs8422/",
      handle: "@shegs8422",
      color: "bg-primary-container text-on-primary-container",
    },
    {
      name: "Oloyede Ibrahim",
      role: "Backend Engineer",
      github: "https://github.com/mista-log",
      handle: "@mista-log",
      color: "bg-tertiary-container text-on-tertiary-container",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Standardized Fixed Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 bg-background border-b border-outline-variant/10 px-4 md:px-6 lg:px-12">
        <M3IconButton
          icon="arrow_back"
          onClick={() => router.back()}
          aria-label="Back"
        />
        <h1 className="text-xl font-medium tracking-tight text-on-surface">
          The Team
        </h1>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-35 pt-6 md:px-6 lg:px-12 overflow-y-auto">
        <section className="mb-8">
          <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant px-1">
            Greenpal is built by a small team of engineers dedicated to modern, sustainable agriculture solutions. Get in touch with our lead developers on GitHub.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <div key={member.handle} className="rounded-4xl bg-surface-container-high p-8 border border-outline-variant/20 relative overflow-hidden group">
              {/* M3 Background Tonal Hint */}
              <div className={`absolute top-0 right-0 h-40 w-40 -mr-16 -mt-16 rounded-full opacity-10 ${member.color.split(' ')[0]} blur-2xl transition-opacity group-hover:opacity-20`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${member.color}`}>
                  <GitHubIcon className="w-10 h-10" />
                </div>
                
                <h2 className="text-xl font-medium text-on-surface mb-1">
                  {member.name}
                </h2>
                <p className="text-sm font-medium text-primary mb-6">
                  {member.role}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-highest text-on-surface-variant">
                      <span className="material-symbols-rounded text-xl">terminal</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface-variant font-mono uppercase tracking-tighter">
                      {member.handle}
                    </span>
                  </div>
                  
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-all hover:shadow-md hover:bg-primary/95 active:scale-95"
                    aria-label={`View ${member.name} on GitHub`}
                  >
                    <span className="material-symbols-rounded">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
