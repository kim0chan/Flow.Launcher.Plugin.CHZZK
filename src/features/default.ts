import db from './data';
import { BASE_URL } from '../api/constant';
import { ResultMessage, Row } from '../type/plugin';
import { searchChannels } from '../api/channel';
import { buildChangeQueryRow, buildVisitRow } from './common';
import { ICO } from './constant';

export const handleDefault = async (): Promise<ResultMessage> => ({
  result: await buildDefaultRows(),
});

const buildChannelRows = async (): Promise<Row[]> => {
  const addedChannels = db.findByName('');
  const channels = addedChannels.length === 0
    ? []
    : await searchChannels(...addedChannels.map(c => c.id));

  return [
    ...channels.map(c => buildVisitRow(
      `${BASE_URL}/live/${c.channelId}`,
      c.channelName,
      `${c.followerCount} Followers`,
      c.channelImageUrl
    ))
  ]
}

const buildDefaultRows = async (): Promise<Row[]> => (
  [
    ...await buildChannelRows(),
    buildVisitRow(BASE_URL, 'CHZZK', undefined, ICO.APP),
    buildChangeQueryRow('cz category ', 'Category', undefined, ICO.CATEGORY),
    buildChangeQueryRow('cz live', 'Live', undefined, ICO.LIVE),
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
