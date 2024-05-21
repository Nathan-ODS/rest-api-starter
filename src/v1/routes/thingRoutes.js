import express from 'express';
import thingController from '../../controllers/thingController.js';

const router = express.Router();

router.get('/', thingController.getAllThings);

router.get('/:thingId', thingController.getOneThing);

router.post('/', thingController.createNewThing);

router.patch('/:thingId', thingController.updateOneThing);

router.put('/:thingId', thingController.replaceOneThing);

router.delete('/:thingId', thingController.deleteOneThing);

export default router;