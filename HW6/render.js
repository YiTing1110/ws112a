export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
        }
    
        h1 {
          font-size: 2em;
        }
    
        h2 {
          font-size: 1.2em;
        }
    
        #posts {
          margin: 0;
          padding: 0;
        }
    
        #posts li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #posts li:last-child {
          border-bottom: none;
        }
    
        textarea {
          width: 500px;
          height: 300px;
        }
    
        input[type=text],input[type=password],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
        }
    
        input[type=text],input[type=password] {
          width: 500px;
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
}

export function loginUi() {
return layout('Login', `
<h1>登入</h1>
<form action="/login" method="post">
    <p><input type="text" placeholder="username" name="username"></p>
    <p><input type="password" placeholder="password" name="password"></p>
    <p><input type="submit" value="Login"></p>
    <p>尚未註冊? <a href="/signup">創建帳號</p>
</form>
`)
}

export function signupUi() {
return layout('Signup', `
<h1>註冊</h1>
<form action="/signup" method="post">
    <p><input type="text" placeholder="username" name="username"></p>
    <p><input type="password" placeholder="password" name="password"></p>
    <p><input type="submit" value="Signup"></p>
</form>
`)
}

export function success() {
return layout('Success', `
<h1>註冊成功!</h1>
你可以 <a href="/">查看所有聯絡人</a> 或 <a href="/login">登入</a> !
`)
}

export function fail() {
    return layout('Fail', `
    <h1>登入失敗!</h1>
    你可以 <a href="/">查看所有聯絡人</a> 或 <a href="JavaScript:window.history.back()">回上一頁</a> !
    `)
}

export function list(posts, user) {
    console.log('list: user=', user)
    let list = []
    for (let post of posts) {
        list.push(`
        <li>
        <h2>${ post.title } -- by ${post.username}</h2>
        <p><a href="/post/${post.id}">查看</a></p>
        </li>
        `)
    }
    let content = `
    <h1>通訊錄</h1>
    <p>${(user==null)?'<a href="/login">登入</a> 以新增聯絡人':'歡迎 '+user.username+', 你可以 <a href="/post/new">新增聯絡人</a> 或 <a href="/logout">登出</a> !'}</p>
    <p>你有 <strong>${posts.length}</strong> 個聯絡人!</p>
    <ul id="posts">
        ${list.join('\n')}
    </ul>
    `
    return layout('通訊錄', content)
}

export function newPost() {
    return layout('新增聯絡人', `
    <h1>新增聯絡人</h1>
    <p>創建新聯絡資訊</p>
    <form action="/post" method="post">
        <p><input type="text" placeholder="Title" name="title"></p>
        <p><textarea placeholder="Contents" name="body"></textarea></p>
        <p><input type="submit" value="Create"></p>
    </form>
    `)
}

export function show(post) {
    return layout(post.title, `
        <h1>${post.title} -- by ${post.username}</h1>
        <p>${post.body}</p>
    `)
}