import express from 'express';
import cors from 'cors';
import './initialize-db';
import authenticateRoute from './authenticate';
import routes from './routes';

let port = process.env.PORT || 4040;
let app = express();
const API_MAIN_ROUTE = process.env.NODE_ENV == 'production' ? '/.netlify/functions/' : '/App';

app.listen(port, console.log('Server listening to port', port));

app.use(cors(), express.urlencoded({ extended: true }), express.json());

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('index.html'));
  });
}

app.use(API_MAIN_ROUTE, authenticateRoute);
app.use(API_MAIN_ROUTE, routes);
