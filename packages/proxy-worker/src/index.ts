/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const BASE_API_URL = 'https://openapi.chzzk.naver.com/open/v1';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Key lookup
		const proxyAuthKey = request.headers.get('X-Proxy-Auth-Key');

		if (!env.PROXY_AUTH_KEY || proxyAuthKey !== env.PROXY_AUTH_KEY) {
			return new Response('Forbidden', { status: 403 });
		}

		const url = new URL(request.url);
		const targetUrl = `https://openapi.chzzk.naver.com/open/v1${url.pathname}${url.search}`;

		const newRequest = new Request(targetUrl, {
			method: request.method,
			headers: request.headers,
			body: request.body,
			redirect: 'follow',
		});

		newRequest.headers.delete('X-Proxy-Auth-Key');

		if (env.CLIENT_ID) {
			newRequest.headers.set('Client-Id', env.CLIENT_ID);
		}
		if (env.CLIENT_SECRET) {
			newRequest.headers.set('Client-Secret', env.CLIENT_SECRET);
		}

		const response = await fetch(newRequest);

		const newResponse = new Response(response.body, response);
		newResponse.headers.set('Access-Control-Allow-Origin', '*');
		return newResponse;
	},
} satisfies ExportedHandler<Env>;

