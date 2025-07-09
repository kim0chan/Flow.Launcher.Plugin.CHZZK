import db from "./data";
import { BASE_URL } from "../api/constant";
import { ChannelData, ResultMessage, Row } from '../type/plugin';
import { buildSearchRow, handleDefault } from './default';
import { buildErrorMessageRow, buildMessageRow, buildRow, buildVisitRow } from "./common";
import { searchChannels } from "../api/channel";
import { ChannelDto } from "../api/model";
import { ICO } from './constant';

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
      ICO.ADD,
    ),
  ],
});

export const handleChannelRemoveGuide = (): ResultMessage => ({
  result: [ buildMessageRow('Enter a channel name to remove.', undefined, ICO.REMOVE) ],
});

export const handleChannelAdd = async (channelId: string): Promise<ResultMessage> => {
  let response: ChannelDto[];

  try {
    response = await searchChannels(channelId);
  } catch (e) {
    return { result: [ buildErrorMessageRow(e) ] }
  }

  if (response.length === 0) {
    return { result: [ buildMessageRow('Please enter a correct channel ID') ] };
  }
  const channelFound = response[0];

  const rows: Row[] = [
    buildRow(
      channelFound.channelName,
      `${channelFound.followerCount} Followers`,
      channelFound.channelImageUrl || ICO.ADD,
      'add',
      [channelFound.channelName, channelFound.channelId],
    ),
  ];

  return { result: rows };
}

export const handleChannelList = async (channelName?: string): Promise<ResultMessage> => {
  const addedChannels = db.findByName(channelName || '');
  let channels: ChannelDto[];

  try {
    channels = addedChannels.length === 0
      ? []
      : await searchChannels(...addedChannels.map(c => c.id));
  } catch (e) {
    return { result: [ buildErrorMessageRow(e) ] };
  }

  if (channels.length === 0) {
    return {
      result: [ buildSearchRow(channelName) ],
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
          c.channelImageUrl || ICO.ADD,
          c.followerCount,  // TODO: improve query result using meaningful score value.
        )),
        buildSearchRow(channelName),
      ]
    };
  }
}

export const handleChannelRemove = async (channelName: string): Promise<ResultMessage> => {
  const addedChannels = db.findByName(channelName);
  let channels: ChannelDto[]
  ;
  try {
    channels = addedChannels.length === 0
      ? []
      : await searchChannels(...addedChannels.map(c => c.id));
  } catch (e) {
    return { result: [ buildErrorMessageRow(e) ] };
  }

  return {
    result: [
      ...channels.map(c => buildRow(
        c.channelName,
        `Delete ${c.channelName} (${c.followerCount} Followers)`,
        c.channelImageUrl || ICO.REMOVE,
        'remove',
        [c.channelId],
      )),
    ]
  };
}
