const pageConfig = {
    // Title for your status page
    title: 'Andcool Services Status',
    // Links shown at the header of your status page, could set `highlight` to `true`
    links: [
        { link: 'https://andcool.ru', label: 'Website' },
        { link: 'https://github.com/Andcool-Systems', label: 'GitHub' }
    ]
};

const workerConfig = {
    // Write KV at most every 10 minutes unless the status changed
    kvWriteCooldownMinutes: 10,
    // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
    // passwordProtection: 'username:password',
    // Define all your monitors here
    monitors: [
        // Example HTTP Monitor
        {
            // `id` should be unique, history will be kept if the `id` remains constant
            id: 'personal_old',
            // `name` is used at status page and callback message
            name: 'Personal Site',
            // `method` should be a valid HTTP Method
            method: 'GET',
            // `target` is a valid URL
            target: 'https://andcool.ru',
            // [OPTIONAL] `tooltip` is ONLY used at status page to show a tooltip
            tooltip: 'My main personal website',
            // [OPTIONAL] `statusPageLink` is ONLY used for clickable link at status page
            statusPageLink: 'https://andcool.ru',
            // [OPTIONAL] `expectedCodes` is an array of acceptable HTTP response codes, if not specified, default to 2xx
            expectedCodes: [200],
            // [OPTIONAL] `timeout` in millisecond, if not specified, default to 10000
            timeout: 30000,
            // [OPTIONAL] headers to be sent
            headers: {
                'User-Agent': 'Uptimeflare'
            }
        },
        {
            id: 'pplbandage',
            name: 'PPLBandage Site',
            method: 'GET',
            target: 'https://pplbandage.ru/users',
            tooltip: 'PPLBandage Site',
            statusPageLink: 'https://pplbandage.ru',
            expectedCodes: [200, 307],
            timeout: 30000,
            headers: {
                'User-Agent': 'Uptimeflare'
            }
        },
        {
            id: 'pplbandage_api',
            name: 'PPLBandage API',
            method: 'GET',
            target: 'https://pplbandage.ru/api/v1/ping',
            tooltip: 'PPLBandage API',
            statusPageLink: 'https://pplbandage.ru/api/v1',
            expectedCodes: [200],
            timeout: 30000,
            headers: {
                'User-Agent': 'Uptimeflare'
            }
        },
        {
            id: 'pplbandage_api_discord',
            name: 'PPLBandage Discord Proxy',
            method: 'GET',
            target: 'https://pplbandage.ru/api/v1/ping/discord',
            tooltip: 'Proxy for Discord API and CDN',
            statusPageLink: 'https://pplbandage.ru/api/v1/discord',
            expectedCodes: [200, 429],
            timeout: 30000,
            headers: {
                'User-Agent': 'Uptimeflare'
            }
        },
        {
            id: 'pepsi_site',
            name: 'PEPSI Site',
            method: 'GET',
            target: 'https://pepsi.andcool.ru',
            tooltip: 'PEPSI Site',
            statusPageLink: 'https://pepsi.andcool.ru',
            expectedCodes: [200],
            timeout: 30000,
            headers: {}
        },
        {
            id: 'fu',
            name: 'File Uploader (fu) site',
            method: 'GET',
            target: 'https://fu.andcool.me',
            tooltip: 'Public file sharing service',
            statusPageLink: 'https://fu.andcool.me',
            expectedCodes: [200],
            timeout: 30000,
            headers: {}
        },
        {
            id: 'fu_api',
            name: 'File Uploader (fu) API',
            method: 'GET',
            target: 'https://fu.andcool.me/api',
            tooltip: 'Public file sharing service API',
            statusPageLink: 'https://fu.andcool.me/api',
            expectedCodes: [200],
            timeout: 30000,
            headers: {}
        },
        {
            id: 'json_stats',
            name: 'JSON Stats Widget',
            method: 'GET',
            target: 'https://json-stats.andcool.ru',
            tooltip: 'JSON Stats Widget',
            statusPageLink: 'https://github.com/Andcool-Systems/json-stats',
            expectedCodes: [200],
            timeout: 30000,
            headers: {
                'User-Agent': 'Uptimeflare'
            }
        },
        {
            id: 'activity',
            name: 'Andcool Activity API',
            method: 'GET',
            target: 'https://activity.andcool.ru',
            tooltip: 'Andcool Activity API',
            statusPageLink: 'https://activity.andcool.ru',
            expectedCodes: [200, 404],
            timeout: 30000,
            headers: {
                'User-Agent': 'Uptimeflare'
            }
        },
        {
            id: 'mc-oauth-api',
            name: 'MC-OAuth API',
            method: 'GET',
            target: 'https://mc-oauth.andcool.ru/code',
            tooltip: 'MC-OAuth API',
            statusPageLink: 'https://mc-oauth.andcool.ru/code',
            expectedCodes: [200, 404],
            timeout: 30000,
            headers: {
                'User-Agent': 'Uptimeflare'
            }
        },
        {
            id: 'when_ppl',
            name: 'Когда Пепеленд?',
            method: 'GET',
            target: 'https://xn--80afdbeaa8aovdpb.xn--p1ai',
            tooltip: 'Когда Пепеленд?',
            statusPageLink: 'https://xn--80afdbeaa8aovdpb.xn--p1ai',
            expectedCodes: [200],
            timeout: 30000,
            headers: {
                'User-Agent': 'Uptimeflare'
            }
        }
    ],
    notification: {},
    callbacks: {
        onStatusChange: async (
            env: any,
            monitor: any,
            isUp: boolean,
            timeIncidentStart: number,
            timeNow: number,
            reason: string
        ) => {
            const downtimeDuration = Math.round(
                (timeNow - timeIncidentStart) / 60
            );

            let message: string;
            if (isUp) {
                message =
                    `✅ *${monitor.name}* is up!\n` +
                    `The service is up again after being down for *${downtimeDuration} minutes.*`;
            } else {
                message =
                    `🔴 *${monitor.name}* is currently down.\n` +
                    `Service is unavailable. *Issue:* ${
                        reason || 'unspecified'
                    }`;
            }

            await fetch(
                `https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: '1197005557',
                        text: message,
                        parse_mode: 'Markdown'
                    })
                }
            );
        },
        onIncident: async (
            env: any,
            monitor: any,
            timeIncidentStart: number,
            timeNow: number,
            reason: string
        ) => {
            // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
            // Write any Typescript code here
        }
    }
};

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig };
