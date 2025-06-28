import {ResultMessage, Row} from '../type/flow-launcher';
import { buildTestMessage } from './default';
import {BASE_API_URL, BASE_URL} from "../api/constant";
import {LiveDto} from "../api/model";

export const searchLive = async (next?: string): Promise<LiveDto[]> => {
  try {
    const url = new URL(BASE_API_URL + '/lives');
    if (!!next) url.searchParams.append('next', next);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': process.env.CLIENT_ID,
        'Client-Secret': process.env.CLIENT_SECRET,
      }
    });

    if (!response.ok) {
      console.error(`API 요청 실패: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data?.content?.data ?? [];
  } catch (e) {
    console.error('searchLive error: ', (e as Error).message);
    return [];
  }
};

export const invokeLive = async (next?: string): Promise<ResultMessage> => {
  const response = await searchLive();  // TODO: retrieve next feature

  const rows: Row[] = response.map(dto => ({
    Title: dto.liveTitle,
    Subtitle: `${dto.channelName} (${dto.concurrentUserCount} Viewers)`,
    IcoPath: dto.channelImageUrl,
    JsonRPCAction: {
      method: 'visit',
      parameters: [`${BASE_URL}/live/${dto.channelId}`],
    }
  }));

  return { result: rows };
}