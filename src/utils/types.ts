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
