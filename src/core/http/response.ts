export const Response = {
	success: <T>(data: T, message = "OK") => {
		return {
			success: true,
			message,
			data,
		};
	},

	error: (message: string, code = "ERROR", details?: unknown) => {
		return {
			success: false,
			message,
			code,
			details,
		};
	},
};
