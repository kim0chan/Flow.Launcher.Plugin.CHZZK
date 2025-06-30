import { LiveDto } from './model';
import { BASE_API_URL } from './constant';

export const searchLive = async (next?: string): Promise<LiveDto[]> => {
  try {
    const url = new URL(BASE_API_URL + '/lives');
    if (next) url.searchParams.append('next', next);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': process.env.CLIENT_ID,
        'Client-Secret': process.env.CLIENT_SECRET,
      }
    });

    // TODO: can we make it better? ('throw' of exception caught locally)
    if (!response.ok) {
      throw new Error('Failed to fetch live streams.')
    }

    const data = await response.json();
    return data?.content?.data ?? [];
  } catch (e) {
    throw e;
  }
};