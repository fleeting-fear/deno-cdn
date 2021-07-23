addEventListener("fetch",async event=>{
	let res = await handler(event.request)
	event.respondWith(res)
})

async function handler(request){
	return Response.redirect("https://github.com/Falentio/deno-cdn")
}