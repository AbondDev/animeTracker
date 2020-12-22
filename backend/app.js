if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const adminRoute = require('./routes/admin')

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './src/pages');

app.use(express.urlencoded({
  extended: false
}));

app.use('/static', express.static(path.join(`${__dirname}/public`)));

app.use('/', adminRoute)

const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
  console.log('Database Connected')
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
