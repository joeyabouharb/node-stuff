const Event = require('events');
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const url = require('url');
const fetch = require('node-fetch');

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || '127.0.0.1';
class Controller extends Event {}
const route = new Controller();
const routes = ['/', '/users', '/all-users', '/distance', '/companies'];
route.once('newListener', (event, listener) => {
  if (!event === 'event') {
    // Insert a new listener in front
    });
  }
});
const getBody = async (req) => new Promise((resolve, reject) => {
  const body = [];
  req.on('data', async (chunk) => {
    body.push(chunk);
    reject(new Error('Request too big!'));
  });
  req.on('end', async () => {
    try {
      const form = JSON.parse(Buffer.concat(body));
      resolve(form);
    } catch (err) {
      reject(err);
    }
  });
});

const fetchStudents = (args = '') => (
  fetch(`https://jsonplaceholder.typicode.com/users/${args}`)
    .then((data) => data.json())
    .then((response) => response)
);

const queryByName = (response, name, id) => {
  const query = new RegExp(`.*(?=${name.toLowerCase()}).*`);
  return name && !id
    ? response.filter((user) => query.test(user.name.toLowerCase()))
    : response;
};

const randomPerson = (response) => {
  const random = Math.floor(Math.random() * response.length);
  return response[random];
};

route.on('/users', async (req, res, { id, name = '' }) => {
  res.statusCode = 200;
  if (req.method === 'GET') {
    fetchStudents(id || '')
      .then((response) => queryByName(response, name, id))
      .then((response) => {
        res.end(JSON.stringify(response));
      });
  } else if (req.method === 'POST') {
    getBody(req)
      .then((data) => {
        fs.writeFileSync('students.json', JSON.stringify(data));
        res.end('successfully saved data');
        res.statusCode = 201;
      })
      .catch((err) => {
        console.log(err);
        res.end('malformed JSON submission');
        res.statusCode = 401;
      });
  }
});

route.on('/', (req, res) => {
  res.statusCode = 200;
  fetchStudents()
    .then((response) => randomPerson(response))
    .then((selected) => {
      res.end(JSON.stringify(selected));
    });
});

const readData = (filename) => {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
};

route.on('/all-users', (req, res) => {
  res.statusCode = 200;
  fetchStudents()
    .then((response) => {
      const data = readData('students.json');
      response.push(data);
      res.end(JSON.stringify({ ...response }));
    });
});

route.on('/companies', async (req, res) => {
  res.statusCode = 200;
  fetchStudents().then((response) => {
    const companies = response.map((user) => user.company);
    res.end(JSON.stringify(companies));
  });
});

route.on('/distance', (req, res, { id1, id2 }) => {
  if (!id1 || !id2) {
    res.end('{"error": "please enter 2 locations to calculate distance"}');
    res.statusCode = 400;
  } else {
    res.statusCode = 200;
    const request = Promise.all([
      fetchStudents(id1),
      fetchStudents(id2),
    ]);
    request
      .then((responses) => responses.map((response) => response.address.geo))
      .then(([coord1, coord2]) => {
        const R = 6371e3;
        const { lat: lat1str, lng: lng1str } = coord1;
        const [lat1, lat2] = [+lat1str, +lng1str];
        const { lat: lat2str, lng: lng2str } = coord2;
        const [lng1, lng2] = [+lat2str, +lng2str];
        const latDiff = lat2 - lat1;
        const lngDIff = lng2 - lng1;
        const a = (
          Math.sin(latDiff / 2) * Math.sin(latDiff / 2)
          + Math.cos(lat1) * Math.cos(lat2)
          * Math.sin(lngDIff / 2) * Math.sin(lngDIff / 2)
        );
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c) / 1000;
      })
      .then((geo) => {
        res.end(JSON.stringify(geo));
        res.statusCode = 200;
      });
  }
});

route.on('404', async (res) => {
  const msg = { result: 'Not Found' };
  res.end(JSON.stringify(msg));
});

const server = http.createServer((req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const truePath = req.url.toLowerCase();
  const { pathname, query } = url.parse(truePath);
  const args = querystring.parse(query);
  route.emit(pathname, req, res, args);
  if (res.statusCode === 404) {
    route.emit('404', res);
  }
});

server.listen(
  port, hostname, (err) => (
    err
      ? console.log(err)
      : console.log(`listening on: http://${hostname}:${port}/`)
  ),
);
