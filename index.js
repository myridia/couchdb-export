#!/usr/bin/env node                                                                                                                                                          'use strict';

var fs = require('fs');
var pouchdb = require('pouchdb');
var rs= require('pouchdb-replication-stream');
var ms  = require('memorystream');
pouchdb.plugin(rs.plugin);
pouchdb.adapter('writableStream', rs.adapters.writableStream);

/* Catch the Args */
  var yargs = require('yargs')
  .boolean('h')
  .alias('h', 'help')
  .describe('h', 'this help message')
  .alias('o', 'output-file')
  .describe('o', 'output file')
  .alias('u', 'username')
  .describe('u', 'username for the CouchDB database (if it\'s protected)')
  .alias('p', 'password')
  .describe('p', 'password for the CouchDB database (if it\'s protected)')
  .example('$0 http://foo:5984/mydb', 'dump from source to mydb.txt')
  .example('$0 http://foo:5984/mydb -o foo', 'dump from source to foo.txt')
  .example('$0 http://foo:5984/mydb -u user -p pass', 'dump with authenfication');

let argv = yargs.argv;
let source_url = argv._[0];
let db_name = argv.o;

if(argv.h)
{
  yargs.showHelp();
  return process.exit(0);
}

if(!source_url)
{
  console.error('You need to supply a database URL. -h for help');
  return process.exit(1);
}

if(!argv.o)
{
  let a = source_url.split("/");
  db_name = a[a.length-1];
}


if(argv.u && argv.p)
{
  console.log('authenticate with user:' + argv.u);
  console.log('authenticate with pass:' + argv.p);
  var db = new pouchdb(source_url,{
      auth: {
          username: argv.u,
          password: argv.p
      }
  });
}
else
{
  var db = new pouchdb(source_url);
}




var ws = fs.createWriteStream(db_name);
db.dump(ws).then(function (res) {
   console.log(res);
  console.log('...successfully dumbed your db to: ' + db_name);
});




