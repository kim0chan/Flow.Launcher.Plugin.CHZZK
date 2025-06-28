export type Command = 'query' | 'visit' | 'live' | 'category' | 'add' | 'remove';

export type ResultMessage = {
  result: Row[];
};

export type Row = {
  Title: string;
  Subtitle?: string;
  JsonRPCAction?: RPCAction;
  IcoPath?: string;
}

export type RPCAction = {
  method: string;
  parameters?: (string | boolean)[];
}