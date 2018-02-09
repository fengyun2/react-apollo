/*
* @Author: baby
* @Date:   2018-01-31 11:53:22
* @Last Modified by:   baby
* @Last Modified time: 2018-01-31 14:02:14
*/
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const minimist = require('minimist');

function resolve(dir) {
  return path.join(__dirname, dir);
}
// 检测文件或者文件夹存在 nodeJS
// eslint-disable-next-line
function fsExistsSync(path) {
  try {
    // eslint-disable-next-line
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

const client_dir = resolve('client');
const server_dir = resolve('server');

const args = minimist(process.argv.slice(2));

const project = args.project;
switch (project) {
  case 'client': {
    build(client_dir, 'client');
    break;
  }
  case 'server': {
    build(server_dir, 'server');
    break;
  }
  default: {
    build(server_dir, 'server');
    build(client_dir, 'client');
    break;
  }
}

function build(dir, type) {
  let pro_name = '';
  switch (type) {
    case 'client':
      pro_name = '客户端';
      break;
    case 'server':
      pro_name = '服务器端';
      break;
    default:
      break;
  }
  if (fsExistsSync(dir)) {
    shell.echo(`==========开始启动${pro_name}项目！==========`);
    shell.cd(dir);
    shell.exec('npm run start');
    shell.echo(`==========完成启动${pro_name}项目！==========`);
  }
}
