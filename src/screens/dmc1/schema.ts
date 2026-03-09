import { z } from 'zod';
import { EDmc1Difficulty } from '~/enums/dmc1';

export const dmc1ScreenSchema = z.object({
	currentMission: z
		.number()
		.int('Deve ser um inteiro')
		.min(0, 'Mínimo: 0')
		.max(23, 'Máximo: 23'),
	difficulty: z.enum(EDmc1Difficulty, {
		message: 'Dificuldade inválida',
	}),
	timesBeaten: z.number().int().min(0, 'Mínimo: 0').max(32767, 'Máximo: 32767'),
	saveCount: z.number().int().min(0, 'Mínimo: 0').max(32767, 'Máximo: 32767'),
	redOrbs: z
		.number()
		.int()
		.min(0, 'Mínimo: 0')
		.max(9999999, 'Máximo: 9.999.999'),
	yellowOrbs: z.number().int().min(0, 'Mínimo: 0').max(99, 'Máximo: 99'),
	blueOrbs: z.number().int().min(0, 'Mínimo: 0').max(4, 'Máximo: 4'),
	vitality: z.number().int().min(0, 'Mínimo: 0').max(30, 'Máximo: 30'),
	devilTrigger: z.number().int().min(0, 'Mínimo: 0').max(10, 'Máximo: 10'),
});
