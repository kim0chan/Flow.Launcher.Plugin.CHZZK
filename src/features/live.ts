import { ResultMessage, Row } from '../type/plugin';
import { BASE_URL } from '../api/constant';
import { searchLive } from '../api/live';
import { LiveDto } from '../api/model';
import { buildErrorMessageRow } from './common';

// TODO: retrieve next feature
export const handleLive = async (next?: string): Promise<ResultMessage> => {
  let response: LiveDto[];
  try {
    response = await searchLive(next);
  } catch (e) {
    return { result: [ buildErrorMessageRow(e) ] }
  }

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