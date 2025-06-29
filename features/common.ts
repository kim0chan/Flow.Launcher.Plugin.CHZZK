import { invokeWatch } from './default';
import { invokeCategory } from './category';
import {invokeChannelAdd, invokeChannelList, invokeChannelRemove} from './channel';
import { ResultMessage } from '../type/plugin';
import { invokeLive } from "./live";

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
    // One-word query
    if (command.length === 0) {
      // Empty string
      return invokeWatch();
    }

    if (command === 'live') {
      return invokeLive(args);
    }

    // Consider the entered word as a channel name and hand it over to the channel query function
    const channelName = command;
    return invokeChannelList(channelName);
  }

  // Two or more words query
  if (command === 'category') {
    return await invokeCategory(args);
  } else if (command === 'add') {
    return await invokeChannelAdd(args);
  } else if (command === 'rm' || command === 'remove') {
    return await invokeChannelRemove(args);
  } else {
    const channelQuery = `${command} ${args}`
    return invokeChannelList(channelQuery);
  }
};
