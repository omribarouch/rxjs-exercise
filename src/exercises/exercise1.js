const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        // add the proper operators to emit the correct information
    )
    .subscribe(console.log);