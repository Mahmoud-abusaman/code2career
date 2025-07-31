import { BaseRepository } from "./repository";
import { Booking } from "./models/Booking";

export class BookingRepository extends BaseRepository<Booking> {
  constructor(arr:Booking[]) {
    super(arr);
  }
}
