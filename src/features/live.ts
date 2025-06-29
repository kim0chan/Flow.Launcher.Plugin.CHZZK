import { ResultMessage, Row } from '../type/plugin';
import { BASE_URL } from '../api/constant';
import { searchLive } from '../api/live';

export const handleLive = async (next?: string): Promise<ResultMessage> => {
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