"use client";

export function NewsletterForm() {
  return (
    <form
      // NOT WIRED UP. There is no destination for this yet — the choice between
      // Mailchimp, Resend, or a route handler writing to a database is still open.
      // preventDefault stops the browser GET-ing the current page and appearing to
      // "work". Replace with a real action/handler before launch.
      onSubmit={(event) => event.preventDefault()}
      className="flex w-full items-end gap-2.5 rounded-2xl border border-neutral-200 bg-brand-white p-4"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <label
          htmlFor="newsletter-email"
          className="text-[14px] leading-5 font-medium text-neutral-500"
        >
          Subscribe to our Newsletter
        </label>
        {/* leading-[1.2] gives the 16.8px text box Figma uses for the input. The
            label above is 14/20, but the input itself sits on normal leading. */}
        <div className="flex w-full items-center justify-center rounded-lg bg-[rgba(187,187,187,0.15)] p-3">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            className="min-w-0 flex-1 bg-transparent text-[14px] leading-[1.2] text-brand-black outline-none placeholder:text-[#999]"
          />
        </div>
      </div>

      {/* This button carries its own gloss: a red-tinted drop shadow and a
          brighter top inset than the shared gloss-red. One-off, so inlined. */}
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-brand-red px-4 py-2 text-[16px] leading-6 font-medium text-[#f9f9fb] drop-shadow-[0_4px_7.5px_rgba(244,11,13,0.15)] shadow-[inset_0_4px_4px_0_rgba(255,255,255,0.35),inset_0_-4px_4px_0_rgba(0,0,0,0.25),inset_0_2px_2px_0_#f40b0d] transition-transform duration-150 active:translate-y-px"
      >
        Subscribe
      </button>
    </form>
  );
}
