import { z } from 'zod';

export const dailySchema = z.object({
  title: z.string(),
  content: z.string(),
  date: z.string(),
});

export type Daily = z.infer<typeof dailySchema> & {
  id: string;
};

export type DailyInput = Omit<Daily, 'id'>;
