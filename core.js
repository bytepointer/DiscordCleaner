import { deleteMessages } from "./services/deleteMessages.js";
import { getAllData } from "./utils/getAllData.js";
import { getMessages } from "./services/getMessages.js";
import { request } from "./services/request.js";


class core {

    constructor(values) {

        this.token = values.token;
        this.target = values.target;

        console.error(values.type);

        this.type = values.type;
        this.properties = values.properties;

        //VARIÁVEIS
    }

    async getMessages() {

        let messagesList = [];

        let userId = (await request("me", {
            data: {
                token: this.token,
                properties: this.properties
            }
        })).id;
        
        let completeData = {
                user: userId,
                token: this.token,
                target: this.target,
                type: this.type,
                properties: this.properties
        }

        const messages = await request("search", {
            offset: 0,
            data: {
                ...completeData
            }
        })

        //IN CASE OF HIGH DELETES;
        //if(messages.retry_after) return await this.getMessages();

        let messagesOffsets = Math.ceil(messages.total_results/messages.messages.length);
        
        for(let index = 0; index < messagesOffsets*25; index+=25) {

            let callrep = await getMessages(index, completeData);
            
            //console.log(callrep)
            //console.log(callrep.messages)
            messagesList = messagesList.concat(...callrep);
            //console.log(messages.messages.map(c => c[0].id))
            //messagesList.push(messages.messages.map(c => c[0].id));
        }

        return messagesList;
        
    }

    async deleteMessages(message, channel) {

        let sendValues = {
            token: this.token,
            message,
            properties: this.properties,
            target: channel || this.target
        }

        await deleteMessages(sendValues);
    }

    changeTarget(target, type) {
        this.target = target;
        this.type = type;
    }
}

export default core;
