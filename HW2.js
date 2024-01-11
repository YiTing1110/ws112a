import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const room = new Map();
room.set("e319", {laboratory: "E319 數位系統應用實驗室 Digital System Laboratory"});
room.set("e320", {laboratory: "E320 多媒體實驗室 Multimedia Laboratory"});
room.set("e321", {laboratory: "E321 電腦網路實驗室 Computer Network Laboratory"});
room.set("e322", {laboratory: "E322 嵌入式實驗室 Embedded Laboratory"});

const router = new Router();
router
  .get("/nqu", (ctx) => {
    ctx.response.body = `<!DOCTYPE html><html><head><head>
        <body><a href='https://www.nqu.edu.tw/'>金門大學</a></body></html>`;
  })
  .get("/nqu/csie", (ctx) => {
    ctx.response.body = `<!DOCTYPE html><html><head><head>
        <body><a href='https://csie.nqu.edu.tw/'>金門大學資工系</a></body></html>`;
  })
  .get("/to/nqu", (ctx) => {
    ctx.response.redirect("https://www.nqu.edu.tw/");
  })
  .get("/to/nqu/csie", (ctx) => {
    ctx.response.redirect("https://csie.nqu.edu.tw/");
  })
  .get("/room/:id", (ctx) => {
    if (ctx.params && ctx.params.id && room.has(ctx.params.id)) {
      ctx.response.body = room.get(ctx.params.id);
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000');
await app.listen({ port: 8000 });