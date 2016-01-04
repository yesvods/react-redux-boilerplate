export function keyGen(){
  return Math.random().toString(36).slice(2)+Date.now().toString(36);
}
/**
 * 树数据过滤器，保持原树结构
 * @param  {object} data     tree源数据
 * @param  {object} entities 实体数据,hash map
 * @param  {String} word     待筛选的词
 * @return {Object}          被筛选出来的树
 */
// export function treeFilter(data, entities, word){
//   let result = {
//     order:[]
//   };
//   data.order.forEach(id => {
//     //这个id内容是否通过筛选掉后仍保留
//     let flag = false;
//     //只有order情况下，也就是到叶子节点了
//     if(!data[id]){
//       let entity = entities[id];
//       if(_.contains(entity.title, word) || _.contains(entity.dataCount+'', word)){
//         flag = true;
//       }
//     }
//     //还有嵌套的情况下
//     if(data[id] && typeof data[id] === "object"){
//       let tmpObj = treeFilter(data[id], entities, word);
//       //嵌套对象里order有内容
//       if(tmpObj.order.length){
//         result[id] = tmpObj;
//         flag = true;
//       }else if(_.contains(entities[id].title, word) || _.contains(entities[id].dataCount+'', word)){
//         result[id] = {
//           order: [],
//         };
//         flag = true;
//       }
//     }
//     if(flag){
//       result.order.push(id)
//     }
//   })
  
//   return result;
// }

/**
 * 树遍历函数,会对树进行修改
 * @param  {[type]} tree      hashmap树节点
 * @param  {[type]} node      遍历起点节点
 * @param  {[type]} processor 处理函数
 * @param  {String} order     遍历顺序 bfs, pfs, cfs
 */
function travesalTree(tree, node, processor, order = 'pfs'){
  if(order === 'pfs') processor(node);
  if(node.children&& node.children instanceof Array){
    let tmpArray = _.clone(node.children);
    while(tmpArray.length){
      let cid = tmpArray.shift();
      travesalTree(tree, tree[cid], processor, order);   
    }
  }
  if(order === 'cfs') processor(node);
}

function printTree(){
  travesalTree(tree, tree['root'], node => {
    console.log(node.id)
  }, 'pfs')
}

export function removeNode(tree, id){
  let flag = false;
  travesalTree(tree, tree['root'], node => {
    if(node.id === id){
      var pNode = tree[node.pid];
      //找不到父元素，则不进行删除操作
      if(!pNode) return;
      var index = pNode.children.indexOf(id);
      pNode.children.splice(index,1);
      delete tree[id];
      flag = true;
    }
  }, 'cfs');
  return flag?id: flag;
}

export function addNode(tree, obj, index){
  if(!obj.id) throw Error('No id spec in obj');
  let flag = false;
  travesalTree(tree, tree['root'], node => {
    if(node.id === obj.pid){
      //防止木有chilren属性
      if(!node.children) node.children = [];
      if(_.isNumber(index) && index>0){
        node.children.splice(index, 0, obj.id);
      }else{
        node.children.unshift(obj.id)
      }
      tree = Object.assign(tree, {
        [obj.id]: obj
      })
      flag = true;
    }
  });
  return flag?obj: flag;
}

export function updateNode(tree, obj){
  if(!obj.id) throw Error('No id spec in obj');
  tree[obj.id] = Object.assign(tree[obj.id], obj);
  return obj;
}

export function filterTree(tree, keyWord){
  let filterdTree = _.clone(tree, true);
  travesalTree(filterdTree, filterdTree['root'], node => {
    if(!_.contains(node.title, keyWord) && (!node.children || node.children.length===0)){
      removeNode(filterdTree, node.id);
      // console.log(`remove ${node.id}`)
    }
  }, 'cfs');
  return filterdTree;
}