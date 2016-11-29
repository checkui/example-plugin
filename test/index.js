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
const state = {};

describe('Plugins', () => {
  before((done) => {
    let i = 0;
    serverDirs.forEach((element) => {
      servers[element] = spawn('node', [element], { detached: true });
      servers[element].stdout.on('data', (data) => {
        if (data.toString() !== 'ready\n') console.log(`${element}: ${data}`);
        if (data.toString() === 'ready\n') {
          i += 1;
          if (i === serverDirs.length) {
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
              state.result = result;
              done();
            });
          }
        }
      });
    });
  });

  after(() => Object.keys(servers).forEach(x => servers[x].kill('SIGTERM')));

  it('shoud run the "title length" plugin properly', (done) => {
    assert.deepEqual(state.result, { a: 11, b: 13, compare: 2 });
    done();
  });
});
