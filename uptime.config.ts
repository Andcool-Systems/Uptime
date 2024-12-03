const pageConfig = {
  // Title for your status page
  title: "Andcool Services Status",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://andcool.ru', label: 'Website' },
    { link: 'https://github.com/Andcool-Systems', label: 'GitHub' }
  ],
}

const workerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
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
      timeout: 10000,
      // [OPTIONAL] headers to be sent
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'personal_new',
      name: 'New Personal Site',
      method: 'GET',
      target: 'https://new.andcool.ru',
      tooltip: 'My new personal website',
      statusPageLink: 'https://new.andcool.ru',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'fu',
      name: 'File Uploader Site',
      method: 'GET',
      target: 'https://fu.andcool.ru',
      tooltip: 'File Uploader',
      statusPageLink: 'https://fu.andcool.ru',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'fu_api',
      name: 'File Uploader API',
      method: 'GET',
      target: 'https://fu.andcool.ru/api',
      tooltip: 'File Uploader API',
      statusPageLink: 'https://fu.andcool.ru/api',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'pplbandage',
      name: 'PPLBandage Site',
      method: 'GET',
      target: 'https://pplbandage.ru',
      tooltip: 'PPLBandage Site',
      statusPageLink: 'https://pplbandage.ru',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'pplbandage_api',
      name: 'PPLBandage API',
      method: 'GET',
      target: 'https://pplbandage.ru/api/v1/ping',
      tooltip: 'PPLBandage API',
      statusPageLink: 'https://pplbandage.ru/api/v1',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'weather',
      name: 'Weather Widget Site',
      method: 'GET',
      target: 'https://weather.andcool.ru',
      tooltip: 'Weather Widget Site',
      statusPageLink: 'https://weather.andcool.ru',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'weather_api',
      name: 'Weather Widget API',
      method: 'GET',
      target: 'https://weather.andcool.ru/api',
      tooltip: 'Weather Widget API',
      statusPageLink: 'https://weather.andcool.ru/api',
      expectedCodes: [200, 400],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'activity',
      name: 'Andcool Activity API',
      method: 'GET',
      target: 'https://activity.andcool.ru',
      tooltip: 'Andcool Activity API',
      statusPageLink: 'https://activity.andcool.ru',
      expectedCodes: [200, 404],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    {
      id: 'mc-oauth-api',
      name: 'MC-OAuth API',
      method: 'GET',
      target: 'https://mc-oauth.andcool.ru/code',
      tooltip: 'MC-OAuth API',
      statusPageLink: 'https://mc-oauth.andcool.ru/code',
      expectedCodes: [200, 404],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare'
      },
    },
    // Example TCP Monitor
    {
      id: 'mc-oauth',
      name: 'MC-OAuth server',
      // `method` should be `TCP_PING` for tcp monitors
      method: 'TCP_PING',
      // `target` should be `host:port` for tcp monitors
      target: 'auth.mc-oauth.andcool.ru:25565',
      tooltip: 'MC-OAuth server',
      statusPageLink: 'https://mc-oauth.andcool.ru',
      timeout: 5000,
    },
  ],
  notification: {
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here

      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
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
    },
  },
}

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig }
