const config = require("./config");
const fs  = require("fs");
const marked = require("marked");

const beautify_js = require('js-beautify'); 
const beautify_html = require('js-beautify').html;

// Wrap content in base HTML elements
const filehtml = data => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.path}</title>
</head>
<body>
    <main>
        ${data.body}
    </main>
</body>
</html> 
`;

const createFile = filePath => {
    const data = fs.readFileSync(`${config.dev.inputdir}/${filePath}.md`, "utf8");
    const content = {
        body: marked(data),
        path: filePath,
    }
    return content;
}

// console.log(files);

const createFiles = files =>{
    files.forEach(file => {
        fs.writeFile(
            `${config.dev.outputdir}/${file.path}.html`,
            beautify_html(filehtml(file)),
            e => {
                if (e) throw e;
                console.log(`${file.path}.html was created successfully`)
            }
        );
    });
};

module.exports = {
    createFile: createFile,
    createFiles: createFiles
}