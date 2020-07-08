import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import unsafegames from './routes/unsafegames';
import unsafepublishers from './routes/unsafepublishers';
import games from './routes/games';
import authgames from './routes/authgames';
import users from './routes/users';
import auth from './routes/auth';

dotenv.config({
  path: path.join(__dirname, '.env')
});
const app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

// routes
app.use('/api/unsafegames', unsafegames);
app.use('/api/unsafepublishers', unsafepublishers);
app.use('/api/games', games);
app.use('/api/authgames', authgames);
app.use('/api/users', users);
app.use('/api/auth', auth);

mongodb.MongoClient.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?ssl=true&replicaSet=Bgshop-shard-0&authSource=admin&retryWrites=true&w=majority`,
  (err, db) => {
    if(err)
    {
        console.log(err);
    }
    app.set('db', db);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, './index.html'));
    });
    

    app.listen(80, () => console.log('Running on localhost:80'));
  }
);
