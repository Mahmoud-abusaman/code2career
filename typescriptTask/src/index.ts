import { BookingRepository } from "./Booking.repository";
import { CourseRepository } from "./course.repository";

import { UserRepository } from "./user.repository";

async function test() {
  
    const userRepository=new UserRepository([
      { id: 1, name: "dd", email: "dd@dd.com" },
      { id: 2, name: "vv", email: "vv@vv.com" },
    ]);

    const courseRepository=new  CourseRepository([
      { id: 1, title: "course1", description: "course1" },
      { id: 2, title: "course2", description: "course2" },
    ]);

    const bookingRepository=new  BookingRepository([
         { id: 1, userId: 1, courseId: 1, date: "2025-07-01" },
      { id: 2, userId: 2, courseId: 2, date: "2025-07-02" },

    ]);
    console.log("################################################");


    console.log(`all users here:`,await userRepository.getAll())
    console.log(await userRepository.getById(2))
    await userRepository.delete(2)
    console.log(await userRepository.find({id:2}))
    console.log(`all users here:`,await userRepository.getAll())


    console.log("################################################");
    

    console.log(`all users here:`,await courseRepository.getAll())
    console.log(await courseRepository.getById(2))
    await courseRepository.delete(2)
    console.log(await courseRepository.find({id:2}))
    console.log(`all users here:`,await courseRepository.getAll())


    console.log("################################################");
    console.log(`all users here:`,await bookingRepository.getAll())
    console.log(await bookingRepository.getById(2))
    await bookingRepository.delete(2)
    console.log(await bookingRepository.find({id:2}))
    console.log(`all users here:`,await bookingRepository.getAll())
    console.log("################################################");


}
test()