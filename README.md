# Practice-Express-Session

# Session이란?

- 세션은 특정 사용자로부터 들어오는 일련의 요청을 하나의 상태로 보고 그 상태를 일정하게 유지시키는 기술로 쿠키와 상당히 유사하지만,

- 쿠키는 사용자 정보 파일을 사용자 컴퓨터 메모리에 저장하는 것이고 세션은 사용자 정보 파일을 서버 측에서 관리한다는 차이점이 있다.

- Session은 웹 어플리케이션의 사용자가 접속하는 동안 매 요청마다 유지되는 데이터의 집합을 말한다. 세션은 웹 서버에 저장되어지며, 클라이언트에서 사용자를 식별하기 위해 쿠키 또는 기타 방식을 사용할 수 있다.

- Express에서는 Session 기능을 위해 미들웨어인 express-session을 사용할 수 있다. express-session 미들웨어를 사용하면 세션 데이터를 쉽게 관리할 수 있다.

# `express-session` 사용

```bash
> npm i express-session
```

```javascript
const session = require("express-session");

app.use(session({ secret: "secret" }));
```

- `session({})` 의 옵션
  - secret: 세션 ID 쿠키를 서명하는 데 사용되는 문자열입니다. 긴, 고유의, 추측할 수 없는 문자열을 사용하는 것이 좋습니다.
  - resave: 요청 중에 세션이 수정되지 않았더라도, 세션이 store에 저장되도록 강제합니다. 기본값은 true지만, false로 설정하면 성능이 향상될 수 있습니다.
  - saveUninitialized: "uninitialized" 상태인 세션이 store에 저장되도록 강제합니다. uninitialized 상태는 새로운 상태이지만 수정되지 않은 상태입니다. 기본값은 true입니다.
  - cookie: 세션 ID 쿠키의 옵션을 설정하는 객체입니다. maxAge, path, domain, secure, httpOnly 등의 옵션을 포함할 수 있습니다.
  - store: 세션 데이터를 저장하는 데 사용되는 세션 store 인스턴스입니다. Express는 메모리 store, 파일 store, MongoDB나 Redis 같은 타사 store 등 다양한 store 유형을 지원합니다.
  - genid: 새로운 세션 ID를 생성하는 함수. ID를 생성하는 데 사용자 정의 논리를 사용하려는 경우 유용합니다.
  - rolling: true로 설정하면, 요청마다 세션 쿠키의 수명을 연장합니다.
  - unset: "destroy"로 설정하면 클라이언트가 연결을 끊을 때 세션이 파괴됩니다. "keep"로 설정하면 데이터는 클라이언트가 연결을 끊어도 저장소에 유지됩니다.

<img width="326" alt="스크린샷 2023-02-07 오후 2 25 00" src="https://user-images.githubusercontent.com/103430498/217155930-799db354-341f-481c-be5a-8fb284a1a4cd.png">

- `connect.sid` Express session 쿠키의 이름 (connect.session id)

# `connect-flash`

> **flash**는 임시적으로 저장되는 메시지를 의미.
>
> - flash 메시지는 세션에 저장되어 다음 요청에서 사용 가능한 임시 메시지이다.
> - 주로, 리다이렉트 후에 사용자에게 표시되는 한번짜리 정보 또는 오류 메시지를 저장하는데 사용되는데, 예를 들어, 등록이 성공적으로 완료되었음을 나타내는 flash 메시지를 한 라우트에서 설정한 다음, 다른 라우트에서 flash 메시지를 사용자에게 표시할 수 있다.
> - 이것은 여러 요청 사이에서 사용자와 통신할 수 있도록 해줌으로써 유용합니다.

- connect-flash는 Express 프레임워크에서 플래시 메시지를 지원하는 미들웨어다.
- 플래시 메시지는 세션에 일회용 정보 또는 오류 메시지를 저장하는 방법입니다. 재전송 후에 사용자에게 표시된다.
  - 예를 들어, 등록 성공을 알리는 플래시 메시지를 한 경로에서 설정하고 다른 경로에서 플래시 메시지를 사용자에게 표시할 수 있다.
  - 이는 사용자와 여러 요청 사이에 소통할 수 있게 해준다.
- connect-flash는 Express 응용 프로그램에서 플래시 메시지를 쉽게 사용할 수 있도록 제공하기 때문에 사용된다.
- 기본 세션 저장소 메커니즘을 추상화하고 플래시 메시지 설정, 검색, 지우기를 위한 간단한 인터페이스를 제공합니다.

## 사용법

```bash
> npm i connect-flash
```

```javascript
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();

app.use(session({ secret: "secret_key" }));
app.use(flash());

app.get("/flash", (req, res) => {
  req.flash("success_msg", "This is a flash message");
  res.redirect("/");
});

app.get("/", (req, res) => {
  const success_msg = req.flash("success_msg");
  res.render("index", { success_msg });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
```

- 이 예제에서, connect-flash와 express-session 미들웨어가 불러와지고 "secret_key"를 키로 사용하여 사용된다.
- 그리고 두 개의 경로가 생성.
- 첫 번째 경로는 "success_msg" 키와 "This is a flash message" 값을 가진 flash 메시지를 설정.
- 두 번째 경로에서는 flash 메시지를 검색하여 사용자에게 표시될 뷰 템플릿에 전달.
- req.flash() 함수를 사용하여 flash 메시지를 가져옴.
- connect-flash 미들웨어를 사용하면 req.flash 함수를 통해 플래시 메시지를 추가하고, res.locals 객체를 통해 플래시 메시지에 접근할 수 있다.

### `res.locals`

```javascript
const express = require("express");
const flash = require("connect-flash");
const app = express();

app.use(flash());

app.post("/", (req, res) => {
  req.flash("success_msg", "메시지가 성공적으로 저장되었습니다.");
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.locals.success_message = req.flash("success_msg");
  res.render("index", { message: res.locals.success_message });
});
```

- require("express")로 Express 프레임워크와 require("connect-flash")로 connect-flash 미들웨어를 불러온다.
- app.use(flash())는 connect-flash 미들웨어를 적용시킨다.
- app.post("/", ...) 라우트는 HTTP POST 요청이 오면 req.flash("success_msg", "메시지가 성공적으로 저장되었습니다.")로 success_msg 플래시 메시지를 저장하고, res.redirect("/")로 응답을 전송한다.
- app.get("/", ...) 라우트는 HTTP GET 요청이 오면 req.flash("success_msg")로 success_msg 플래시 메시지를 가져오고, res.locals.success_message에 저장한다. 그리고 res.render("index", { message: res.locals.success_message })로 "index" 템플릿에 success_message를 렌더링한다.
