// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import {nodeProfilingIntegration} from "@sentry/profiling-node";


Sentry.init({
  dsn: "https://6916f8842bb611520270e193dd9d4f45@o4509144680497152.ingest.us.sentry.io/4509144690786304",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  

  //tracesSampleRate: 1.0,

}); 

