import {invokeWatch} from './default';
import {invokeCategory} from './category';
import {invokeChannel} from './channel';
import {ResultMessage} from '../type/flow-launcher';

const splitInput = (input: string): [string, string | undefined] => {
  const firstSpaceIndex = input.indexOf(' ');
  if (firstSpaceIndex === -1) {
    return [input, undefined];
  }
  const command = input.slice(0, firstSpaceIndex);
  const args = input.slice(firstSpaceIndex + 1);
  return [command, args];
}

export const handleInput = async (input: string): Promise<ResultMessage> => {
  const [command, args] = splitInput(input);

  if (!args) {
    // 띄어쓰기가 없는 경우
    if (command.length === 0) {
      // 빈 문자열인 경우
      return invokeWatch();
    }
    // 입력된 단어를 채널 이름으로 간주하여 채널 쿼리 함수로 넘김
    const channelName = command;
    return invokeChannel(channelName);
  }

  if (command === 'category') {
    return await invokeCategory(args);
  } else {
    return invokeWatch();
  }
};
