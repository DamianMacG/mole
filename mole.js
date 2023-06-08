const https = require("node:https");
const fs = require("fs");

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

    response.on("end", () => {
      const parsedBody = JSON.parse(body);
      const people = parsedBody.people;
      const workers = people.filter(
        (work) => work.job.workplace === "northcoders"
      );
      // console.log(workers);
    });
  });

  request.end();
}

function getInterests() {
  const jsonData = fs.readFileSync("northcoders.json", "utf8");
  const data = JSON.parse(jsonData);
  const usernames = data.map((user) => user.username);

  for (let i = 0; i < usernames.length; i++) {
    const search = {
      host: "nc-leaks.herokuapp.com",
      path: `/api/people/${usernames[i]}/interests`,
      method: "GET",
    };
    const request = https.request(search, (response) => {
      let body = "";
      response.on("data", (packet) => {
        body += packet.toString();
      });
      response.on("end", () => {
        const parsedBody = JSON.parse(body);
        // console.log(parsedBody);
        const interests = parsedBody.person.interests
        console.log(interests)
      });
    });
    request.end();
  }
}

function getPets() {
  const search = {
    host: "nc-leaks.herokuapp.com",
    path: `/api/people/`,
    method: "GET",
  };
}

getInterests();
