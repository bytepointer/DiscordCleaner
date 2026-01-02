import { request } from "../services/request.js"

let getAllData = async(data) => {

    let channels = await request("channels", {
        data
    })

    let guilds = await request("guilds", {
        data
    })

    channels = channels.map(c => ({ id: c.id, type: "channels" }))
    guilds = guilds.map(c => ({ id: c.id, type: "guilds"}))

    let totally = channels.concat(guilds);

    return totally;
}

export { getAllData }