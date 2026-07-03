// Keyword Optimizer

export interface KeywordOptimizerRequest {
  appName: string;
  description: string;
  title?: string;
  subtitle?: string;
}

export interface KeywordOptimizerResponse {
  keywordString: string;
  charCount: number;
  excludedDuplicates: string[];
}

// Title/Subtitle Generator

export interface TitleSubtitleRequest {
  appName: string;
  description: string;
  priorityKeywords?: string;
}

export interface TitleSubtitleOption {
  title: string;
  subtitle: string;
}

export interface TitleSubtitleResponse {
  options: TitleSubtitleOption[];
}

// Metadata Critique

export interface MetadataCritiqueRequest {
  title: string;
  subtitle: string;
  keywordField: string;
  description: string;
}

export type CritiqueCategory =
  | "stuffing"
  | "duplicate"
  | "low_intent"
  | "opportunity";

export interface CritiqueFinding {
  category: CritiqueCategory;
  field: string;
  detail: string;
}

export interface MetadataCritiqueResponse {
  findings: CritiqueFinding[];
}

// Shared API error shape

export interface ApiErrorResponse {
  error: string;
}
