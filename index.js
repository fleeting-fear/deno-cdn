//router from https://github.com/kwhitley/itty-router
const Router = (options = {}) =>
  new Proxy(options, {
    get: (obj, prop, receiver) => prop === 'handle'
      ? async (request, ...args) => {
          for (let [route, handlers] of obj.routes.filter(i => i[2] === request.method || i[2] === 'ALL')) {
            let match, response, url
            if (match = (url = new URL(request.url)).pathname.match(route)) {
              request.params = match.groups
              request.query = request.query || Object.fromEntries(url.searchParams.entries())

              for (let handler of handlers) {
                if ((response = await handler(request.proxy || request, ...args)) !== undefined) return response
              }
            }
          }
        }
      : (route, ...handlers) =>
          (obj.routes = obj.routes || []).push([
            `^${((obj.base || '') + route)
              .replace(/(\/?)\*/g, '($1.*)?')
              .replace(/\/$/, '')
              .replace(/:(\w+|\()(\?)?(\.)?/g, '$2(?<$1>[^/$3]+)$2$3')
              .replace(/\.(?=[\w(])/, '\\.')
            }\/*$`,
            handlers,
            prop.toUpperCase(),
          ]) && receiver
  })

const router = Router()

router.get("/", ()=> Response.redirect("https://github.com/Falentio/deno-cdn", 302))
router.get("/:repo/*",github)
router.all("*", ()=> new Response("not found", {status: 404}))

addEventListener("fetch",async event=>{
	event.respondWith(
		router.handle(event.request).catch(e=>new Response(e.message || "Something went wrong", {status: e.status || 500}))
	)
})

async function github(req){
	let a,b,c
	let headers = {
		"User-Agent": "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:0.9.9) Gecko/20020513",
		Authorization: `Token ${(a = req.query).token || a.t}` 
	}
	let file = (a = req.url.split(req.params.repo)[1].slice(1)).length > 0 ? ([b] = a.split("?"))[1] ? b : a : "mod.ts"
	let repo = (a = req.params.repo).includes("@") ? ([b,c] = a.split("@"))[0] : a
	let url = `https://api.github.com/repos/${USERNAME}/${repo}/contents/${file}${c && "?ref=" + c || ""}`
	const {download_url,documentation_url} = await fetch(url, {headers}).then(r=>r.json())
	if(documentation_url)return new Response("Not found", {status: 404})
	return fetch(download_url)
}