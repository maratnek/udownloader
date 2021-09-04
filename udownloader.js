const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg')
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
let index = 4;
module.exports = function download(url)
{
    const dir = './output';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const stream = ytdl(url, { filter: format => format.container === 'mp4' });
    // const stream = ytdl(`https://www.youtube.com/watch?v=imZ9D9HMftk&ab_channel=LongBeachFinest`)
    // .pipe(fs.createWriteStream('video.mp4'))
    // .pipe(ffmpeg);
    ffmpeg({ source: stream })
        .toFormat('mp3')
        .output(fs.createWriteStream(`output/audio_${Date.now()}.mp3`))
        .run();
}

