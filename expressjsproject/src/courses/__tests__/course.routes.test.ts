import { adminAuthedTestAgent, unAuthedTestAgent } from "../../tests/helpers/supertest.helper";
import Course from "../course.entity";





describe('test course module ', () => {
    it("GET /courses",async ()=>{
        const response = await unAuthedTestAgent.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            data: { courses: [] }
        });
    });

    it("POST /courses with unauthed agent will throw error",async ()=>{
        const response = await unAuthedTestAgent.post('/courses');
        expect(response.status).toBe(401);
    });
    it("POST /courses with admin authed agent will create course",async ()=>{
        const newCourse={title:"fdfff",description:"ffdfd dsdjnfhdjfhdf"}

        const response = await adminAuthedTestAgent.post('/courses').send(newCourse);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            success: true,
            data: {
                course:expect.objectContaining<Partial<Course>>({
                    id:expect.any(String),
                    title:newCourse.title,
                    description:newCourse.description
                })
            }
        });
    });

});