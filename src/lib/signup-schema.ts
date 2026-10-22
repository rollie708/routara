import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().trim().max(254, "Please enter a shorter email address.").email("Please enter a valid email address.").transform((value) => value.toLowerCase()),
  xUsername: z.string().trim().max(16).regex(/^@?[A-Za-z0-9_]{1,15}$|^$/, "Enter a valid X username, up to 15 letters, numbers, or underscores.").optional().default("").transform((value) => value.replace(/^@/, "")),
  projectUpdates: z.boolean().optional().default(false),
  website: z.string().max(0, "Submission could not be accepted.").optional().default(""),
});
export type SignupInput = z.infer<typeof signupSchema>;
export const successMessage = "You're on the list. Thank you for your interest in ROUTARA. We'll share updates as the project progresses.";
