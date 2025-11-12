import z from "zod";

export const ProfileSchema = z.object({
  id: z.string(),
  full_name: z.string().nullable(),
  avatar_url: z.any().nullable(),
  updated_at: z.string().optional(),
});

export type ProfileProps = z.infer<typeof ProfileSchema>;
