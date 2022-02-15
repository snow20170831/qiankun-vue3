/**
 * argv[1]为 --parallel / --serial
 * argv[2]为 install / serve / build
 */
const path = require('path');
const fs = require('fs');
const spawn = require('./spawn');

const entry = path.resolve();
const microApps = fs.readdirSync(entry).filter(app => /app$/.test(app));

const remove = (array, x) => {
  const index = array.indexOf(x);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const runApp = (app, task) => {
  let cp = null;
  const promise = new Promise((resolve, reject) => {
    // const command = 'npm';
    const npmPath = process.env.npm_execpath;
    const npmPathIsJs = typeof npmPath === "string" && /\.m?js/.test(path.extname(npmPath));
    const command = (npmPathIsJs ? process.execPath : npmPath || "npm");
    const args = [];
    if (npmPathIsJs) {
      args.unshift(npmPath);
    }
    if (task === 'install') {
      args.push(task);
    } else {
      args.push('run', task);
    }
    
    const { stdin, stdout, stderr } = process;
    const options = {
      stdio: [stdin, stdout, stderr],
    };
    if (app) {
      options.cwd = path.resolve(app);
    }

    cp = spawn(command, args, options);

    cp.on("error", (err) => {
      cp = null;
      reject(err);
    });

    cp.on("close", (code) => {
      cp = null;
      resolve({ app, code });
    });
  });

  // kill pid
  promise.abort = () => {
    if (cp) {
      cp.kill();
      cp = null;
    }
  };

  return promise;
};

const runApps = (apps) => {
  return new Promise((resolve, reject) => {
    if (apps.length === 0) {
      resolve([]);
      return;
    }

    const results = apps.map(app => ({ name: app, code: undefined }))
    const queue = apps.map((app, index) => ({ name: app, index }))
    const promises = [];
    let error = null;
    let aborted = false;

    const done = () => {
      if (error) {
        reject(error);
      }
      resolve(results);
    };

    const abort = () => {
      if (aborted) {
        return;
      }
      aborted = true;
      if (promises.length) {
        for (const p of promises) {
          p.abort();
        }
        Promise.all(promises).then(done, reject);
      } else {
        done();
      }
    };
    
    const next = (task) => {
      if (aborted) {
        return;
      }
      if (!queue.length) {
        if (!promises.length) {
          done();
        }
        return
      }

      const app = queue.shift();
      const promise = runApp(app.name, task);
      promises.push(promise);
      promise.then(
        result => {
          remove(promises, promise);
          
          if (aborted) {
            return;
          }

          results[app.index].code = result.code
          
          if (result.code) {
            error = {
              name: result.app,
              code: result.code,
              results: results,
            };
            abort();
            return;
          }

          next(task);
        },
        err => {
          remove(promises, promise);
          error = err;
          abort();
          return;
        },
      );
    };

    const [mode, task = ''] = process.argv.slice(2);
    
    if (!['--parallel', '--serial'].includes(mode)) {
      const error = 'process.argv第三个参数只能为--parallel、--serial其中之一';
      return reject(error);
    }
    if (!['install', 'serve', 'build'].includes(task)) {
      const error = 'process.argv第四个参数只能为install、serve、build其中之一';
      return reject(error); 
    }
    const len = mode === '--parallel' ? apps.length : 1;
    for (let i = 0; i < len; i++) {
      next(task);
    }
  });
};

// console.log('microApps', microApps);
runApps(microApps)
  .then(result => {
    // console.log('ok');
  })
  .catch(error => {
    console.error('error: ', error);
  });
