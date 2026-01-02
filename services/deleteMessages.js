import { sleep } from "../utils/sleep.js";
import { request } from "./request.js";

let deleteMessages = async(data) => {

    let firstValuerWait = Math.random()*(1500-500)+500;

    sleep(firstValuerWait);

    let deleteReply = await request("delete", {
        data
    })

    if(deleteReply?.retry_after) {
        let valeur = Math.random()*(10000-5000)+5000;

        console.log("trying again...");
        sleep(deleteReply.retry_after*valeur);
        return deleteMessages(data);
    }
}

export { deleteMessages }