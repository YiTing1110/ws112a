import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
 
const user = new Map();
user.set("abc", {id: "abc", password: "123"});
user.set("def", {id: "def", password: "456"});

const router = new Router();
router
    .get("/user", (ctx) => {
        ctx.response.body = Array.from(user.values());
    })
    .get("/user/signUp", (ctx) => {
        let params = ctx.request.url.searchParams
        let id = params.get('id')
        let password = params.get('password')
        console.log(user.get(id))
        if (user.get(id)) {
            ctx.response.body = `id=${id} 已經存在！`
        }
        else {
            user.set(id, {id, password})
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>註冊成功</p><a href="/Login.html">登入 (Login)</a>`
        }
    })
    .get("/user/Login", (ctx) => {
        let params = ctx.request.url.searchParams
        let id = params.get('id')
        let password = params.get('password')
        console.log(user.get(id))
        if (user.get(id)) {
            let userPassword = user.get(id).password;
            if (userPassword == password) {
                ctx.response.body = '登入成功'
            }
            else {
                ctx.response.body = '登入失敗，請檢查帳號密碼是否正確'
            }
        }
        else {
            ctx.response.body = '登入失敗，請檢查帳號密碼是否正確'
        }
    })
    .get("/(.*)", async (ctx) => {
        let wpath = ctx.params[0]
        console.log('wpath=', wpath)
        await send(ctx, wpath, {
            root: Deno.cwd()+"/",
            index: "index.html",
        })
    })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000');
await app.listen({ port: 8000 });