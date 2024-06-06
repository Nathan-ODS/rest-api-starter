import express from 'express';
import apicache from "apicache";

import thingController from '../../controllers/thingController.js';

const router = express.Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/things:
 *   get:
 *     tags:
 *       - Things
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/', cache('2 minutes'), thingController.getAllThings);

router.get('/:thingId', cache('2 minutes'), thingController.getOneThing);

router.post('/', thingController.createNewThing);

router.patch('/:thingId', thingController.updateOneThing);

router.put('/:thingId', thingController.replaceOneThing);

router.delete('/:thingId', thingController.deleteOneThing);

export default router;