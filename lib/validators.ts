import { z } from 'zod';

export const slateSchema = z.object({
  show: z.string().min(1),
  submittingFor: z.enum(['WIP', 'FINAL']),
  versionName: z
    .string()
    .min(1)
    .max(32)
    .refine((v) => !/\s{2,}/.test(v), { message: 'No double spaces' }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  vendor: z.string().min(1),
  shotAssetName: z.string().min(1),
  frames: z.string().min(1),
});

export type SlateFields = z.infer<typeof slateSchema>;
