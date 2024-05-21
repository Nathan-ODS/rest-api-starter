import fs from "fs";
import { saveToDatabase } from "./utils.js";

const DB = JSON.parse(fs.readFileSync("./src/database/db.json", "utf-8"));

const getAllThings = () => {
  try {
    return DB.things;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneThing = (thingId) => {
  try {
    const thing = DB.things.find((thing) => thing.id === thingId);
    if (!thing) {
      throw {status: 400, message: `Thing ${thingId} not found`};
    }
    
    return thing;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error};
  }
};

const createNewThing = (newThing) => {
  // for simplicity, no duplicates "name" allowed
  const isAlreadyInDB = !!DB.things.find(
    (thing) => thing.name === newThing.name
  );

  if (isAlreadyInDB) {
    throw { status: 400, message: `Thing with the name ${newThing.name} already exists` };
  }

  try {
    DB.things.push(newThing);
    saveToDatabase(DB);

    return newThing;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneThing = (thingId, changes) => {
  const thingToUpdateIndex = DB.things.findIndex(
    (thing) => thing.id === thingId);

  if (thingToUpdateIndex === -1) {
    throw { status: 400, message: `Thing ${thingId} not found`};
  };

  try {
    const thingToUpdate = DB.things[thingToUpdateIndex];

    const updatedThing = {
      ...thingToUpdate,
      ...changes,
      updatedAt: new Date().toISOString(),
    };

    DB.things[thingToUpdateIndex] = updatedThing;
    saveToDatabase(DB);

    return updatedThing;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error}
  }
};

const replaceOneThing = (thingId, newThing) => {
  const thingToReplaceIndex = DB.things.findIndex(
    (thing) => thing.id === thingId
  );

  if (thingToReplaceIndex === -1) {
    throw { status: 400, message: `Thing ${thingId} not found`};
  }
  try {
    DB.things[thingToReplaceIndex] = newThing;
    saveToDatabase(DB);
  
    return newThing;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error}
  }
};

const deleteOneThing = (thingId) => {
  const thingToDeleteIndex = DB.things.findIndex(
    (thing) => thing.id === thingId
  );

  if (thingToDeleteIndex === -1) {
    throw { status: 400, message: `Thing ${thingId} not found`};
  }

  try {
    DB.things.splice(thingToDeleteIndex, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error}
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
