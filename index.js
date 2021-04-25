const player = require('play-sound')({ opts: {} });

const audio = player.play('./media/A3-220.0.mp3', (err) => {
  if (err) console.error(err);
});

setTimeout(() => audio.kill(), 2000);
