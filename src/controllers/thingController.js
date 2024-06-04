import thingService from "../services/thingService.js";

const getAllThings = (req, res) => {
  const { color } = req.query;
  try {
    const allThings = thingService.getAllThings({ color });
    res.status(200).send({ status: "OK", data: allThings });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const getOneThing = (req, res) => {
  const thingId = req.params.thingId;

  if (!thingId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter :thingId is required" },
    });
    return;
  }

  try {
    const thing = thingService.getOneThing(thingId);

    res.status(200).send({ status: "OK", data: thing });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const createNewThing = (req, res) => {
  const { body } = req;

  // required fields for creation
  // validation could be done using a library like express-validator
  if (!body.name || !body.attributes) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "One of the required fields is missing.",
      },
    });

    return;
  }

  const newThing = {
    name: body.name,
    attributes: body.attributes,
  };

  try {
    const createdThing = thingService.createNewThing(newThing);

    res.status(201).send({ status: "OK", data: createdThing });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneThing = (req, res) => {
  const thingId = req.params.thingId;

  if (!thingId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter :thingId is required" },
    });
    return;
  }

  const { body } = req;

  const updatedThing = thingService.updateOneThing(thingId, body);
  res.status(200).send({ status: "OK", data: updatedThing });
};

const replaceOneThing = (req, res) => {
  const thingId = req.params.thingId;

  if (!thingId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter :thingId is required" },
    });
    return;
  }

  const { body } = req;

  if (!body.name || !body.attributes) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "body does not have any property to update" },
      });
    return;
  }
  try {
    const replacedThing = thingService.replaceOneThing(thingId, body);

    res.status(200).send({ status: "OK", data: replacedThing });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneThing = (req, res) => {
  const thingId = req.params.thingId;

  if (!thingId) {
    res.status(400).send({ status: "FAILED", data: {error: 'Parameter :thingId is required'} });

    return;
  }

  try {
    thingService.deleteOneThing(thingId);

    res.status(204).send({ status: "OK" });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
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
