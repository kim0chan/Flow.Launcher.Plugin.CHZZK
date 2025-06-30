import { ChannelDto } from './model';
import { BASE_API_URL } from './constant';

// TODO: better api error handling (when channel is already added but failed to fetch data from the server)
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
      return [];
    }

    const data = await response.json();
    return data?.content?.data ?? [];
  } catch (e) {
    return [];  // TODO: do something better
  }
}