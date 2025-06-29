import {buildTestMessage, invokeSearch, invokeWatch} from './default';
import {ChannelData, ResultMessage, Row} from '../type/plugin';
import {BASE_URL} from "../api/constant";
import db from "./data";
import {searchChannels} from "../api/channel";

export const invokeChannelAdd = async (channelId: string): Promise<ResultMessage> => {
  const response = await searchChannels(channelId);

  if (response.length === 0) {
    return { result: [ buildTestMessage('채널 ID를 정확히 입력하세요!') ] };
  }
  const channelFound = response[0];

  const rows: Row[] = [{
    Title: channelFound.channelName,
    Subtitle: `${channelFound.followerCount} Followers`,
    IcoPath: channelFound.channelImageUrl,
    JsonRPCAction: {
      method: 'add',
      parameters: [channelFound.channelName, channelFound.channelId],
    },
  }]

  return { result: rows };
}

export const invokeChannelList = async (channelName?: string): Promise<ResultMessage> => {
  const addedChannels = db.findByName(channelName || '');
  const channels = addedChannels.length === 0
    ? []
    : await searchChannels(...addedChannels.map(c => c.id));

  if (channels.length === 0) {
    return invokeSearch(channelName);
  }
  if (!channelName || channelName.length === 0) {
    return await invokeWatch();
  } else {
    return {
      result: [
        ...channels.map(c => ({
          Title: c.channelName,
          Subtitle: `${c.followerCount} Followers`,
          JsonRPCAction: {
            method: 'visit',
            parameters: [`${BASE_URL}/live/${c.channelId}`],
          },
          IcoPath: c.channelImageUrl,
        })),
      ]
    };
  }
}

export const invokeChannelRemove = async (channelName: string): Promise<ResultMessage> => {
  const addedChannels = db.findByName(channelName);
  const channels = addedChannels.length === 0
    ? []
    : await searchChannels(...addedChannels.map(c => c.id));

  return {
    result: [
      ...channels.map(c => ({
        Title: c.channelName,
        Subtitle: `Remove ${c.channelName} (${c.followerCount} Followers)`,
        JsonRPCAction: {
          method: 'remove',
          parameters: [c.channelId],
        },
        IcoPath: c.channelImageUrl,
      })),
    ]
  };
}

export const addChannel = (channelName: string, channelId: string) => {
  const entry: ChannelData = {
    name: channelName,
    id: channelId,
  }

  db.addChannel(entry);
}

export const removeChannel = (channelId: string) => {
  db.deleteById(channelId);
}