const http = require("http");

const PORT = 5000;

const ip = "localhost";

const server = http.createServer((request, response) => {
  console.log(
    `http request method is ${request.method}, url is ${request.url}`
  );
  if (request.method === "POST") {
    if (request.url === "/upper") {
      let data = "";
      request
        .on("data", (chunk) => {
          data = data + chunk;
          // console.log("data :", data);
        })
        .on("end", () => {
          // data = data.toUpperCase();
          response.writeHead(200, defaultCorsHeader);
          response.end(data.toUpperCase());
        });
    } else if (request.url === "/lower") {
      let data = "";
      request
        .on("data", (chunk) => {
          data = chunk + data;
        })
        .on("end", () => {
          response.writeHead(200, defaultCorsHeader);
          response.end(data.toLowerCase());
          console.log("seda");
        });
    }
  }
  if (request.method === "OPTIONS") {
    response.writeHead(200, defaultCorsHeader);
    response.end();
  }
});
//  dd
server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

// dd
const defaultCorsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": 10,
};
