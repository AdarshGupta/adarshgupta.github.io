const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const directory = './assets/img/thumbnails';

fs.readdirSync(directory).forEach(file => {
    var outputFileName = path.parse(file).name + '.webp';

    sharp(`${directory}/${file}`)
    .resize({ width: 500 }) // width, height auto scale
    .webp()
    .toFile(`./assets/img/thumbnails-small/${outputFileName}`, (err, info) => {
        if(err){
            console.log(info);
            console.log(err);
        }
    });
});