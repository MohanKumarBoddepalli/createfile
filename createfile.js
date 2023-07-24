const express = require('express');
const bodyParse = require("body-parser");
const fs = require('fs')
const readline = require('readline');
const { create } = require('domain');
let arr = []
const path = require('path');
const fse = require('fs-extra');

async function processLineByLine() {
    const fileStream = fs.createReadStream('filen.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        arr.push(line)
        console.log(line)
    }
}

const app = express();
app.use(bodyParse.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    res.sendFile(path.resolve('login.html'));
});
app.post('/welcome', async (req, res) => {
    await processLineByLine();
    for (let i = 0; i <= arr.length - 1; i++) {
        let content = eval('`' + req.body.content + '`')
        //    await fs.createWriteStream(`mwl${(from which number to start)+1}.bat`,`${content}\n`);
        fse.outputFileSync(`${req.body.filename}/mwl${parseInt(req.body.value) + i}.bat`, `${content}\n`);
        console.log(`createfile${i}`)
        if (i == arr.length - 1) {
            res.send(`'successfully created file`)
        }
    }
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})
