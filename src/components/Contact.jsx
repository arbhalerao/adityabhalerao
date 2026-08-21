import { useEffect, useRef, useState } from "react";
import { PROFILES } from "../seo/siteMeta";
import Section from "./Section";

/* A failure that vanishes reads as a success, so errors get twice as long on screen. */
const SUCCESS_MS = 4000;
const ERROR_MS = 8000;

/* Underline-only: a boxed input would be the only enclosed shape on a page of hairlines and text. */
const FIELD =
  "depth-2 w-full border-0 border-b border-rule bg-transparent py-1.5 text-ink transition-colors focus:border-brand focus:outline-none";

/** Height is cleared first so the box can shrink again, not only grow. */
const autoGrow = (el) => {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};

const Field = ({ name, label, type = "text", textarea }) => (
  <div>
    <label htmlFor={name} className="meta mb-1 block">
      {label}
    </label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        rows="1"
        required
        onInput={(event) => autoGrow(event.currentTarget)}
        className={`${FIELD} resize-none overflow-hidden`}
      />
    ) : (
      <input id={name} name={name} type={type} required className={FIELD} />
    )}
  </div>
);

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Held in a ref so a second submit cancels the first timer instead of letting
  // it fire late and wipe the newer message off the screen early.
  const clearTimer = useRef();

  const showMessage = (msg, ms = ERROR_MS) => {
    clearTimeout(clearTimer.current);
    setMessage(msg);
    clearTimer.current = setTimeout(() => setMessage(""), ms);
  };

  useEffect(() => () => clearTimeout(clearTimer.current), []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(form.current);
    const data = {
      sender_name: formData.get("sender_name").trim(),
      sender_email: formData.get("sender_email").trim(),
      subject: formData.get("subject").trim(),
      message: formData.get("message").trim(),
    };

    if (!data.sender_name || !data.sender_email || !data.subject || !data.message) {
      showMessage("please fill in all the fields");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.sender_email)) {
      showMessage("please enter a valid email address");
      setLoading(false);
      return;
    }

    if (data.message.length > 1000) {
      showMessage("please keep it to 1000 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showMessage("thanks for writing, i'll get back to you soon", SUCCESS_MS);
        form.current.reset();
        // reset() clears values but not the inline height auto-grow set.
        const box = form.current.querySelector("textarea");
        if (box) box.style.height = "";
      } else {
        throw new Error();
      }
    } catch {
      showMessage("something went wrong, please try again in a moment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" title="Contact" intro="The form goes straight to my inbox">
      <form ref={form} onSubmit={sendEmail} className="max-w-[48rem] space-y-6" noValidate>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="sender_name" label="name" />
          <Field name="sender_email" label="email" type="email" />
        </div>

        <Field name="subject" label="subject" />
        <Field name="message" label="message" textarea />

        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="depth-2 border-b border-ink pb-0.5 transition-colors hover:border-brand hover:text-brand disabled:opacity-40"
          >
            {loading ? "sending…" : "send"}
          </button>
          <p aria-live="polite" className="meta">
            {message}
          </p>
        </div>
      </form>

      <div className="mt-12">
        <p className="meta mb-1">elsewhere</p>
        <p className="depth-2 flex flex-wrap gap-x-5 gap-y-1">
          <a href={PROFILES.github} target="_blank" rel="noopener noreferrer" className="link">
            github
          </a>
          <a href={PROFILES.linkedin} target="_blank" rel="noopener noreferrer" className="link">
            linkedin
          </a>
          <a href={PROFILES.medium} target="_blank" rel="noopener noreferrer" className="link">
            medium
          </a>
        </p>
      </div>
    </Section>
  );
}
