import { ChannelDto } from './model';
import { chzzkApi } from './client';

export const searchChannels = async (...channelIds: string[]): Promise<ChannelDto[]> => {
  if (channelIds.length === 0) {
    return [];
  }
  return await chzzkApi.get<ChannelDto[]>('/channels', { channelIds: channelIds.join(',') });
};