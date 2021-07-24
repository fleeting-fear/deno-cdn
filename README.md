# Deno-CDN

Private CDN for Deno.  
With Accesbility to your private repos.  
Without Anxiety to be stealed.

>It was open source, so you know how your Repo Contents processed

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Falentio/deno-cdn)

## Installation
1. Click above button and then follow the given steps
2. Add USERNAME env to workers
3. Select your domain
4. Search Workers in domain menu
5. Set your routes

## Usage
```javascript
//import from your-repo-name/mod.ts
import * from "https://yourdomain.com/your-repo-name"
//import from your-repo-name/mod.ts in 2.0.0 realases
import * from "https://yourdomain.com/your-repo-name@2.0.0/"
//import from your-private-repo/mod.ts
//token query must be given, when not given it will return 404 Not Found
import * from "https://yourdomain.com/your-private-repos/?token=ghb_sjhsnnsnsnja"
//import specified file
//Example: import from your-repo-name/index.js
import * from "https://yourdomain.com/your-repo-name/index.js"
```