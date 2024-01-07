import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router
  .get("/nqu/", (ctx) => {
    ctx.response.body = `<!DOCTYPE html><html><head><head>
        <body><a href='https://www.nqu.edu.tw/'>金門大學</a></body></html>`;
  })
  .get("/nqu/csie/", (ctx) => {
    ctx.response.body = `<!DOCTYPE html><html><head><head>
        <body><a href='https://csie.nqu.edu.tw/'>金門大學資工系</a></body></html>`;
  })
  .get("/to/nqu/", (ctx) => {
    ctx.response.redirect("https://www.nqu.edu.tw/");
  })
  .get("/to/nqu/csie/", (ctx) => {
    ctx.response.redirect("https://csie.nqu.edu.tw/");
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000');
await app.listen({ port: 8000 });