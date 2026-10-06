export type CategoryType = 'reactor' | 'transfer' | 'phenomena' | 'control';

export interface SimulatorAttachment {
  id: string;
  name: string;
  type: 'file' | 'link' | 'image' | 'pdf' | 'doc';
  url?: string;
  fileData?: string; // Base64 data URL for uploaded files
  fileSize?: string;
  addedAt: string;
  notes?: string;
}

export interface SimulatorItem {
  id: string;
  category: CategoryType;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  url: string;
  iconName: string;
  badge?: string;
  tags: string[];
  equation?: string;
  equationDescription_ar?: string;
  equationDescription_en?: string;
  keyParameters?: {
    name_ar: string;
    name_en: string;
    unit?: string;
    typicalRange?: string;
  }[];
  attachments?: SimulatorAttachment[];
}

export interface CategoryMeta {
  id: CategoryType;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  iconName: string;
  colorClass: string;
  gradient: string;
}
