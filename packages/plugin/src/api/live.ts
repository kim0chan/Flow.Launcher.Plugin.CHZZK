import { LiveDto } from './model';
import { chzzkApi } from './client';

export const searchLive = async (next?: string): Promise<LiveDto[]> => {
  const params = next ? { next } : undefined;
  return await chzzkApi.get<LiveDto[]>('/lives', params);
};