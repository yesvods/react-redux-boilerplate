//项目构建工具，并不能在客户端开发使用
import fs from 'fs';
export function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if(err) reject(err);
      resolve(buffer);
    })
  })
}

export function writeFilePromise(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if(err) reject(err);
      resolve();
    })
  })
}


export function ifNotExistCreate({path, sourcePath, content}){
  return new Promise((resolve, reject) => {
    fs.exists(path, (flag) => {

      if(flag) return resolve();

      if(content){
        return writeFilePromise(path, content).then(resolve);
      }else if(sourcePath){
        readFilePromise(sourcePath)
          .then((buffer) => {
            return writeFilePromise(path, buffer);
          })
          .then(resolve);
      }else{
        reject("sourcePath or content need to be create");
      }
    })
  })
}

export function readdir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, fileNames) => {
      if(err) reject(err);
      resolve(fileNames);
    })
  })
}

export default {};