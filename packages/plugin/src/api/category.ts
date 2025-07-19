import { CategoryDto } from './model';
import { chzzkApi } from './client';

export const searchCategory = async (query: string): Promise<CategoryDto[]> => {
  return await chzzkApi.get<CategoryDto[]>('/categories/search', { query });
};