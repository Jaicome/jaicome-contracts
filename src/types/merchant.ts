import z from "zod/v4";

export const merchant = z.object({
  id: z.uuid(),
  organizationId: z.string(),
  ownerId: z.uuid(),
  country: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  businessEmail: z.string(),
  phoneNumber: z.string(),
  description: z.string(),
  logoUrl: z.string(),
  bannerUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const merchantOwner = z.object({
  id: z.uuid(),
  merchantId: z.uuid(),
  memberId: z.string(),
  name: z.string(),
  idNumber: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});
