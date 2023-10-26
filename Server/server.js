const dotenv = require('dotenv');
const { Server } = require('socket.io');
const app = require('./app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
const io = new Server(server);

io.on('connection', function(socket) {
  console.log('Connected to socket Successfully');
  setInterval(function() {
    const news = getNews();
    socket.emit('news', news);
  }, 5000);
  socket.on('my other event', function(data) {
    console.log(data);
  });
});

function getNews() {
  const length = Math.floor(Math.random() * 21);
  const news = [];
  for (let i = 0; i < length; i++) {
    const val = { id: i, title: 'The cure of the sadness is to pi' };
    news.push(val);
  }
  return news;
}
