"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

interface ContactFormProps {
  service: string;
  servicePath: string;
  darkMode?: boolean;
  brandStyle?: boolean;
  projectFields?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export function ContactForm({
  service,
  servicePath,
  darkMode = false,
  brandStyle = false,
  projectFields = false,
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [project, setProject] = useState({
    location: "",
    dimensions: "",
    surface: "",
  });

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: projectFields
            ? [
                project.location && `Project location: ${project.location}`,
                project.dimensions &&
                  `Road dimensions / area: ${project.dimensions}`,
                project.surface && `Existing surface: ${project.surface}`,
                formData.message,
              ]
                .filter(Boolean)
                .join("\n\n")
            : formData.message,
          service,
          service_path: servicePath,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "The inquiry could not be submitted.");
      }

      setFormData(emptyForm);
      setProject({ location: "", dimensions: "", surface: "" });
      setStatus("success");
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The inquiry could not be submitted.",
      );
      setStatus("error");
    }
  };

  const text = darkMode ? "text-concrete" : "text-industrial";
  const muted = darkMode ? "text-concrete/55" : "text-industrial/55";
  const border = darkMode ? "border-white/20" : "border-black/20";
  const input =
    (darkMode
      ? "border-white/20 bg-white/5 text-concrete placeholder:text-concrete/30 focus:border-safety-amber"
      : "border-black/20 bg-white text-industrial placeholder:text-industrial/30 focus:border-safety-amber") +
    (brandStyle ? " focus:!border-crown-red" : "");

  if (status === "success") {
    return (
      <div className={`border ${border} p-8 md:p-10`} role="status">
        <Check className="h-7 w-7 text-emerald-500" />
        <h3 className={`mt-5 font-heading text-2xl font-bold ${text}`}>
          Inquiry received.
        </h3>
        <p className={`mt-3 font-sans leading-7 ${muted}`}>
          Thank you for asking about {service}. Crownwood will review the
          project information and follow up.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-7 border-b border-current pb-1 font-heading text-sm font-bold ${text}`}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`border ${border} p-6 md:p-9`}>
      <div className={`border-b ${border} pb-5`}>
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${muted}`}
        >
          Inquiry topic
        </p>
        <p className={`mt-2 font-heading text-lg font-bold ${text}`}>
          {service}
        </p>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <Field label="Full name" required darkMode={darkMode}>
          <input
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={updateField}
            placeholder="Your name"
            className={`w-full border px-4 py-3 font-sans outline-none ${input}`}
          />
        </Field>
        <Field label="Email" required darkMode={darkMode}>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={updateField}
            placeholder="you@company.com"
            className={`w-full border px-4 py-3 font-sans outline-none ${input}`}
          />
        </Field>
        <Field label="Phone" darkMode={darkMode}>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={updateField}
            placeholder="(210) 555-0123"
            className={`w-full border px-4 py-3 font-sans outline-none ${input}`}
          />
        </Field>
        <Field label="Company or organization" darkMode={darkMode}>
          <input
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={updateField}
            placeholder="Company name"
            className={`w-full border px-4 py-3 font-sans outline-none ${input}`}
          />
        </Field>
      </div>

      <div className="mt-5">
        {projectFields && (
          <div className="mb-5 grid gap-5">
            <Field label="Project location" darkMode={darkMode}>
              <input
                name="project-location"
                value={project.location}
                onChange={(event) =>
                  setProject({ ...project, location: event.target.value })
                }
                placeholder="City, county, or ZIP code"
                className={`w-full border px-4 py-3 font-sans outline-none ${input}`}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Road size or area" darkMode={darkMode}>
                <input
                  name="project-dimensions"
                  value={project.dimensions}
                  onChange={(event) =>
                    setProject({ ...project, dimensions: event.target.value })
                  }
                  placeholder="e.g. 1,000 ft × 20 ft"
                  className={`w-full border px-4 py-3 font-sans outline-none ${input}`}
                />
              </Field>
              <Field label="Existing surface" darkMode={darkMode}>
                <select
                  name="project-surface"
                  value={project.surface}
                  onChange={(event) =>
                    setProject({ ...project, surface: event.target.value })
                  }
                  className={`w-full border px-4 py-3 font-sans outline-none ${input}`}
                >
                  <option value="" className="bg-asphalt text-white">
                    Select surface
                  </option>
                  <option className="bg-asphalt text-white">Caliche</option>
                  <option className="bg-asphalt text-white">
                    Dirt / native soil
                  </option>
                  <option className="bg-asphalt text-white">
                    Gravel / aggregate
                  </option>
                  <option className="bg-asphalt text-white">
                    Other / not sure
                  </option>
                </select>
              </Field>
            </div>
          </div>
        )}
        <Field label="Project details" required darkMode={darkMode}>
          <textarea
            name="message"
            required
            rows={projectFields ? 4 : 5}
            value={formData.message}
            onChange={updateField}
            placeholder={
              projectFields
                ? "How is the road used? Tell us about traffic, current problems, and your timeline."
                : `Location, area or quantity, site condition, schedule, and questions about ${service}.`
            }
            className={`w-full resize-y border px-4 py-3 font-sans outline-none ${input}`}
          />
        </Field>
      </div>

      {status === "error" && (
        <p
          className="mt-5 border-l-4 border-red-500 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-500"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`mt-6 inline-flex w-full items-center justify-center gap-3 px-7 py-4 font-heading text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60 ${brandStyle ? "bg-crown-red text-white hover:bg-[#bd0024]" : "bg-safety-amber text-asphalt hover:bg-white"}`}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending inquiry
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />{" "}
            {projectFields ? "Request my project quote" : "Request information"}
          </>
        )}
      </button>
      <p className={`mt-4 font-sans text-xs leading-5 ${muted}`}>
        Include photos or plans when Crownwood follows up if they will help
        explain the condition.
      </p>
    </form>
  );
}

function Field({
  label,
  required = false,
  darkMode,
  children,
}: {
  label: string;
  required?: boolean;
  darkMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className={`mb-2 block font-heading text-sm font-bold ${darkMode ? "text-concrete/75" : "text-industrial/75"}`}
      >
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
