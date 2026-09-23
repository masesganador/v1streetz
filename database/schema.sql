CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  division text NOT NULL CHECK (division IN ('UNDER_13', 'UNDER_16', 'OPEN')),
  email text NOT NULL,
  phone text NOT NULL,
  community text NOT NULL,
  club text,
  guardian_name text,
  guardian_phone text,
  guardian_email text,
  emergency_name text NOT NULL,
  emergency_phone text NOT NULL,
  medical_info text,
  rules_accepted boolean NOT NULL DEFAULT false,
  privacy_accepted boolean NOT NULL DEFAULT false,
  marketing_consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'WAITLISTED', 'WITHDRAWN')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS registrations_created_at_idx ON registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS registrations_division_status_idx ON registrations (division, status);
