"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Faq = {
  question: string;
  answer: string;
};

// Figma authors an answer for the first question only. The other two are drawn
// collapsed with nothing behind them, so their copy is written here — it needs
// a factual check against what RedPear actually sells before launch.
const faqs: Faq[] = [
  {
    question: "Can your solutions integrate with our existing systems?",
    answer:
      "Yes. RedPear is designed to connect with the core insurance and payment systems you already run, so you're not starting from zero.",
  },
  {
    question: "Do you only work with insurance companies?",
    answer:
      "No. Insurers are our core focus, but we also work with banks, microfinance institutions, healthcare providers and government schemes.",
  },
  {
    question: "Can implementations be customized?",
    answer:
      "Yes. Conversation flows, dashboards and integrations are configured around how your team already works, not a fixed template.",
  },
];

const questionClass =
  "flex-1 text-left font-display text-h6 font-medium text-brand-black lg:text-h4";

export function FaqSection() {
  const baseId = useId();
  // Figma shows the first item open. Each toggles independently.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-6 lg:px-28 lg:py-[50px]">
      <div className="mx-auto flex max-w-content flex-col gap-6 lg:gap-[50px]">
        <h2 className="text-center font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          Frequently Asked Questions
        </h2>

        <ul className="flex flex-col gap-4 lg:gap-6">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <li
                key={faq.question}
                className="gloss-white rounded-2xl bg-brand-white p-4"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="flex w-full items-center gap-4"
                >
                  <span className={questionClass}>{faq.question}</span>
                  <Image
                    src={open ? "/icons/arrow-up-round.svg" : "/icons/arrow-down-sharp.svg"}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 shrink-0"
                  />
                </button>
                {open && (
                  <p id={panelId} className="mt-4 text-body-md text-neutral-500">
                    {faq.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
