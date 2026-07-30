import { ArticleCard } from "@/components/insights/ArticleCard";

const articles = [
  {
    category: "CONVERSATIONAL AI",
    readTime: "5 min read",
    title: "Why WhatsApp is the Ultimate Insurance Distribution Engine",
    excerpt:
      "Explore how chat ecosystems remove friction from policy sales and increase regional customer lifetime value.",
    thumbnail: "/insights/whatsapp-distribution.png",
    thumbnailAlt: "An abstract circuit-board arrow motif in red on a dark background",
  },
  {
    category: "DIGITAL TRANSFORMATION",
    readTime: "8 min read",
    title: "Ditching the Queues: Modernizing the Claims Pipeline",
    excerpt:
      "How automated visual verification and programmatic rules reduce claims processing time from days to seconds.",
    thumbnail: "/insights/claims-pipeline.png",
    thumbnailAlt: "A bright open-plan office with workstations around a round meeting table",
  },
  {
    category: "ENTERPRISE TECH",
    readTime: "6 min read",
    title: "Designing Secure Chat Pipelines for Insurers",
    excerpt:
      "A deep dive into end-to-end data encryption, compliance and legacy system integration for technical leaders.",
    thumbnail: "/insights/secure-chat-pipelines.png",
    thumbnailAlt: "A glowing padlock inside a shield over a network of data pathways",
  },
];

export function InsightsSection() {
  return (
    <section
      id="blog"
      className="flex scroll-mt-20 flex-col gap-6 px-4 py-6 lg:gap-[50px] lg:px-28 lg:py-[50px]"
    >
      <div className="mx-auto flex w-full flex-col gap-[10px] text-center lg:w-[800px]">
        <h2 className="font-display text-h2 font-medium text-brand-black">
          Insights &amp; Resources
        </h2>
        <p className="text-body-lg text-neutral-500">
          Stay informed with the latest thinking on insurance innovation, AI, customer
          engagement, and digital transformation.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-4 lg:auto-rows-fr lg:grid-cols-3 lg:gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.title} {...article} />
        ))}
      </div>
    </section>
  );
}
