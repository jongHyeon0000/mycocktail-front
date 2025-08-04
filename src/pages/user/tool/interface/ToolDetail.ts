export interface ToolDetail {
  toolId: number;
  toolName: string;
  toolNameKr: string;
  toolCategory: string;

  image?: string;

  notes?: string;
  profileNotes?: string;
  whenToUseNotes?: string;
  alternativeTools?: string;

  // 등록 / 업데이트 일
  createAt: string;
  updatedAt: string;
}