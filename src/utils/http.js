const {from} = require('rxjs');
const {mergeMap} = require('rxjs/operators');
const fetch = require('node-fetch');

module.exports.fromHttpRequest = (url, params) => {
    return from(fetch(url, params))
        .pipe(mergeMap(response => response.json()));
}
