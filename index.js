const fs  = require("fs");
const config = require("./config");
const htmlMethods = require("./createHtml");

const files = fs 
    .readdirSync(config.dev.inputdir)
    .map(file => file.slice(0, -3))
    .map(file => htmlMethods.createFile(file));

if (!fs.existsSync(config.dev.outputdir)) fs.mkdirSync(config.dev.outputdir);

htmlMethods.createFiles(files);
