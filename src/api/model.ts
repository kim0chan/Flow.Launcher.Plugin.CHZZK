export interface CategoryDto {
  categoryType: string;
  categoryId: string;
  categoryValue: string;
  posterImageUrl: string;
}

export interface LiveDto {
  liveId: number;
  liveTitle: string;
  liveThumbnailImageUrl: string;
  concurrentUserCount: number;
  openDate: string;
  adult: boolean;
  tags: string[];
  categoryType: string;
  liveCategory: string;
  liveCategoryValue: string;
  channelId: string;
  channelName: string;
  channelImageUrl: string;
}

export interface ChannelDto {
  channelId: string;
  channelName: string;
  channelImageUrl: string;
  followerCount: number;
}
