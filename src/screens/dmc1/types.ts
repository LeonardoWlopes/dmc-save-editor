import type z from 'zod';
import type { dmc1ScreenSchema } from './schema';

export type TDmc1ScreenForm = z.infer<typeof dmc1ScreenSchema>;
