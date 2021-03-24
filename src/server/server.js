import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

let port = 4040;
let app = express();

app.listen(port, console.log('Server listening to port', port));

app.get('/', (req, res) => {
  res.send('Hi Daniel Stern :D');
});
