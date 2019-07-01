export const FETCH_PUBLISHER_COUNT_SUCCESS = 'fetchPublisherSuccess';

export type PublisherCount = number;

export interface PublisherCountActionType {
  type: string;
  publisherCount: PublisherCount;
}
