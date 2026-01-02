import { sleep } from "../utils/sleep.js";
import { request } from "./request.js";

let getMessages = async(index, data) => {

    //VALUE TO BE RETURNED

    let retorno = []
    let firstValuerWait = Math.random()*(1000-500)+500;

    //RANDOM VALUE INSIDE 1000-500 RISED BY 500

    sleep(firstValuerWait);

     let search = await request("search", {
            offset: index,
            data
        });
    
    if(search.retry_after) {

        let valeur = Math.random()*(2000-1000)+1000;
        
        console.log("Trying again...")
        sleep(search.retry_after*valeur);
        

        return await getMessages(index, data)
    }

    if(data.type == "guilds") {
        search.messages.forEach(c => retorno.push({ id: c[0].id, channel: c[0].channel_id }))
    } else {
        search.messages.forEach(c => retorno.push({ id: c[0].id }))
    }

    return retorno;
}

export { getMessages }