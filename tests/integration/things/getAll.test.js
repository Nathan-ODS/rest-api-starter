// Importer les dépendances nécessaires
import request from "supertest";
import app from "../../../src/index";
import Thing from "../../../src/database/Thing";

beforeEach(() => {
  jest.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
});

afterEach(() => {
  jest.restoreAllMocks(); // Restaure les fonctions originales après chaque test
});


it("gets all things successfully", async () => {
  const mockThings = [
    {
      name: "new Thing 2",
      color: "red",
      attributes: ["attribute1", "attribute2"],
      id: "a4e1002d-31b7-46a1-b7a9-c2015c927a9a",
      createdAt: "2024-05-12T15:56:57.830Z",
      updatedAt: "2024-05-12T15:56:57.830Z",
    },
    {
      name: "new Thing 1",
      color: "blue",
      attributes: ["attribute1", "attribute2"],
      id: "9d495962-8d8b-49b6-83e2-e04ad038ff0e",
      createdAt: "2024-05-15T18:58:03.511Z",
      updatedAt: "2024-05-15T18:58:03.511Z",
    },
  ];

  jest.spyOn(Thing, 'getAllThings').mockImplementationOnce(() => mockThings)

  const response = await request(app).get("/api/v1/things");

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      status: "OK",
      data: mockThings,
    })
  );
});

it("gets all things successfully when no things", async () => {
  jest.spyOn(Thing, 'getAllThings').mockImplementationOnce(() => [])

  const response = await request(app).get("/api/v1/things");

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      status: "OK",
      data: [],
    })
  );
});
