import type {
  AttorneyChoice,
  CoverageType,
  FamilyCoverage,
  PaymentStyle,
} from "@prisma/client";

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMaybeMoney(amount?: number | null): string {
  if (amount == null) return "Not disclosed";
  return formatMoney(amount);
}

export function formatPaymentStyle(v: PaymentStyle): string {
  switch (v) {
    case "upfront":
      return "Up-front";
    case "reimbursement":
      return "Reimbursement";
    case "mixed":
      return "Mixed";
    default:
      return "Not disclosed";
  }
}

export function formatAttorneyChoice(v: AttorneyChoice): string {
  switch (v) {
    case "yes":
      return "Yes";
    case "limited":
      return "Limited";
    case "no":
      return "No";
    default:
      return "Not disclosed";
  }
}

export function formatCoverageType(v: CoverageType): string {
  switch (v) {
    case "criminal":
      return "Criminal";
    case "civil":
      return "Civil";
    case "both":
      return "Both";
    default:
      return "Not disclosed";
  }
}

export function formatFamilyCoverage(v: FamilyCoverage): string {
  switch (v) {
    case "yes":
      return "Yes";
    case "limited":
      return "Limited";
    case "no":
      return "No";
    default:
      return "Not disclosed";
  }
}

export function formatWaitingPeriod(days?: number | null): string {
  if (days == null) return "Not disclosed";
  if (days <= 0) return "None";
  if (days < 30) return `${days} days`;
  const months = Math.round((days / 30) * 10) / 10;
  return `${months} mo`;
}

