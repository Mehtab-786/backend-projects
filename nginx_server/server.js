const http = require('http');
const path = require('path');
const fs = require('fs');

let port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, './public', req.url === '/' ? "index.html" : 'PageNotFound.html') // filepath means complete url of the file in server 
    const extName = String(path.extname(filePath)).toLowerCase() // optional step for extension like HTML or html , same thing BTW
    const mimeType = {
        ".html": 'text/html',
        ".css": 'text/css',    //optional which file to suport
        ".js": 'application/js',      //optional which file to suport
        ".png": 'image/png'     //optional which file to suport
    };

    const contentType = mimeType[extName] || "application/octet-stream" // for extra files till now we have everything but not yet served

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') { // Error no entiry simply means no page found
                res.writeHead(404, { 'content-type': contentType })
                res.end(data,'utf-8')
            }
        } else {
            res.writeHead(200, { 'content-type': contentType })
            res.end(data, 'utf-8')
        }
    })

})

server.listen(port, () => {
    console.log('server running  on port ...', port)
})


// NGINX: very fast web server + reverse proxy. Great at serving static files and protecting & spreading traffic to many backend servers. Good memory usage.
// Apache: older, very flexible and feature-rich (lots of modules). Works well but can be heavier under very high concurrency (unless tuned).
// Node.js: not a web server product like nginx/apache — it’s a JavaScript runtime. You can build a server with it (like your code) and it works great for custom logic, APIs, websockets. In production we often use NGINX in front of Node to handle SSL, static files, and to accept high connections, then forward dynamic/API requests to Node.