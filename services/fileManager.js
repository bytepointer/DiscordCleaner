import fs from 'fs';

let read = (channelId) => {

    if(!channelId) return [];

    if(fs.existsSync(`channels/${channelId}.txt`)) {
         return JSON.parse(fs.readFileSync(`channels/${channelId}.txt`, 'utf8'))
    } else {
        return [];
    }
}

let write = (target, messages) => {

    if(!fs.existsSync("channels")) {
        fs.mkdirSync("channels");
    }

    fs.writeFileSync(`channels/${target}.txt`, JSON.stringify(messages), "utf-8")
}

export { read, write };