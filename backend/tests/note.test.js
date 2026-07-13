import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { jest } from "@jest/globals";
import app from "../app.js";

jest.setTimeout(30000);

let mongoServer;


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(
    mongoServer.getUri()
  );
});


afterAll(async () => {

  await mongoose.connection.close();

  if (mongoServer) {
    await mongoServer.stop();
  }

});

describe("Notes API", () => {


  test("should create a note", async () => {

    const response = await request(app)
      .post("/api/notes")
      .send({
        title: "My first note"
      });


    expect(response.statusCode)
      .toBe(201);


    expect(response.body.title)
      .toBe("My first note");

  });



  test("should get all notes", async () => {


    const response = await request(app)
      .get("/api/notes");


    expect(response.statusCode)
      .toBe(200);


    expect(Array.isArray(response.body))
      .toBe(true);

  });



  test("should get one note", async () => {


    const create = await request(app)
      .post("/api/notes")
      .send({
        title:"Testing"
      });


    const id = create.body._id;


    const response = await request(app)
      .get(`/api/notes/${id}`);


    expect(response.statusCode)
      .toBe(200);


    expect(response.body.title)
      .toBe("Testing");

  });



  test("should update a note", async () => {


    const create = await request(app)
      .post("/api/notes")
      .send({
        title:"Old title"
      });


    const id = create.body._id;


    const response = await request(app)
      .put(`/api/notes/${id}`)
      .send({
        title:"New title"
      });


    expect(response.statusCode)
      .toBe(200);


    expect(response.body.title)
      .toBe("New title");

  });



  test("should delete a note", async () => {


    const create = await request(app)
      .post("/api/notes")
      .send({
        title:"Delete me"
      });


    const id = create.body._id;


    const response = await request(app)
      .delete(`/api/notes/${id}`);


    expect(response.statusCode)
      .toBe(200);


    expect(response.body.message)
      .toBe("Note deleted");

  });


});