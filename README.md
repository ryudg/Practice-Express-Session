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
