export const BloodGroupCode = {
  A_POSITIVE: 1,
  A_NEGATIVE: 2,
  B_POSITIVE: 3,
  B_NEGATIVE: 4,
  AB_POSITIVE: 5,
  AB_NEGATIVE: 6,
  O_POSITIVE: 7,
  O_NEGATIVE: 8,
} as const;

export const BloodGroupOptions = [
  { label: "A+", value: BloodGroupCode.A_POSITIVE },
  { label: "A-", value: BloodGroupCode.A_NEGATIVE },
  { label: "B+", value: BloodGroupCode.B_POSITIVE },
  { label: "B-", value: BloodGroupCode.B_NEGATIVE },
  { label: "AB+", value: BloodGroupCode.AB_POSITIVE },
  { label: "AB-", value: BloodGroupCode.AB_NEGATIVE },
  { label: "O+", value: BloodGroupCode.O_POSITIVE },
  { label: "O-", value: BloodGroupCode.O_NEGATIVE },
] as const;

export type BloodGroupLabel = (typeof BloodGroupOptions)[number]["label"];

export type BloodGroupValue = (typeof BloodGroupOptions)[number]["value"];
