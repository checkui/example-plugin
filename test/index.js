/* eslint-disable no-console */
const assert = require('assert');
const childProcess = require('child_process');
const path = require('path');
const requestPromise = require('request-promise');

const spawn = childProcess.spawn;
const serverDirs = [
  path.join(__dirname, '../lib/checkui_server'),
  path.join(__dirname, '../lib/endpoint_server'),
  path.join(__dirname, '../node_modules/plugin-title-length'),
];
const servers = {};

describe('Plugin', () => {
  before((done) => {
    let i = 0;
    serverDirs.forEach((element) => {
      servers[element] = spawn('node', [element], { detached: true });
      servers[element].stdout.on('data', (data) => {
        if (data.toString() !== `ready\n`) console.log(`${element}: ${data}`);
        if (data.toString() === `ready\n`) {
          i += 1;
          if (i === serverDirs.length) {
            const state = {};
            requestPromise('http://localhost:3033/a.html')
            .then((result) => {
              state.a = result;
              return requestPromise('http://localhost:3033/b.html');
            })
            .then((result) => {
              state.b = result;
              return requestPromise({
                body: state,
                json: true,
                method: 'POST',
                uri: 'http://localhost:3030/plugins/string-length',
              });
            })
            .then((result) => {
              console.log(999)
              console.log(result);
              done();
              // done();
            });
          }
        }
      });
    });
  });

  after(() => Object.keys(servers).forEach(x => servers[x].kill('SIGTERM')));

  it('should do stuff', (done) => {
    console.log('boom');
    assert.equal(1, 1);
    done();
    // requestPromise('http://localhost:3030/')
    // .then((body) => {
    //   assert.equal('Hello World!', body);
    //   done();
    // });
  });
});
