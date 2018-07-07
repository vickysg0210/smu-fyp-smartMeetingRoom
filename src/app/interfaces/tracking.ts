import { Participant } from './participant';

export interface Tracking {
  date: string,
  coordinateX: number,
  coordinateY: number,
  participant: Participant,
  trackingId: number
}
