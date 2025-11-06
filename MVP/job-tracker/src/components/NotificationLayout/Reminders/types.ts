import z from "zod";

export const RemindersSchema = z.object({
  id: z.string(),
  note: z.string(),
  created_at: z.string(),
  time: z.string(),
});

export type RemindersProps = z.infer<typeof RemindersSchema>;

export const RemindersArraySchema = z.object({
  reminders: z.array(RemindersSchema),
  handleDeleteReminder: z.function({
    input: [z.string()],
    output: z.void(),
  }),
  loadingReminders: z.boolean(),
});

export type RemindersArrayProps = z.infer<typeof RemindersArraySchema>;

export const ReminderSchema = z.object({
  reminder: RemindersSchema,
  handleDeleteReminder: z.function({
    input: [z.string()],
    output: z.void(),
  }),
});

export type ReminderProps = z.infer<typeof ReminderSchema>;
