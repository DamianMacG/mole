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

    response.on("end", () => {
      const parsedBody = JSON.parse(body);
      console.log(parsedBody.job);
      const people = parsedBody.people;
      const workers = people.filter(
        (work) => work.job.workplace === "northcoders"
      );
      console.log(workers);
    });
  });
  request.end();
}

getPeople();

// Haz Mallion
// Paul Copley
// Sam Caine
// Vel Georgieva
// Sarah Browncross
// Liam Duncan
// Ant Medina
// Lucy Galway
// Paul Rogerson
// Ruth Ng
// Amy Wild
// David Bartlett
