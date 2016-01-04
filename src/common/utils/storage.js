import PouchDB from 'pouchdb';

export let syncDb = new PouchDB('test');
export let localDb = new PouchDB('local');

PouchDB.replicate(`${config.couchUrl}/test`, 'test');
// rDb.post({
//   test: +new Date()
// }).then(data=>{
//   console.log(data);
// }).catch(err=>{
//   console.log(err);
// })