import db from './data';
import { BASE_URL } from '../api/constant';
import { ResultMessage, Row } from '../type/plugin';
import { searchChannels } from '../api/channel';
import { buildChangeQueryRow, buildVisitRow } from './common';
import { ICO } from './constant';
import { ChannelDto } from "../api/model";

export const handleDefault = async (): Promise<ResultMessage> => ({
  result: await buildDefaultRows(),
});

const buildChannelRows = async (): Promise<Row[]> => {
  const addedChannels = db.findByName('');
  let channels: ChannelDto[];

  try {
    channels = addedChannels.length === 0
      ? []
      : await searchChannels(...addedChannels.map(c => c.id));
  } catch (e) {
    return [];
  }

  return [
    ...channels.map(c => buildVisitRow(
      `${BASE_URL}/live/${c.channelId}`,
      c.channelName,
      `${c.followerCount} Followers`,
      c.channelImageUrl,
      c.followerCount, // TODO: improve query result using meaningful score value
    ))
  ]
}

const buildDefaultRows = async (): Promise<Row[]> => (
  [
    ...await buildChannelRows(),
    buildVisitRow(BASE_URL, 'CHZZK', undefined, ICO.APP),
    buildChangeQueryRow('cz live', 'Live', undefined, ICO.LIVE),
    buildChangeQueryRow('cz category ', 'Category', undefined, ICO.CATEGORY),
    buildChangeQueryRow('cz add ', 'Add Channel', undefined, ICO.ADD),
    buildChangeQueryRow('cz remove ', 'Remove Channel', undefined, ICO.REMOVE),
  ]
);

export const buildSearchRow = (query: string): Row => buildVisitRow(
  `${BASE_URL}/search?query=${query}`,
  `Search '${query}' on CHZZK`,
  undefined,
  ICO.SEARCH,
);
