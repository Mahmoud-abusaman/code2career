import { users } from "../shared/data";
import { GenericRepository } from "../shared/generic.repository";
import { User } from "./user.intity";


 const userRepository = new GenericRepository<User>(users);
export default  userRepository;