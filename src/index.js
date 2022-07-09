import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './routes/web';
import initApiRoute from './routes/api';
import bodyParser from 'body-parser';
const app = express();

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup viewEngine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initApiRoute(app);

require('dotenv').config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
