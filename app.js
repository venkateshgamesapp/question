const express = require('express');
const cors = require('cors');
const app = express();
const questions = require('./routes/questions');
const connectDB = require('./db/connect');
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// routes
app.use('/api/v1/questions',questions);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
