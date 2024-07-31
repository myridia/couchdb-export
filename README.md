couchdb-export
======
![logo](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/CouchDB.svg/290px-CouchDB.svg.png)

Dump a CouchDB database to a file.

Usage
--------

To install:

```bash
$ npm install -g couchdb-export
```

To dump a CouchDB:

```bash
$ couchdb-export http://localhost:5984/mydb outputfile -u username -p password
```

```
Options:
  -h, --help         this help message        
  -o, --output-file  output file
  -u, --username     username for the CouchDB database (if it's protected)
  -p, --password     password for the CouchDB database (if it's protected)

Examples:
  couchdb-export http://foo:5984/mydb             dump from source to mydb.txt
  couchdb-export http://foo:5984/mydb -o foo      dump from source to foo.txt
  couchdb-export http://foo:5984/mydb -u user -p  dump with authenfication
```


## License
GNU General Public License v3.0 -


