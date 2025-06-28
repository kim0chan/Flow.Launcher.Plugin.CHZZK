require('dotenv').config({ quiet: true });

import { invokeWatch } from './features/default';
import { Command, ResultMessage } from './type/flow-launcher';
import { handleInput } from './features/common';
const openUrl = require('./node_modules/open');

const { method, parameters } = JSON.parse(process.argv[2]);

const output = (msg: ResultMessage) => {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

const routeMethod = async (): Promise<void> => {
  const input = parameters[0] ?? '';

  try {
    switch (method as Command) {
      case 'query':
        const result = await handleInput(input);
        output(result);
        break;
      case 'visit':
        openUrl(input);
        break;
      default:
        output(invokeWatch());
    }

  } catch (e) {
    console.error('plugin fatal error: ', e);
    output({ result: [] });
  }
}

routeMethod();

