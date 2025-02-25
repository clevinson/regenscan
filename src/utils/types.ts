// src/utils/types.ts
export interface Reference {
  refType: "project" | "creditClass" | "creditBatch";
  id: string;
}

export interface Project {
  id: string;
  admin: string;
  class_id: string;
  jurisdiction: string;
  metadata: string;
  reference_id: string;
}

export interface CreditClass {
  id: string;
  admin: string;
  metadata: string;
  credit_type_abbrev: string;
  issuers: string[];
}

export interface CreditBatch {
  denom: string;
  issuer: string;
  project_id: string;
  start_date: string;
  end_date: string;
  issuance_date: string;
  open: true;
  metadata: string;
}
