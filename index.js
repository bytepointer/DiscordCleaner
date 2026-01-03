import core from "./core.js";
import { write, read } from "./services/fileManager.js";
import { getAllData } from "./utils/getAllData.js";
import { getSuperProperties } from "./utils/getSuperProperties.js";
import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//GLOBAL VARIABLES
let token;
let target;
let type;
let properties;

let saveMessages = false;

let typeConvertion = {
    "dm": "channels",
    "server": "guilds"
}

async function execute(softCore) {

    let messages = read(target);

    if(messages.length == 0) {
        messages = await softCore.getMessages()
        if(saveMessages) write(target, messages);
    }

    for(let msg of [...messages]) {

        if(saveMessages) {
            msg.pop();
            write(target, msg);
        }

        await softCore.deleteMessages(msg.id, msg.channel)
    }

    console.log(`Um total de ${messages.length} foram apagadas!`)
}

async function deleteAll() {
    let getAll = await getAllData({
        token,
        properties
    });

    let softCore = new core({
        token, properties
    })

    for(var i = 0; i < getAll.length; i++) {
        let selectionedData = getAll[i];
            
        target = selectionedData.id;
        type = selectionedData.type;
        
        softCore.changeTarget(target, type);

        await execute(softCore);

        //maybe a bad code optimization but temporarly it will be it, because will create multiple cores; [SOLVED]
            
        console.log(`${i}/${getAll.length} cleaned!`)
            
    }
}

async function callbackPrompt(promptType, res) {
   
    switch(promptType) {

        case "token":
            token = res;

            if(process.argv.includes("--all")) {
                return await deleteAll();
            }

            await prompt("type");
            break;
        case "type":

            if(Object.keys(typeConvertion).includes(res)) {

                type = typeConvertion[res];
                await prompt("channel")
            } else {
                await prompt("type")
            }
            break;
        case "channel":
            if(res.split("").every(c => !isNaN(c))) {
                target = res;

                let softCore = new core({
                    token, target, type, properties
                })

                await execute(softCore)
            } else {
                await prompt("channel")
            }
            break;
    }

    return;
}

async function prompt(question) {

    let questions = {
        token: "Qual a sua token?",
        type: "Qual o tipo de canal? [dm/server]",
        channel: "Qual o id do servidor/dm?"
    }

    rl.question(questions[question], (res) => callbackPrompt(question, res));
}

(async() => {

    properties = getSuperProperties();

    if(process.argv.includes("--save")) {
        saveMessages = true;
    }
    
    await prompt("token");

})()
