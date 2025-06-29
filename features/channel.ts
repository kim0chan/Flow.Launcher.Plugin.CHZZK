import db from "./data";
import { BASE_URL } from "../api/constant";
import { ChannelData, ResultMessage, Row } from '../type/plugin';
import { buildSearchRow, handleDefault } from './default';
import {buildMessageRow, buildRow, buildVisitRow} from "./common";
import { searchChannels } from "../api/channel";

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

export const handleChannelAddGuide = (): ResultMessage => ({
  result: [
    buildMessageRow(
      'Enter a ID to add channel to the list.',
      'Example: add c42cd75ec4855a9edf204a407c3c1dd2',
    ),
  ],
});

export const handleChannelRemoveGuide = (): ResultMessage => ({
  result: [ buildMessageRow('Enter a channel name to remove.') ],
});

export const handleChannelAdd = async (channelId: string): Promise<ResultMessage> => {
  const response = await searchChannels(channelId);

  if (response.length === 0) {
    return { result: [ buildMessageRow('Please enter a correct channel ID') ] };
  }
  const channelFound = response[0];

  const rows: Row[] = [
    buildRow(
      channelFound.channelName,
      `${channelFound.followerCount} Followers`,
      channelFound.channelImageUrl,
      'add',
      [channelFound.channelName, channelFound.channelId],
    ),
  ];

  return { result: rows };
}

export const handleChannelList = async (channelName?: string): Promise<ResultMessage> => {
  const addedChannels = db.findByName(channelName || '');
  const channels = addedChannels.length === 0
    ? []
    : await searchChannels(...addedChannels.map(c => c.id));

  if (channels.length === 0) {
    return {
      result: [buildSearchRow(channelName)],
    };
  }
  if (!channelName || channelName.length === 0) {
    return await handleDefault();
  } else {
    return {
      result: [
        ...channels.map(c => buildVisitRow(
          `${BASE_URL}/live/${c.channelId}`,
          c.channelName,
          `${c.followerCount} Followers`,
          c.channelImageUrl,
        )),
        buildSearchRow(channelName),
      ]
    };
  }
}

export const handleChannelRemove = async (channelName: string): Promise<ResultMessage> => {
  const addedChannels = db.findByName(channelName);
  const channels = addedChannels.length === 0
    ? []
    : await searchChannels(...addedChannels.map(c => c.id));

  return {
    result: [
      ...channels.map(c => buildRow(
        c.channelName,
        `Delete ${c.channelName} (${c.followerCount} Followers)`,
        c.channelImageUrl,
        'remove',
        [c.channelId],
      )),
    ]
  };
}
