const express = require('express')
const app = express()
const port = 3000


require('http').createServer(require('serve-static')('.')).listen(3000)

// var fs = require('fs');
// var index = fs.readFileSync('index.html');

// app.get('/', (req, res) => {
// 	res.writeHead(200, {'Content-Type': 'text/html'});
// 	// change the to 'text/plain' to 'text/html' it will work as your index page
// 	res.end(index);
// 	// res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })