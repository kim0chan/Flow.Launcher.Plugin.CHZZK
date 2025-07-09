
import { BASE_API_URL } from './constant';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message?: string,
  ) {
    super(message);
  }
}

export const chzzkApi = {
  get: async <T>(path: string, params?: Record<string, string>): Promise<T> => {
    const url = new URL(BASE_API_URL + path);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': process.env.CLIENT_ID,
        'Client-Secret': process.env.CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText, `Failed to fetch ${path}`);
    }

    const data = await response.json();
    return data?.content?.data ?? null;
  },
};
