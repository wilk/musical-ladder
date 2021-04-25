const player = require('play-sound')({ opts: {} });
const http = require('http');

let audio = null;
let currentAudioFile = '';

const requestHandler = (req, res) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === 'POST') {
    if (req.url.startsWith('/on')) {
      const distance = parseInt(req.url.replace('/on/', ''), 10);
      let audioFile = 'A4-440.0.mp3';
      if (distance > 20 && distance < 40) {
        audioFile = 'B4-493.88.mp3';
      } else if (distance > 20 && distance < 40) {
        audioFile = 'C4-261.63.mp3';
      } else if (distance > 40 && distance < 60) {
        audioFile = 'D4-293.66.mp3';
      } else if (distance > 60 && distance < 80) {
        audioFile = 'E4-329.63.mp3';
      } else if (distance > 80 && distance < 100) {
        audioFile = 'F4-349.23.mp3';
      }
      console.log('ON', distance);

      if (currentAudioFile !== audioFile) {
        audio && audio.kill();
        audio = player.play(`./media/${audioFile}`, (err) => {
          if (err) console.error(err);
        });
      }
      
      res.writeHead(200);
      res.end();
      return;
    } else if (req.url.startsWith('/off')) {
      console.log('OFF');
      audio.kill();
      audio = null;

      res.writeHead(200);
      res.end();
      return;
    }
  }

  res.writeHead(404);
  res.end();
};

const server = http.createServer(requestHandler);
server.listen(5000, () => console.log('listening on port 5000'));


/*
app.post('/on/:distance', (req, res) => {
  const distance = parseInt(req.params.distance, 10);

  console.log('ON', distance);

  audio && audio.kill();
  audio = player.play('./media/A3-220.0.mp3', (err) => {
    if (err) console.error(err);
  });

  res.end();
});

app.post('/off', (req, res) => {
  console.log('OFF');
  audio.kill();
  res.end();
});

app.listen(5000, () => console.log('listening on port 5000'));
*/
