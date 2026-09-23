import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { z } from "zod";

const registrationSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  dateOfBirth: z.string().date(),
  division: z.enum(["UNDER_13", "UNDER_16", "OPEN"]),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(30),
  community: z.string().trim().min(2).max(120),
  club: z.string().trim().max(160).optional().default(""),
  guardianName: z.string().trim().max(160).optional().default(""),
  guardianPhone: z.string().trim().max(30).optional().default(""),
  guardianEmail: z.union([z.string().trim().email().max(160), z.literal("")]).optional().default(""),
  emergencyName: z.string().trim().min(1).max(160),
  emergencyPhone: z.string().trim().min(7).max(30),
  medicalInfo: z.string().trim().max(1000).optional().default(""),
  rulesAccepted: z.literal("true"),
  privacyAccepted: z.literal("true"),
  mediaConsent: z.string().optional(),
  website: z.string().max(0).optional().default(""),
}).superRefine((data, ctx) => {
  if (data.division !== "OPEN") {
    if (!data.guardianName) ctx.addIssue({ code: "custom", path: ["guardianName"], message: "Guardian name is required." });
    if (data.guardianPhone.length < 7) ctx.addIssue({ code: "custom", path: ["guardianPhone"], message: "Guardian phone is required." });
    if (!data.guardianEmail) ctx.addIssue({ code: "custom", path: ["guardianEmail"], message: "Guardian email is required." });
  }
});

export async function POST(request: Request) {
  try {
    const data = registrationSchema.parse(await request.json());
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not configured");
      return NextResponse.json({ message: "Registration is not available yet. Please try again later." }, { status: 503 });
    }

    const sql = neon(process.env.DATABASE_URL);
    const [registration] = await sql`
      INSERT INTO registrations (
        first_name, last_name, date_of_birth, division, email, phone, community, club,
        guardian_name, guardian_phone, guardian_email, emergency_name, emergency_phone,
        medical_info, rules_accepted, privacy_accepted, marketing_consent
      ) VALUES (
        ${data.firstName}, ${data.lastName}, ${data.dateOfBirth}, ${data.division},
        ${data.email.toLowerCase()}, ${data.phone}, ${data.community}, ${data.club || null},
        ${data.guardianName || null}, ${data.guardianPhone || null}, ${data.guardianEmail?.toLowerCase() || null},
        ${data.emergencyName}, ${data.emergencyPhone}, ${data.medicalInfo || null}, true, true,
        ${data.mediaConsent === "true"}
      )
      RETURNING id
    `;

    return NextResponse.json({ ok: true, registrationId: registration.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Please check the form and complete every required field." }, { status: 400 });
    }
    console.error("Registration failed", error);
    return NextResponse.json({ message: "We could not save your registration. Please try again." }, { status: 500 });
  }
}
