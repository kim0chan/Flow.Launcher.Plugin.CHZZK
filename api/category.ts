import { CategoryDto } from './model';
import { BASE_API_URL } from './constant';

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
    console.error('searchCategory error: ', (e as Error).message);
    return [];
  }
};