export type Command = 'query' | 'visit' | 'live' | 'category';

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