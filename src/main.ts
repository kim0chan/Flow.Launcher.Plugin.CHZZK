require('dotenv').config({ quiet: true });

const openUrl = require('open');
import { addChannel, removeChannel } from "./features/channel";
import { handleDefault } from './features/default';
import { Command, ResultMessage } from './type/plugin';
import { handleInput } from './features/common';

const { method, parameters } = JSON.parse(process.argv[2]);

const output = (msg: ResultMessage) => {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

// JSON-RPC method routing
const routeMethod = async (): Promise<void> => {
  const input = parameters[0] ?? '';

  try {
    switch (method as Command) {
      case 'query':
        output(await handleInput(input));
        break;
      case 'visit':
        openUrl(input);
        break;
      case 'add':
        const [channelName, channelId] = parameters;
        addChannel(channelName, channelId);
        break;
      case 'remove':
        removeChannel(input);
        break;
      default:
        output(await handleDefault());
    }

  } catch (e) {
    console.error('plugin fatal error: ', e);
    output({ result: [] });
  }
}

routeMethod().then();

