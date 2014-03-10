var http = require('http')
var url = require('url')
var send = require('send')

var port = process.argv[2] || 80

http.createServer(function(req, res) {

  function error(err) {
    res.statusCode = 200;
    console.log(err.message);
    res.end('');
  }

  function redirect() {
    res.statusCode = 301;
    res.setHeader('Location', req.url + '/');
    res.end('Redirecting to ' + req.url + '/');
  }

  var u = url.parse(req.url).pathname

  if (u === '/') {
    u = '/index.html'
  }

  send(req, u)
    .root(__dirname + '/assets/static')
    .on('error', error)
    .on('directory', redirect)
    .pipe(res);

}).listen(port, function() {
  console.log('Server running on port %d...', port)
})
