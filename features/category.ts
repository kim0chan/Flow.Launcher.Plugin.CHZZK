import { ResultMessage, Row } from '../type/plugin';
import { BASE_URL } from '../api/constant';
import {searchCategory} from "../api/category";

export const invokeCategory = async (query: string): Promise<ResultMessage> => {
  const response = await searchCategory(query);

  const rows: Row[] = response.map(dto => ({
    Title: dto.categoryValue || '',
    Subtitle: dto.categoryType || '',
    IcoPath: dto.posterImageUrl || 'images/app.png',
    JsonRPCAction: {
      method: 'visit',
      parameters: [`${BASE_URL}/category/${dto.categoryType}/${dto.categoryId}/lives`],
    },
  }));

  return { result: rows };
}
