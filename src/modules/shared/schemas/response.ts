import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// =========================
// BASE RESPONSE
// =========================
export const Response200 = z
	.object({
		success: z.boolean().default(true),
		data: z.any(),
	})
	.openapi("Response200");

export const Response400 = z
	.object({
		success: z.boolean().default(false),
		message: z.string(),
		code: z.string().optional(),
	})
	.openapi("Response400");

export const Response422 = z
	.object({
		success: z.boolean().default(false),
		message: z.string(),
		errors: z.any().optional(),
	})
	.openapi("Response422");

export const Response500 = z
	.object({
		success: z.boolean().default(false),
		message: z.string().default("Internal Server Error"),
	})
	.openapi("Response500");
