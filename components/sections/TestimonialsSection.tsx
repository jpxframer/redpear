import { TestimonialCard } from "@/components/testimonials/TestimonialCard";

// Quote punctuation is reproduced exactly as Figma has it: cards 1 and 2 use
// straight quotes, cards 3 and 4 curly ones.
const testimonials = [
  {
    quote:
      '"Our claims cycle dropped from 8 days to under 2 minutes for standard automotive claims. Customers just snap a photo, upload it, and get paid instantly via Mobile Money."',
    name: "Kofi Antwi",
    role: "VP of Claims · Star Alliance Assurance",
    avatar: "/testimonials/kofi-antwi.png",
  },
  {
    quote:
      '"Integration with our legacy core system was seamless. The API handles high volume securely and complies beautifully with local regional compliance standards."',
    name: "Zola Ndlovu",
    role: "Chief Technology Officer · Vanguard Protection",
    avatar: "/testimonials/zola-ndlovu.png",
  },
  {
    quote:
      "“RedPear transformed how we process claims. What used to take weeks now happens in real-time, and our customers have never been more satisfied with the experience.”",
    name: "Amara Okafor",
    role: "Head of Digital Innovation · Meridian Insurance",
    avatar: "/testimonials/amara-okafor.png",
    // The only card Figma draws at a 20px radius rather than 24.
    radiusClass: "rounded-[20px]",
  },
  {
    quote:
      "“The AI-powered routing has cut our response times by 60%. Our agents now focus on complex cases while routine queries are handled automatically with impressive accuracy.”",
    name: "Kwame Mensah",
    role: "VP of Operations · Atlas Financial Group",
    avatar: "/testimonials/kwame-mensah.png",
  },
];

export function TestimonialsSection() {
  return (
    <section className="flex scroll-mt-20 flex-col gap-6 px-4 py-6 lg:gap-[50px] lg:px-28 lg:py-[50px]">
      {/* Unlike sections 1, 2, 4 and 5, this section keeps the desktop type scale
          on mobile — 36/44 heading and 18/28 body at both breakpoints. */}
      <div className="mx-auto flex w-full flex-col gap-[10px] text-center lg:w-[800px]">
        <h2 className="font-display text-h2 font-medium text-brand-black">
          Helping Organizations Modernize Insurance
        </h2>
        <p className="text-body-lg text-neutral-500">
          See how leaders are deploying chat-native experiences to redefine claims and
          distribution.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-6 lg:auto-rows-fr lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </section>
  );
}
