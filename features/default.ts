import { BASE_URL } from '../api/constant';
import { ResultMessage, Row } from '../type/flow-launcher';
import db from "./data";
import { searchChannels } from "./channel";

export const invokeWatch = async (): Promise<ResultMessage> => ({
  result: await buildDefaultMessage(),
});

const buildDefaultMessage = async (): Promise<Row[]> => {
  const addedChannels = db.findByName('');
  const channels = addedChannels.length === 0
    ? []
    : await searchChannels(...addedChannels.map(c => c.id));

  return [
    ...channels.map(c => ({
      Title: c.channelName,
      Subtitle: `${c.followerCount} Followers`,
      JsonRPCAction: {
        method: 'visit',
        parameters: [`${BASE_URL}/live/${c.channelId}`],
      },
      IcoPath: c.channelImageUrl,
    })),
    {
      Title: 'CHZZK',
      JsonRPCAction: {
        method: 'visit',
        parameters: [BASE_URL],
      },
      IcoPath: 'images/app.png',
    },
  ];
}

export const buildTestMessage = (message: string): Row => {
  return {
    Title: "TEST",
    Subtitle: `message: ${message}`,
    IcoPath: "images/app.png",
  }
}

export const invokeSearch = (query: string): ResultMessage => {
  return {
    result: [{
      Title: `Search ${query} on CHZZK`,
      JsonRPCAction: {
        method: 'visit',
        parameters: [`${BASE_URL}/search?query=${query}`],
      },
      IcoPath: 'images/app.png',
    }]
  }
}