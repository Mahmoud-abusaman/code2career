
import { adminAuthedTestAgent,unAuthedTestAgent } from "../../tests/helpers/supertest.helper";
import { User } from "../../user/user.intity";




describe('test course adding ', () => {
  it('GET /users/me with unauthed agent will throw error', async () => {
    const response = await unAuthedTestAgent.get('/users/me');
    expect(response.status).toBe(401);
  });


it('GET /users/me with authed admin student coach agent will pass and return user data', async () => {
    const response = await adminAuthedTestAgent.get('/users/me');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {user: expect.objectContaining<Partial<User>>({
        id: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
        role: expect.any(String)
      })}
    });
  });

});