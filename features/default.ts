import { BASE_URL } from '../api/constant';
import { ResultMessage, Row } from '../type/flow-launcher';

export const invokeWatch = (): ResultMessage => ({
  result: buildDefaultMessage(),
});

const buildDefaultMessage = (): Row[] => {
  return [
    {
      Title: 'CHZZK',
      Subtitle: 'Watch CHHZK!',
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