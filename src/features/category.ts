import { ResultMessage, Row } from '../type/plugin';
import { BASE_URL } from '../api/constant';
import { ICO } from './constant';
import { searchCategory } from "../api/category";
import { CategoryDto } from '../api/model';
import { buildErrorMessageRow, buildMessageRow, buildVisitRow } from './common';

export const handleCategory = async (query: string): Promise<ResultMessage> => {
  let response: CategoryDto[];

  try {
    response = await searchCategory(query);
  } catch (e) {
    return { result: [ buildErrorMessageRow(e) ] }
  }

  const rows: Row[] = response.map(dto => buildVisitRow(
    `${BASE_URL}/category/${dto.categoryType}/${dto.categoryId}/lives`,
    dto.categoryValue || '',
    dto.categoryType || '',
    dto.posterImageUrl || ICO.APP,
  ));

  return { result: rows };
}

export const handleCategoryGuide = (): ResultMessage => ({
  result: [ buildMessageRow('Enter a category name to explore.', undefined, ICO.CATEGORY) ],
})
