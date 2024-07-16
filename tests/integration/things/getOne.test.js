import request from "supertest";
import app from "../../../src/index";
import Thing from "../../../src/database/Thing";

jest.mock('../../../src/database/Thing')

describe('GET api/v1/thing/:thingId - get one thing', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("gets one thing successfully", async () => {
    const mockThing = {
      name: "new Thing 1",
      color: "blue",
      attributes: ["attribute1", "attribute2"],
      id: "9d495962-8d8b-49b6-83e2-e04ad038ff0e",
      createdAt: "2024-05-15T18:58:03.511Z",
      updatedAt: "2024-05-15T18:58:03.511Z",
    };

    Thing.getOneThing.mockReturnValue(mockThing);

    const response = await request(app).get(`/api/v1/things/${mockThing.id}`);

    expect(Thing.getOneThing).toHaveBeenCalledWith(mockThing.id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "OK",
        data: mockThing
      })
    )
  });

  it("handles missing param thingId by retrieving all things", async () => {
    await request(app).get('/api/v1/things/')

    expect(Thing.getAllThings).toHaveBeenCalledTimes(1)
  })

  it('handles when no thing is found with thingId', async () => {
    const unknownId = 'unknownId'
    const notFoundError = {status: 400, message: `Thing ${unknownId} not found`};

    Thing.getOneThing.mockImplementation(() => {
      throw notFoundError
    })

    const response = await request(app).get(`/api/v1/things/${unknownId}`)

    expect(Thing.getOneThing).toHaveBeenCalledWith(unknownId);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "FAILED",
        data: {error: notFoundError.message}
      })
    )
    
  })

  it('handles database error', async () => {
    const databaseError = new Error('internal error')
    Thing.getOneThing.mockImplementation(() => {
      throw databaseError
    })

    const response = await request(app).get('/api/v1/things/123')

    expect(Thing.getOneThing).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(500)
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "FAILED",
        data: { error: databaseError.message }
      })
    )
  })
});
