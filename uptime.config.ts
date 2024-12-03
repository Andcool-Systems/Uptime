const pageConfig = {
  // Title for your status page
  title: "Andcool Services Uptime",
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
