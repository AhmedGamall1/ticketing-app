// to fake a request to express application
import request from "supertest";
import { app } from "../../app.js";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "ahmed@gmail.com",
      password: "12345678",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "ahmedgmaicom",
      password: "12345678",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "ahmedgmaicom",
      password: "3",
    })
    .expect(400);
});

it("returns a 400 with missing email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "ahmed@gmail.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "12345555",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "ahmed@gmail.com",
      password: "12345555",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "ahmed@gmail.com",
      password: "12345555",
    })
    .expect(400);
});
