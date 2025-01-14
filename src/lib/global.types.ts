import { Database } from "@/lib/database.types";

export type Status = Database["public"]["Tables"]["status"]["Row"];
export type CompanyType = Database["public"]["Tables"]["company_types"]["Row"];
export type Company = Database["public"]["Tables"]["companies"]["Row"];
export type DocumentType =
  Database["public"]["Tables"]["document_types"]["Row"];
export type Country = Database["public"]["Tables"]["countries"]["Row"];
export type City = Database["public"]["Tables"]["cities"]["Row"];
export type WorkType = Database["public"]["Tables"]["work_types"]["Row"];
export type ExperienceLevel =
  Database["public"]["Tables"]["experience_levels"]["Row"];

export type Application = Database["public"]["Tables"]["applications"]["Row"];
export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type DocumentApplication =
  Database["public"]["Tables"]["document_applications"]["Row"];
export type Todo = Database["public"]["Tables"]["todos"]["Row"];
