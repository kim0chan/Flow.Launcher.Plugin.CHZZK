export interface CategoryResponse {
  code: number;
  message: string | null;
  content: {
    data: CategoryDto[];
  }
}

export interface CategoryDto {
  categoryType: string;
  categoryId: string;
  categoryValue: string;
  posterImageUrl: string;
}