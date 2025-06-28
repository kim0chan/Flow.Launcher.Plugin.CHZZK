import { buildTestMessage } from './default';
import { ResultMessage } from '../type/flow-launcher';

export const invokeChannel = (query: string): ResultMessage => ({
  result: [ buildTestMessage(`${query}에 대한 채널 결과를 조회합니다.`) ],
})