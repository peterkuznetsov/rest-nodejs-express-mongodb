const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

dotenv.config();


const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
};
mongoose.connect(process.env.DB_CONNECTION, options).then(
	() => { console.log('Connected to DB!') },
	err => { console.log('Failed to connect to DB!') }
);

app.use(express.json());

app.use('/posts', postsRouter);
app.use('/user', authRouter);


app.listen(3000, () => console.log('Server Up and running'));