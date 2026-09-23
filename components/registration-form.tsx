"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function RegistrationForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [division, setDivision] = useState("UNDER_13");
  const isYouth = useMemo(() => division !== "OPEN", [division]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We could not send your registration.");
      setStatus("success");
      form.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-card success-card" role="status">
        <div className="success-icon"><Check size={38} /></div>
        <p className="eyebrow">Registration received</p>
        <h3>You&apos;re on the list.</h3>
        <p>We will contact you with the next event details, eligibility confirmation and payment instructions. Your place is secured only after confirmation and payment.</p>
        <button className="button primary" onClick={() => setStatus("idle")}>Register another player</button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-heading"><span>PLAYER REGISTRATION</span><small>* Required fields</small></div>
      <div className="field-grid">
        <label>First name *<input name="firstName" autoComplete="given-name" required maxLength={80} /></label>
        <label>Last name *<input name="lastName" autoComplete="family-name" required maxLength={80} /></label>
        <label>Date of birth *<input name="dateOfBirth" type="date" required /></label>
        <label>Division *
          <select name="division" value={division} onChange={(event) => setDivision(event.target.value)} required>
            <option value="UNDER_13">Under 13</option>
            <option value="UNDER_16">Under 16</option>
            <option value="OPEN">Open</option>
          </select>
        </label>
        <label>Email address *<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
        <label>Phone / WhatsApp *<input name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
        <label className="full">Community / parish *<input name="community" autoComplete="address-level1" required maxLength={120} placeholder="e.g. May Pen, Clarendon" /></label>
        <label className="full">Club, school or academy <input name="club" maxLength={160} placeholder="Optional" /></label>
      </div>

      {isYouth && (
        <fieldset>
          <legend>Parent / guardian</legend>
          <div className="field-grid">
            <label>Full name *<input name="guardianName" autoComplete="name" required maxLength={160} /></label>
            <label>Phone / WhatsApp *<input name="guardianPhone" type="tel" autoComplete="tel" required maxLength={30} /></label>
            <label className="full">Email address *<input name="guardianEmail" type="email" autoComplete="email" required maxLength={160} /></label>
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend>Safety contact</legend>
        <div className="field-grid">
          <label>Emergency contact name *<input name="emergencyName" required maxLength={160} /></label>
          <label>Emergency contact phone *<input name="emergencyPhone" type="tel" required maxLength={30} /></label>
          <label className="full">Medical or access information <textarea name="medicalInfo" rows={3} maxLength={1000} placeholder="Share only what organisers need to keep the player safe. Optional." /></label>
        </div>
      </fieldset>

      <input className="honey" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="check"><input name="rulesAccepted" type="checkbox" value="true" required /><span>I agree to follow the competition rules and code of conduct when they are issued. *</span></label>
      <label className="check"><input name="privacyAccepted" type="checkbox" value="true" required /><span>I consent to V1 Streets using these details to review this registration, contact me and safely organise the event. *</span></label>
      <label className="check"><input name="mediaConsent" type="checkbox" value="true" /><span>I would like to receive future V1 Streets event announcements.</span></label>

      {status === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="button primary submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? <><LoaderCircle className="spin" size={20} /> Sending registration</> : "Submit registration"}
      </button>
      <p className="fine-print">Submitting this form does not require payment and does not guarantee a place. We will contact you before any payment is due.</p>
    </form>
  );
}
