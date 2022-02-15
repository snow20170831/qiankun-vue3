/**
 * build
 * 先build到各自文件夹下的dist目录，再拷贝到最外层dist目录
 * 1、先删除上次的dist目录 rm -rf dist
 * 2、拷贝主应用dist到最外层dist cp -rf 20f6e232--cloud--FirstMainMicroApp/dist dist
 * 3、拷贝微应用dist到最外层dist中，且改名为对应微应用名称 cp -rf 20f6e232--cloud--FirstSubMicroApp/dist dist/FirstSubMicroApp
 */
// const { resolve, resolve: pathResolve } = require('path');
const { resolve: pathResolve } = require('path');
const { access, constants, readdirSync } = require('fs');
const { spawn } = require('child_process');

const entry = pathResolve();
// const microApps = readdirSync(entry).filter(app => /app$/.test(app));
const mainAppFolderName = 'main-app';
const microAppFolderName = 'micro-app';
const appNameRegex = new RegExp(`(${mainAppFolderName}|${microAppFolderName})$`)
console.log('appNameRegex', appNameRegex);
const microApps = readdirSync(entry).filter(app => appNameRegex.test(app));
console.log('microApps', appNameRegex, microApps);

// 文件夹是否存在
const isExist = (dir) => {
  return new Promise((resolve, reject) => {
    access(dir, constants.F_OK, err => {
      // err为null时表示存在文件夹dir
      console.log('isExist', err);
      resolve(err);
    })
  })
};

// 删除最外层目录下文件夹
const removeDir = (dir) => {
  return new Promise((resolve, reject) => {
    console.log('removedir', dir);
    const cp = spawn('rm', ['-rf', dir], { cwd: entry });

    cp.on('error', err => {
      console.error(`removeDir err: ${err}`);
      reject(err);
    });

    cp.on('close', code => {
      // 此时code为0
      console.log(`removeDir exited with code ${code}`);
      resolve({ code });
    });
  });
};

// 拷贝文件夹
// cp -rf 20f6e232--cloud--FirstMainMicroApp/dist dist
// cp -rf 20f6e232--cloud--FirstSubMicroApp/dist dist/FirstSubMicroApp
const copyDir = (src, dst) => {
  return new Promise((resolve, reject) => {
    const cp = spawn('cp', ['-rf', src, dst], { cwd: entry });

    cp.on('error', err => {
      reject(err);
    });

    cp.on('close', code => {
      // 此时code为0
      resolve({ code });
    });
  })
};

// 先拷贝主应用dist到最外层目录
const copyMainDir = (dist) => {
  return new Promise((resolve, reject) => {
    const mainApp = microApps.find(app => app.includes(mainAppFolderName));
    const src = pathResolve(mainApp, dist);
    copyDir(src, dist)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// 再拷贝微应用dist到主应用dist中, 且给微应用dist重命名
const copySubDir = (dist) => {
  const promises = [];
  const subApps = microApps.filter(app => app.includes(microAppFolderName));
  console.log('subApps: ', subApps);
  subApps.forEach(app => {
    let rename = app;
    if (app.includes('--')) {
      const appNames = app.split('--');
      const len = appNames.length;
      rename = appNames[len - 1];
    }
    const src = pathResolve(app, dist);
    const dst = pathResolve(dist, rename);
    const promise = copyDir(src, dst);
    promises.push(promise);
  });

  return promises;
};

// 拷贝主应用与微应用所有dist目录
const copyDirs = (dir) => {
  copyMainDir(dir)
    .then(res => {
      Promise.all(copySubDir(dir))
        .then(res => {
          console.log('复制dist目录成功');
        })
        .catch(err => { 
          console.log('复制微应用dist目录失败', err);
        });
    })
    .catch(err => {
      console.log('复制主应用dist目录失败', err);
    });
};

const buildMicroApps = async (dir) => {
  try {
    const isNull = await isExist(pathResolve(dir));
    if (!isNull) {
      const removeRes = await removeDir(dir);
      console.log('removeRes', removeRes);
      if (!removeRes.code) {
        copyDirs(dir);
      }
    } else {
      copyDirs(dir);
    }
  } catch(err) {
    console.log(err);
  }
};
 
buildMicroApps('dist');

 
 