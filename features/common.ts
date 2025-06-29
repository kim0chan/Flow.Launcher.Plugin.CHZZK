import { ResultMessage, Row } from '../type/plugin';
import { handleDefault } from './default';
import { handleCategory, handleCategoryGuide } from './category';
import { handleLive } from "./live";
import {
  handleChannelAdd, handleChannelAddGuide,
  handleChannelList,
  handleChannelRemove, handleChannelRemoveGuide,
} from './channel';

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
      return handleDefault();
    }

    if (command === 'live') {
      return handleLive(args);
    } else if (command === 'add') {
      return handleChannelAddGuide();
    } else if (command === 'rm' || command === 'remove') {
      return handleChannelRemoveGuide();
    } else if (command === 'category') {
      return handleCategoryGuide();
    }

    // Consider the entered word as a channel name and hand it over to the channel query function
    const channelName = command;
    return handleChannelList(channelName);
  }

  // Two or more words query
  if (command === 'category') {
    return await handleCategory(args);
  } else if (command === 'add') {
    return await handleChannelAdd(args);
  } else if (command === 'rm' || command === 'remove') {
    return await handleChannelRemove(args);
  } else {
    const channelQuery = `${command} ${args}`
    return handleChannelList(channelQuery);
  }
};

export const buildRow = (
  title: string,
  subtitle?: string,
  icoPath?: string,
  actionMethod?: string,
  actionParams?: (string | boolean)[],
  actionHideAfterAction?: boolean,
): Row => {
  const row: Row = {
    Title: title,
    IcoPath: icoPath ?? 'images/app.png',
  }

  if (subtitle)     row.Subtitle = subtitle;

  if (actionMethod) {
    row.JsonRPCAction = {
      method: actionMethod,
    }

    if (actionParams)           row.JsonRPCAction.parameters = actionParams;
    if (actionHideAfterAction)  row.JsonRPCAction.dontHideAfterAction = true;
  }

  return row;
};

export const buildMessageRow = (
  title: string,
  subtitle?: string,
  icoPath?: string,
): Row => buildRow(title, subtitle, icoPath);

export const buildVisitRow = (
  url: string,
  title: string,
  subtitle?: string,
  icoPath?: string,
): Row => buildRow(title, subtitle, icoPath, 'visit', [url]);

export const buildChangeQueryRow = (
  query: string,
  title: string,
  subtitle: string,
  icoPath?: string,
): Row => buildRow(title, subtitle, icoPath, 'Flow.Launcher.ChangeQuery', [query, true], true);
