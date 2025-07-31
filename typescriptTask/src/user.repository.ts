import { User } from "./models/User";
import { BaseRepository } from "./repository";

export class UserRepository extends BaseRepository<User> {
  constructor(arr:User[]) {
    super(arr);
  }
}
