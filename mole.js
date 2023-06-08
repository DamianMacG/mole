const https = require("node:https");
const fs = require("fs");
const { type } = require("node:os");

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
      let data = JSON.stringify(workers, null, 2);
      fs.writeFileSync("northcoders.json", data);
    });
  });

  request.end();
}

function getInterests() {
  const jsonData = fs.readFileSync("northcoders.json", "utf8");
  const data = JSON.parse(jsonData);
  const usernames = data.map((user) => user.username);
  let array = [];
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
        array.push(parsedBody);
        fs.writeFileSync("interests.json", JSON.stringify(array, null, 2));
      });
    });
    request.end();
  }
}

function getPets() {
  const jsonData = fs.readFileSync("northcoders.json", "utf8");
  const data = JSON.parse(jsonData);
  const usernames = data.map((user) => user.username);
  let array = [];

  for (let i = 0; i < usernames.length; i++) {
    const search = {
      host: "nc-leaks.herokuapp.com",
      path: `/api/people/${usernames[i]}/pets`,
      method: "GET",
    };
    const request = https.request(search, (response) => {
      let body = "";
      response.on("data", (packet) => {
        body += packet.toString();
      });
      response.on("end", () => {
        const parsedBody = JSON.parse(body);
        if (parsedBody.status !== 404) {
          array.push(parsedBody);
        }
        const content = JSON.stringify(array, null, 2);
        fs.writeFileSync("pets.json", content);
      });
    });
    request.end();
  }
}

getPets();
getInterests();
getPeople();
