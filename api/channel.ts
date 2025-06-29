import { ChannelDto } from './model';
import { BASE_API_URL } from './constant';

export const searchChannels = async (...channelIds: string[]): Promise<ChannelDto[]> => {
  try {
    const url = new URL(BASE_API_URL + '/channels')
    url.searchParams.append('channelIds', channelIds.join(","))

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': process.env.CLIENT_ID,
        'Client-Secret': process.env.CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      console.error(`API 요청 실패: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data?.content?.data ?? [];
  } catch (e) {
    console.error('searchChannels error: ', (e as Error).message);
    return [];
  }
}