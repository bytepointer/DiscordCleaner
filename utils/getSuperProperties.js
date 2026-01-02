import { randomUUID } from 'node:crypto';

let getSuperProperties = () => {

    let userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9198 Chrome/134.0.6998.205 Electron/35.3.0 Safari/537.36";

    //peguei essas propriedades do discord.js selfbot v13
    let properties = {
          os: 'Windows',
          browser: 'Discord Client',
          release_channel: 'stable',
          client_version: '1.0.9198',
          os_version: '10.0.19044',
          os_arch: 'x64',
          app_arch: 'x64',
          system_locale: 'en-US',
          has_client_mods: false,
          client_launch_id: randomUUID(),
          browser_user_agent: userAgent,
          browser_version: '35.3.0',
          os_sdk_version: '19044',
          client_build_number: 416613,
          native_build_number: 65625,
          client_event_source: null,
          client_app_state: 'focused',
          client_heartbeat_session_id: randomUUID(),
    }

    return Buffer.from(JSON.stringify(properties), 'utf-8').toString("base64");
}

export { getSuperProperties };