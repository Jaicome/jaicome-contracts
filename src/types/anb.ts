import { z } from "zod";

export const paymentStatus = z.enum([
  "INITIATED",
  "QUEUED",
  "CANCELED",
  "PENDING",
  "FAILED",
  "PROCESSED",
  "PAID",
  "RETURNED",
]);

export type PaymentStatus = z.infer<typeof paymentStatus>;

export const payment = z.object({
  id: z.string(),
  sequenceNumber: z.string(),
  transactionReferenceNumber: z.string(),
  externalReferenceNumber: z.string().optional(),
  status: paymentStatus,
  reasonOfFailure: z.string().optional(),
});

export const channel = z.enum(["ANB", "SWIFT", "SARIE", "IPS"]);

export type Channel = z.infer<typeof channel>;

export const bicMap = {
  SAMASARI: {
    name: "Saudi Central Bank",
    arabicName: "البنك المركزي السعودي",
    clearingCode: "1",
  },
  INMASARI: {
    name: "Al-Inma Bank",
    arabicName: "بنك الإنماء",
    clearingCode: "5",
  },
  NCBKSAJE: {
    name: "SAUDI NATIONAL BANK",
    arabicName: "البنك الأهلي السعودي",
    clearingCode: "10",
  },
  ALBISARI: {
    name: "BANK AL BILAD",
    arabicName: "بنك البلاد",
    clearingCode: "15",
  },
  RIBLSARI: {
    name: "RIYAD BANK",
    arabicName: "بنك الرياض",
    clearingCode: "20",
  },
  ARNBSARI: {
    name: "ARAB NATIONAL BANK",
    arabicName: "البنك العربي الوطني",
    clearingCode: "30",
  },
  DBAKSARI: {
    name: "D360 Bank",
    arabicName: "دال ثلاثمائة وستون",
    clearingCode: "36",
  },
  SABBSARI: {
    name: "Saudi Awwal Bank",
    arabicName: "البنك السعودي الأول",
    clearingCode: "45",
  },
  BSFRSARI: {
    name: "Banque Saudi Fransi",
    arabicName: "البنك السعودي الفرنسي",
    clearingCode: "55",
  },
  BJAZSAJE: {
    name: "BANK AL-JAZIRA",
    arabicName: "بنك الجزيرة",
    clearingCode: "60",
  },
  SIBCSARI: {
    name: "SAUDI INVESTMENT BANK",
    arabicName: "البنك السعودي للإستثمار",
    clearingCode: "65",
  },
  NBOBSARI: {
    name: "NATIONAL BANK OF BAHRAIN",
    arabicName: "بنك البحرين الوطني",
    clearingCode: "71",
  },
  QNBASARI: {
    name: "Qatar National Bank",
    arabicName: "بنك قطر الوطني",
    clearingCode: "72",
  },
  FABMSARI: {
    name: "FIRST ABU DHABI BANK",
    arabicName: "بنك أبوظبي الأول",
    clearingCode: "73",
  },
  NBOKSAJE: {
    name: "NATIONAL BANK OF KUWAIT",
    arabicName: "بنك الكويت الوطني",
    clearingCode: "75",
  },
  BMUSSARI: {
    name: "Bank Muscat",
    arabicName: "بنك مسقط",
    clearingCode: "76",
  },
  STCJSARI: {
    name: "STC Bank",
    arabicName: "بنك اس تي سي",
    clearingCode: "78",
  },
  NBIQSARI: {
    name: "National Bank of Iraq",
    arabicName: "المصرف الأهلي العراقي",
    clearingCode: "79",
  },
  RJHISARI: {
    name: "AL RAJHI BANK",
    arabicName: "مصرف الراجحي",
    clearingCode: "80",
  },
  DEUTSARI: {
    name: "Deutsche Bank",
    arabicName: "دويتشة بنك أي جي",
    clearingCode: "81",
  },
  NBPASARI: {
    name: "National Bank of Pakistan",
    arabicName: "بنك باكستان",
    clearingCode: "82",
  },
  TCZBSARI: {
    name: "T.C.ZIRAAT BANKASI A.S.",
    arabicName: "بنك زراعات التركي",
    clearingCode: "84",
  },
  BNPASARI: {
    name: "BNP PARIBAS",
    arabicName: "بي ان بي باريبا",
    clearingCode: "85",
  },
  CHASSARI: {
    name: "JP Morgan Chase Bank N.A (Riyadh Branch)",
    arabicName: "بنك جي بي مورغان تشيس (فرع الرياض)",
    clearingCode: "86",
  },
  ICBKSARI: {
    name: "Industrial and Commercial BANK of CHINA",
    arabicName: "البنك الصناعي والتجاري الصيني",
    clearingCode: "87",
  },
  BOTKSARI: {
    name: "MUFG Bank",
    arabicName: "بنك ميستوبيشي",
    clearingCode: "88",
  },
  CRESSARY: {
    name: "Credit Suisse AG",
    arabicName: "كريدي سويس",
    clearingCode: "89",
  },
  GULFSARI: {
    name: "Gulf International Bank",
    arabicName: "بنك الخليج الدولي",
    clearingCode: "90",
  },
  SCBLSAR2: {
    name: "Standard Chartered Bank KSA Br",
    arabicName: "بنك ستاندر شارتر",
    clearingCode: "91",
  },
  BSHRSARI: {
    name: "Sohar International Bank",
    arabicName: "بنك صحار",
    clearingCode: "92",
  },
  VIIOSARI: {
    name: "VISION BANK",
    arabicName: "بنك فيجن",
    clearingCode: "93",
  },
  EBILSARI: {
    name: "Emirates (NBD)",
    arabicName: "بنك الإمارات الدولي",
    clearingCode: "95",
  },
} as const;

export type BicCode = keyof typeof bicMap;
export type BicInfo = (typeof bicMap)[BicCode];

export const BicCodeEnum = z.enum(
  Object.keys(bicMap) as [BicCode, ...BicCode[]]
);

export const purposeMap = {
  "20": "BILLS_OR_RENT",
  "21": "EXPENSES_SERVICES",
  "22": "PURCHASE_ASSETS",
  "23": "SAVING_INVESTMENT",
  "24": "GOVERNMENT_DUES",
  "25": "MONEY_EXCHANGE",
  "26": "CREDIT_CARD_LOAN",
  "27": "GIFT_OR_REWARD",
  "28": "PERSONAL_LOAN_ASSISTANCE",
  "29": "INVESTMENT_TRANSACTION",
  "30": "FAMILY_ASSISTANCE",
  "31": "DONATION",
  "32": "PAYROLL_BENEFITS",
  "33": "ONLINE_PURCHASE",
  "34": "HAJJ_AND_UMRA",
  "35": "DIVIDEND_PAYMENT",
  "36": "GOVERNMENT_PAYMENT",
  "37": "INVESTMENT_HOUSE",
  "38": "PAYMENT_TO_MERCHANT",
  "39": "OWN_ACCOUNT_TRANSFER",
} as const;

export type Purpose = (typeof purposeMap)[keyof typeof purposeMap];
export type PurposeCode = keyof typeof purposeMap;

export const purposeEnum = z.enum(
  Object.values(purposeMap) as [Purpose, ...Purpose[]]
);
export const PurposeCodeEnum = z.enum([
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
]);

export const singlePaymentInput = z.object({
  sequenceNumber: z.string(),
  valueDate: z.string().default(new Date().toISOString()),
  currency: z.string().default("SAR"),
  amount: z.string(),
  orderingParty: z.string(),
  feeIncluded: z.boolean().default(false),
  orderingPartyAddress1: z.string(),
  orderingPartyAddress2: z.string(),
  orderingPartyAddress3: z.string(),
  debitAccount: z.string(),
  destinationBankBIC: BicCodeEnum,
  channel: channel.default("SARIE"),
  creditAccount: z.string(),
  beneficiaryName: z.string(),
  beneficiaryAddress1: z.string(),
  beneficiaryAddress2: z.string(),
  purposeOfTransfer: PurposeCodeEnum,
  narrative: z.string().optional(),
  transactionComment: z.string().optional(),
});

export type SinglePaymentInput = z.infer<typeof singlePaymentInput>;
