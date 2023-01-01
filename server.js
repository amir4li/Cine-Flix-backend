const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
const app = require('./app');


const DB = process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(DB, { useNewUrlParser: true })
.then(() => {console.log("DB connection successful!")});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

