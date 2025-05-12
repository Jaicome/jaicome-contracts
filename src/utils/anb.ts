import {
  bicMap,
  purposeMap,
  type BicCode,
  type BicInfo,
  type Purpose,
  type PurposeCode,
} from "@/types/anb";

export const getPurposeCode = (purpose: Purpose) => {
  const code = Object.keys(purposeMap).find(
    (key) => purposeMap[key as unknown as keyof typeof purposeMap] === purpose
  );
  return code as unknown as PurposeCode;
};

export const getPurposeDescription = (code: PurposeCode) => purposeMap[code];

export const getBicInfo = (bicCode: BicCode): BicInfo => bicMap[bicCode];

export const getBicByName = (name: string): BicCode | undefined => {
  return Object.keys(bicMap).find(
    (code) => bicMap[code as BicCode].name.toLowerCase() === name.toLowerCase()
  ) as BicCode | undefined;
};

export const getBicByArabicName = (arabicName: string): BicCode | undefined => {
  return Object.keys(bicMap).find(
    (code) =>
      bicMap[code as BicCode].arabicName.toLowerCase() ===
      arabicName.toLowerCase()
  ) as BicCode | undefined;
};

export const getBicByClearingCode = (
  clearingCode: string
): BicCode | undefined => {
  return Object.keys(bicMap).find(
    (code) => bicMap[code as BicCode].clearingCode === clearingCode
  ) as BicCode | undefined;
};
