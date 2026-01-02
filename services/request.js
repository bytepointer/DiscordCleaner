import fetch from "node-fetch"
import { error } from "../utils/error.js";

let request = async(path, params) => {
    
    let offset = params?.offset;

    let userId = params.data?.user;
    let msgId = params.data?.message;
    let target = params.data?.target;
    let token = params.data?.token
    let type = params.data?.type
    let superProperties = params.data?.properties;
    
    let resposta;
    
   // let channelId = params.data?.channel || target;

    let content = { 
        me: {
            url: "https://discord.com/api/v9/users/@me",
            data: {
                "headers": {
                    "accept": "*/*",
                    "authorization": token,
                    "x-super-properties": superProperties,
                },
                "method": "GET"
            }
        },
        search: {
            url: `https://discord.com/api/v9/${type}/${target}/messages/search?author_id=${userId}&sort_by=timestamp&sort_order=desc&offset=${offset}`,
            data: {
                "headers": {
                    "accept": "*/*",
                    "authorization": token,
                    "x-super-properties": superProperties,
                },
                "method": "GET"
            }
        },
        delete: {
            url: `https://discord.com/api/v9/channels/${target}/messages/${msgId}`,
            data: {
                "headers": {
                    "accept": "*/*",
                    "authorization": token,
                    "x-super-properties": superProperties,
                },
                "method": "DELETE"
            }
        }, 
        channels: {
            url: `https://discord.com/api/v9/users/@me/channels`,
            data: {
                "headers": {
                    "accept": "*/*",
                    "authorization": token,
                    "x-super-properties": superProperties
                },
                "method": "GET"
            }
        },
        guilds: {
            url: `https://discord.com/api/v9/users/@me/guilds`,
            data: {
                "headers": {
                    "accept": "*/*",
                    "authorization": token,
                    "x-super-properties": superProperties
                }
            }
        }
    }

    let contVar = content[path];

    let requ = await fetch(contVar.url, contVar.data);

    if(requ.status == 401) {
        return error("A token está incorreta ou você não está no servidor!");
    }

    if(requ.status == 404) {
        return error("Servidor ou tipo inválido!");
    }

    if(requ.status == 200 || requ.status == 429 || requ.stauts == 204) {
        resposta = await requ.json();
    } else {
        return;
    }

    return resposta;
}

export { request };