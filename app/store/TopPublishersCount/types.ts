export const FETCH_TOP_PUBLISHERS_COUNT_SUCCESS = 'fetchTopPublisherCountSuccess';

export interface TopPublishersCountType {
  isFetched: boolean;
  data: PublisherCountType[];
}

export interface PublisherCountType {
  publisher: string;
  publisherCount: number;
}

export interface TopPublisherCountActionType {
  type: string;
  topPublishersCount: PublisherCountType[];
}
