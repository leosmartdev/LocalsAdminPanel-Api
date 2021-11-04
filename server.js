const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
dotenv.config();
connectDB();

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const auth = require('./routes/auth');
const user = require('./routes/user');
const analytics = require('./routes/analytics');
const prohibitedwords = require('./routes/prohibatedwords');
const blocklimitedwords = require('./routes/blocklimitedwords');
const chat = require('./routes/chat');
const pages = require('./routes/pages');
  
app.use('/api/v1/analytics', analytics);
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/prohibited-words', prohibitedwords);
app.use('/api/v1/block-limited-words', blocklimitedwords);
app.use('/api/v1/pages', pages);
app.use('/api/v1/chat', chat);
app.use(errorHandler);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`Listening *: ${port}`));

// Handle unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
