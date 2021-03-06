import express from 'express';
import cors from 'cors';
import './initialize-db';
import authenticateRoute from './authenticate';
import routes from './routes';

let port = process.env.PORT || 4040;
let app = express();
const API_MAIN_ROUTE = '/.netlify/functions';

app.listen(port, console.log('Server listening to port', port));

app.use(cors(), express.urlencoded({ extended: true }), express.json());

app.use(API_MAIN_ROUTE, authenticateRoute);
app.use(API_MAIN_ROUTE, routes);
