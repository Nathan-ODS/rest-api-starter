import express from 'express';
import bodyParser from 'body-parser';
import v1ThingsRouter from './v1/routes/thingRoutes.js';

const app = express();

// uses body-parser to parse incoming JSON data from requests
app.use(bodyParser.json());
app.use('/api/v1/things', v1ThingsRouter);

export default app;
