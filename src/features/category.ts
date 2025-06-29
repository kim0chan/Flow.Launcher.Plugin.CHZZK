import { ResultMessage, Row } from '../type/plugin';
import { BASE_URL } from '../api/constant';
import { searchCategory } from "../api/category";
import { buildMessageRow, buildVisitRow } from "./common";

export const handleCategory = async (query: string): Promise<ResultMessage> => {
  const response = await searchCategory(query);

  const rows: Row[] = response.map(dto => buildVisitRow(
    `${BASE_URL}/category/${dto.categoryType}/${dto.categoryId}/lives`,
    dto.categoryValue || '',
    dto.categoryType || '',
    dto.posterImageUrl || 'images/app.png'
  ));

  return { result: rows };
}

export const handleCategoryGuide = (): ResultMessage => ({
  result: [ buildMessageRow('Enter a category name to explore.') ],
})
