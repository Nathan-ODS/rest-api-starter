// Importer les dépendances nécessaires
import request from "supertest";
import app from "../../../src/index";
import Thing from "../../../src/database/Thing";

jest.mock('../../../src/database/Thing')

describe('GET api/v1/things', () => {
  describe('gets things successfully', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it("gets all things", async () => {
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
    
      Thing.getAllThings.mockReturnValue(mockThings)
    
      const response = await request(app).get("/api/v1/things");

      expect(Thing.getAllThings).toHaveBeenCalledTimes(1)
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          status: "OK",
          data: mockThings,
        })
      );
    });
    
    it("gets all things when no things", async () => {
      Thing.getAllThings.mockReturnValue([])
    
      const response = await request(app).get("/api/v1/things");
    
      expect(Thing.getAllThings).toHaveBeenCalledTimes(1)
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          status: "OK",
          data: [],
        })
      );
    });

    it("gets all things with filter", async () => {
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

      const filteredMock = mockThings.filter(thing => thing.color === 'red')

      Thing.getAllThings.mockReturnValue(filteredMock)

      const response = await request(app).get('/api/v1/things?color=red')

      expect(Thing.getAllThings).toHaveBeenCalledTimes(1)
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          status: "OK",
          data: filteredMock,
        })
      );
    })
  })

  describe('handles database error', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('throws network error', async () => {
      const databaseError = new Error('database error')

      Thing.getAllThings.mockImplementation(() => {
        throw databaseError
      })

      const response = await request(app).get('/api/v1/things')

      expect(Thing.getAllThings).toHaveBeenCalledTimes(1)
      expect(response.statusCode).toBe(500)
      expect(response.body).toEqual(
        expect.objectContaining({
          status: "FAILED",
          data: { error: databaseError.message }
        })
      )
    })
  })
})
