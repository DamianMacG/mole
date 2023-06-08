const https = require("node:https");

function getPeople() {
  const search = {
    host: "nc-leaks.herokuapp.com",
    path: "/api/people",
    method: "GET",
  };

  const request = https.request(search, (response) => {
    let body = "";
    response.on("data", (packet) => {
      body += packet.toString();
    });
    console.log(request);

    response.on("end", () => {
      const parsedBody = JSON.parse(body);
    });
  });
  request.end();
}

getPeople();
