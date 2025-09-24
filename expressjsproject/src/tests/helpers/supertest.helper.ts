import { app } from '../../server';

import supertest from 'supertest';
import { singJWT } from '../../auth/util/jwt.util';
import { users } from '../../shared/data';

const admin = users[0]!;
//  generate token
const adminToken = singJWT({ id: admin.id, email: admin.email, role: admin.role });

const coach = users[1]!;
//  generate token
const coachToken = singJWT({ id: coach.id, email: coach.email, role: coach.role });

const student = users[2]!;
//  generate token
const studentToken = singJWT({ id: student.id, email: student.email, role: student.role });

export const unAuthedTestAgent = supertest.agent(app);

export const adminAuthedTestAgent = supertest
  .agent(app)
  .set('AUTHORIZATION', `Bearer ${adminToken}`);

export const coachAuthedTestAgent = supertest
  .agent(app)
  .set('AUTHORIZATION', `Bearer ${coachToken}`);

export const studentAuthedTestAgent = supertest
  .agent(app)
  .set('AUTHORIZATION', `Bearer ${studentToken}`);


