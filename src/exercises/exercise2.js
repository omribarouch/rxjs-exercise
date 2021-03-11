const {fromHttpRequest} = require('../utils/http');
const {takeLast, mergeAll} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeAll(),
        takeLast(1)
    )
    .subscribe(console.log);