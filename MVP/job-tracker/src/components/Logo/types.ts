import z from "zod";

export const LogoSchema = z.object({
  profileSrc: z.string().optional(),
});

export type LogoProps = z.infer<typeof LogoSchema>;
