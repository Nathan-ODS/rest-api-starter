import express from 'express';
import bodyParser from 'body-parser';

import v1ThingsRouter from './v1/routes/thingRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// uses body-parser to parse incoming JSON data from requests
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World, use /api/v1/things to continue');
});

app.use('/api/v1/things', v1ThingsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

