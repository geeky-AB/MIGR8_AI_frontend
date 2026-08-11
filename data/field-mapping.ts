export type SchemaUploadCard = {
  id: "source" | "target";
  title: string;
  description: string;
  buttonLabel: string;
  supportedFormats: string;
  icon: "uploadFile" | "schema";
};

export const FIELD_MAPPING_TOPBAR_TITLE =
  "AI Mapping: Upload Source & Target Schemas";

export const SCHEMA_UPLOAD_CARDS: SchemaUploadCard[] = [
  {
    id: "source",
    title: "Source Field List",
    description: "Upload your source schema (CSV, XLSX) to begin mapping.",
    buttonLabel: "Select Source File",
    supportedFormats: "Supported: .csv, .xlsx",
    icon: "uploadFile",
  },
  {
    id: "target",
    title: "Target SAP Metadata",
    description: "Upload the SAP target metadata.",
    buttonLabel: "Upload Metadata",
    supportedFormats: "Supported: .csv, .xlsx",
    icon: "schema",
  },
];
