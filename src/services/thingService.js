import { v4 as uuid } from "uuid";
import Thing from "../database/Thing.js";

const getAllThings = () => {
  try {
    return Thing.getAllThings();
  } catch (error) {
    throw error; 
  }
};

const getOneThing = (thingId) => {
  try {
    return Thing.getOneThing(thingId);
  } catch (error) {
    throw error;
  }
};

const createNewThing = (newThing) => {
  const thingToInsert = {
    ...newThing,
    id: uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const createdThing = Thing.createNewThing(thingToInsert);

    return createdThing;
  } catch (error) {
    throw error;
  }
};

const updateOneThing = (thingId, changes) => {
  try {
    return Thing.updateOneThing(thingId, changes);
  } catch (error) {
    throw error;
  }
};

const replaceOneThing = (thingId, newThing) => {
  const thingToReplace = {
    ...newThing,
    id: thingId,
    updatedAt: new Date().toISOString(),
  };

  try {
    return Thing.replaceOneThing(thingId, newThing);
  } catch (error) {
    throw error;
  }
};

const deleteOneThing = (thingId) => {
  try {
    return Thing.deleteOneThing(thingId);
  } catch (error) {
    throw error;
  }
};

export default {
  getAllThings,
  getOneThing,
  createNewThing,
  updateOneThing,
  replaceOneThing,
  deleteOneThing,
};
