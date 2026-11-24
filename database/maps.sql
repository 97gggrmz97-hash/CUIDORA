BEGIN;
CREATE SCHEMA IF NOT EXISTS regional;
CREATE TABLE IF NOT EXISTS regional.professionals (
 id uuid PRIMARY KEY,
 municipality_code integer NOT NULL CHECK (municipality_code BETWEEN 3200000 AND 3299999),
 municipality_name text NOT NULL,
 specialty text NOT NULL,
 active boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS regional.administrators (
 identity_subject text PRIMARY KEY,
 enabled boolean NOT NULL DEFAULT false
);
REVOKE ALL ON SCHEMA regional FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA regional FROM PUBLIC;
CREATE INDEX IF NOT EXISTS regional_professional_lookup ON regional.professionals (municipality_code,specialty) WHERE active;
COMMIT;
