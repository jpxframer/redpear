"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";

/**
 * Figma builds these fields from an external library ("Simple Design System")
 * that has no counterpart in this repo, so the Code Connect snippets it returns
 * are unusable here. The geometry below is pulled from the instances themselves:
 * label 16/24 medium, 8px to the control, control at 16/12 padding on an 8px
 * radius with the Gloss effect.
 *
 * That effect is `gloss-bento` — a real box-shadow rather than a filter — on the
 * text inputs and the textarea. The Select is the odd one out in Figma, carrying
 * the filter-based `gloss-white` instead; all of them are unified on `gloss-bento`
 * here so the row does not have one field with visibly different corners.
 */
const control =
  "gloss-bento w-full rounded-lg bg-brand-white px-4 py-3 text-body-md text-brand-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

// Figma authors a single selected value, "Digital Transformation", and no option
// list at all — so these six are ours, taken verbatim from the six service cards
// on /services. They need confirming against what RedPear actually sells before
// launch, the same open question the FAQ copy carries.
const services = [
  "AI Solutions",
  "Insurance Platforms",
  "WhatsApp Solutions",
  "Digital Transformation",
  "Analytics & Insights",
  "Consulting & Integration",
];

/**
 * Not in Figma — added on the user's instruction so visitors can pick their
 * dialling code rather than having to type it.
 *
 * Ghana leads because that is where RedPear is, and it is the default. The rest
 * are the African markets the site says it serves (the Audiences section and the
 * FAQ), followed by the places enquiries are most likely to come from otherwise.
 * The dial code is written *first* in each option so the open list reads as a
 * column of codes with the country as the qualifier — the closed control shows
 * the code on its own. No code appears twice, which keeps each option's value
 * unambiguous.
 */
const dialCodes = [
  { code: "+233", country: "Ghana" },
  { code: "+234", country: "Nigeria" },
  { code: "+254", country: "Kenya" },
  { code: "+27", country: "South Africa" },
  { code: "+255", country: "Tanzania" },
  { code: "+256", country: "Uganda" },
  { code: "+250", country: "Rwanda" },
  { code: "+251", country: "Ethiopia" },
  { code: "+260", country: "Zambia" },
  { code: "+263", country: "Zimbabwe" },
  { code: "+267", country: "Botswana" },
  { code: "+264", country: "Namibia" },
  { code: "+265", country: "Malawi" },
  { code: "+258", country: "Mozambique" },
  { code: "+225", country: "Côte d'Ivoire" },
  { code: "+221", country: "Senegal" },
  { code: "+237", country: "Cameroon" },
  { code: "+228", country: "Togo" },
  { code: "+229", country: "Benin" },
  { code: "+226", country: "Burkina Faso" },
  { code: "+223", country: "Mali" },
  { code: "+232", country: "Sierra Leone" },
  { code: "+231", country: "Liberia" },
  { code: "+220", country: "Gambia" },
  { code: "+243", country: "DR Congo" },
  { code: "+244", country: "Angola" },
  { code: "+20", country: "Egypt" },
  { code: "+212", country: "Morocco" },
  { code: "+216", country: "Tunisia" },
  { code: "+213", country: "Algeria" },
  { code: "+44", country: "United Kingdom" },
  { code: "+1", country: "United States" },
  { code: "+353", country: "Ireland" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+31", country: "Netherlands" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
];

function Field({ htmlFor, label, children }: {
  htmlFor: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label htmlFor={htmlFor} className="text-body-md font-medium text-brand-black">
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Partial-frame export: the chevron's own viewBox is 9.6x5.6, not 16x16, so it is
 * centred in a 16px slot rather than stretched. `pr-9` on the select clears it —
 * 12px padding + 16px slot + 8px gap.
 */
function SelectChevron() {
  return (
    <span className="pointer-events-none absolute top-1/2 right-3 flex size-4 -translate-y-1/2 items-center justify-center">
      <Image
        src="/contact/chevron-down.svg"
        alt=""
        width={10}
        height={6}
        className="h-[5.6px] w-[9.6px]"
      />
    </span>
  );
}

export function ContactForm() {
  const [dialCode, setDialCode] = useState("+233");

  return (
    <form
      // NOT WIRED UP — exactly like the footer's NewsletterForm, and for the same
      // reason: there is no destination yet. preventDefault stops the browser
      // GET-ing the current page and making it look like the message was sent.
      // A contact form that silently swallows enquiries is worse than no form, so
      // this needs a real action before the page goes live.
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-h4 font-medium text-brand-black">Book a Demo</h2>
        <p className="text-body-md text-neutral-500">
          Complete the form below and one of our specialists will reach out to schedule a
          personalized product demonstration.
        </p>
      </div>

      {/* Figma fills every field with example content ("Kwame Asante", a written
          message). Those are prompts telling the visitor what to type, not values,
          so they are placeholders — and worded as instructions on the user's
          instruction rather than as fake sample data. */}
      <div className="flex flex-col gap-5">
        {/* 32px between the two fields at both breakpoints; only the axis changes. */}
        <div className="flex flex-col gap-8 lg:flex-row">
          <Field htmlFor="contact-name" label="Full Name">
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Enter your full name"
              className={control}
            />
          </Field>
          <Field htmlFor="contact-email" label="Email">
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address"
              className={control}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <Field htmlFor="contact-phone" label="Phone Number">
            {/* The dialling code is its own control rather than something to type.

                Closed it shows the code alone ("+233"); open, the list still names
                the country ("+233 Ghana"). A native select paints the selected
                option's *whole* text when closed and offers no way to shorten it,
                so the real select is laid over the box at opacity-0 — still the
                focusable control, still what opens the popup, still what submits —
                and the box underneath draws what we want. The options themselves
                are untouched, which is why the popup reads in full.

                The width lives on the wrapper, not the select: `control` already
                sets w-full, and Tailwind resolves two width utilities by property
                order rather than by the order they are written. */}
            <div className="flex gap-2">
              <div className="relative w-[100px] shrink-0">
                <select
                  name="countryCode"
                  aria-label="Country dialling code"
                  value={dialCode}
                  onChange={(event) => setDialCode(event.target.value)}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                >
                  {dialCodes.map(({ code, country }) => (
                    <option key={country} value={code}>
                      {code} {country}
                    </option>
                  ))}
                </select>
                {/* Presentational: the select above is the accessible control, so
                    this must not be announced twice. The focus ring has to be
                    borrowed from it, since this box is never itself focused. */}
                <div
                  aria-hidden
                  className={`${control} pr-9 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-red`}
                >
                  {dialCode}
                </div>
                <SelectChevron />
              </div>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                // Short because the dial code sits in its own control beside it,
                // and the remaining 193px clips anything longer.
                placeholder="Enter your number"
                className={`${control} min-w-0 flex-1`}
              />
            </div>
          </Field>
          <Field htmlFor="contact-service" label="Services">
            {/* appearance-none drops the platform arrow so Figma's own chevron can
                sit in its place. :invalid greys the prompt until a real choice is
                made, the way a placeholder would. */}
            <div className="relative">
              <select
                id="contact-service"
                name="service"
                required
                defaultValue=""
                className={`${control} appearance-none pr-9 [&:invalid]:text-neutral-400`}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </Field>
        </div>

        <Field htmlFor="contact-message" label="Message">
          {/* Figma draws a resize grip in the bottom-right corner, so the control
              is meant to be user-resizable. resize-y is the native equivalent.

              120 on mobile and 80 on desktop is what the two frames actually
              render, not what the component declares — its min-height is 80 in
              both, and the mobile box grows because the example message wraps to
              four lines at 306px wide. Matching the drawn height rather than the
              declared minimum, since a two-line message box on a phone is mean. */}
          <textarea
            id="contact-message"
            name="message"
            required
            rows={2}
            placeholder="Tell us what you're looking to build or improve"
            className={`${control} min-h-30 resize-y lg:min-h-20`}
          />
        </Field>
      </div>

      <button type="submit" className={buttonClasses("primary", "self-start")}>
        Send a Message
      </button>
    </form>
  );
}
