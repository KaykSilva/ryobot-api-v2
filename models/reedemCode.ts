// models/reedemCode.ts
export interface IRedeemCode {
  code: string;
  value: number;
  used: boolean;
  usedBy?: string;
  createdAt: Date;
  usedAt?: Date;
  expiresAt?: Date | null;
}