const http = require("http");

const PORT = 3000;
const targetObject = { a: "a", b: "b" };
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/home") {
    req.on("data", (data) => {
      console.log("data", data);
      const stringfiedData = data.toString();
      console.log("stringfiedData", stringfiedData);
      Object.assign(targetObject, JSON.parse(stringfiedData));
    });
  } else {
    // writeHead는 한 번만 호출되어야 하며 end()가 호출되기 전에 호출되어야한다
    // 상태 코드와 응답 헤더를 클라이언트에 보낸다.
    if (req.url === "/home") {
      res.writeHead(200, {
        // "Content-Type": "text/plain",
        // 텍스트가 아닌 객체로 보내려면
        "Content-Type": "application/json",
      });
      // 데이터가 로드 되었음을 서버에 알림
      // res.end("hello");
      res.end(JSON.stringify(targetObject));
    } else if (req.url === "/about") {
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<body>");
      res.write("<h1>About Page</h1>");

      res.write("</body>");
      res.write("</html>");
    } else {
      res.statusCode = 400;
      res.end();
    }
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
