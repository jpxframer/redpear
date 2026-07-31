import Image from "next/image";
import { IconBadge } from "@/components/ui/IconBadge";

const team = [
  {
    name: "Alfred Ludwig Kissiedu",
    role: "Chief Strategist & Co-Founder",
    photo: "/team/alfred-kissiedu.png",
    bio: "Alfred founded RedPear Communications to modernize insurance across Africa through AI-powered technology. With a background in enterprise software and digital transformation, he focuses on helping insurers simplify operations, improve customer experiences, and scale with confidence.",
  },
  {
    name: "Lois Adusei",
    role: "Growth Architect & Co-Founder",
    photo: "/team/lois-adusei.png",
    bio: "Lois brings a sharp eye for market opportunity and sustainable growth to RedPear Communications. As Co-Founder, she drives strategic partnerships and go-to-market initiatives that connect insurers with underserved communities across Africa. Her passion lies in building business models where technology and social impact go hand in hand.",
  },
  {
    name: "Nimondo Zangui",
    role: "Chief Technology Officer",
    photo: "/team/nimondo-zangui.png",
    bio: "Nimondo leads RedPear's engineering vision, architecting the AI-powered platforms that sit at the heart of the company's insurance solutions. With deep expertise in cloud infrastructure and machine learning, he ensures that every product is built for reliability, security, and scale across diverse African markets.",
  },
  {
    name: "Robert Dieu Donne Tawiah",
    role: "Project Coordinator & QA Lead",
    photo: "/team/robert-tawiah.jpg",
    bio: "Robert keeps RedPear's projects running on time and to the highest standard. Combining meticulous project coordination with a rigorous approach to quality assurance, he bridges the gap between development and delivery, making sure every release meets the real-world needs of insurers and their customers.",
  },
  {
    name: "Rashad Muntar",
    role: "Lead Software Engineer",
    photo: "/team/rashad-muntar.jpg",
    bio: "Rashad turns product vision into production-ready code at RedPear Communications. Specializing in full-stack development and API design, he leads the engineering team in building intuitive, high-performance tools that help insurance providers across Africa work smarter and serve their policyholders better.",
  },
  {
    name: "Osmond Aboagye",
    role: "Product Designer",
    photo: "/team/osmond-aboagye.jpg",
    bio: "Osmond shapes the user experience at RedPear Communications, translating complex insurance workflows into clean, intuitive interfaces. With a keen understanding of both design systems and end-user needs, he ensures that every product feels approachable — whether it's being used by a seasoned underwriter or a first-time policyholder.",
  },
];

export function TeamSection() {
  return (
    <section className="px-4 py-4 lg:px-28 lg:py-[50px]">
      <div className="mx-auto flex max-w-content flex-col gap-6 lg:gap-[50px]">
        <div className="flex flex-col gap-4 text-center lg:mx-auto lg:w-[800px]">
          <h2 className="font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
            Our Team &amp; Leadership
          </h2>
          <p className="text-body-md text-neutral-500 lg:text-body-lg">
            Behind every solution is a multidisciplinary team of strategists, designers,
            engineers, and industry experts committed to helping organizations modernize
            with confidence. Include space in the design for leadership profiles and an
            optional founder or CEO video message.
          </p>
        </div>

        <div className="gloss-white rounded-2xl bg-brand-white p-4 lg:rounded-3xl lg:p-6">
          {/* Plain auto rows, deliberately not auto-rows-fr: Figma levels each row
              against its own tallest card (440 / 412 / 440), which is what default
              grid stretching already does. auto-rows-fr would level all three rows
              to 440 and add 56px the design does not have. */}
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {team.map((member) => (
              <article
                key={member.name}
                className="gloss-white flex flex-col gap-4 rounded-2xl bg-brand-white p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
                  {/* Full-width square on mobile, a fixed 188px block on desktop. */}
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl border border-neutral-300 lg:aspect-auto lg:size-[188px]">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 188px, calc(100vw - 96px)"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-4 lg:flex-1">
                    <div className="flex flex-col gap-2 border-b border-neutral-300 pb-6">
                      <h3 className="font-display text-h4-mobile font-medium text-brand-black lg:text-h4">
                        {member.name}
                      </h3>
                      <p className="text-body-lg text-neutral-500">{member.role}</p>
                    </div>
                    {/* Figma carries no profile URLs, so this is presentational for
                        now — see Known follow-ups. */}
                    <IconBadge src="/icons/linkedin.svg" variant="white" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-body-lg font-medium text-brand-black">Bio</p>
                  <p className="text-body-md text-neutral-500 lg:text-body-lg">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
