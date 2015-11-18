import _ from 'lodash';

/**
 * 用于检测对象属性类型
 * @param  {[object]} source     [待检测的对象]
 * @param  {[object]} keyTypeMap [对象属性以及对应的类型]
 * @return {[boolean]}            [属性是否完全符合]
 */
export function checkVars(source, keyTypeMap){
  return _.every(Object.keys(keyTypeMap).map(key => {
    checkVar(source[key], keyTypeMap[key]);
  }))
}

function checkVar(variable, type){
  let template = `变量 ${variable} 要求为 ${type} 类型，却收到 ${typeof variable}`;
  
  if(!_['is'+_.capitalize(type)](variable)){
    throw new Error(template);
  }else{
    return true;
  }
}