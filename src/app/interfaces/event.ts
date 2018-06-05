import { Media } from './media';

export interface Event {
  eventId: number,
  eventName: string,
  venue: string,
  eventDate: string,
  address: string,
  city: string,
  country: string,
  postalCode: number,
  avatar: Media,
  date: string
}
