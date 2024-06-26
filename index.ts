import Elysia from "elysia";

import { randomUUID } from "crypto";

type Options = {
	uuid?: () => string;
	header?: string;
};

export const requestID = ({
	uuid = randomUUID,
	header = "X-Request-ID",
}: Readonly<Options> = {}) => {
	return new Elysia({ name: "request-id", seed: header })
		.on("request", ({ set, request: { headers } }) => {
			set.headers[header] = headers.get(header) || uuid();
		})
		.derive({ as: 'global' },({ request, set }) => {
			return {
				requestID: set.headers[header],
			};
		});
};
