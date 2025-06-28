import { ResultMessage } from '../type/flow-launcher';
import { buildTestMessage } from './default';

export const invokeLive = (query: string): ResultMessage => ({
  result: [buildTestMessage(`${query}에 대한 라이브 결과를 조회합니다.`)],
})