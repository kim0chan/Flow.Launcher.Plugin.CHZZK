import { CategoryDto } from '../api/model';
import { ResultMessage, Row } from '../type/flow-launcher';
import { BASE_API_URL, BASE_URL } from '../api/constant';

export const searchCategory = async (query: string): Promise<CategoryDto[]> => {
  try {
    const url = new URL(BASE_API_URL + '/categories/search');
    url.searchParams.append('query', query);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': process.env.CLIENT_ID,
        'Client-Secret': process.env.CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      console.error(`API 요청 실패: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data?.content?.data ?? [];
  } catch (e) {
    console.error('searchCategory error →', (e as Error).message);
    return [];
  }
}

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
