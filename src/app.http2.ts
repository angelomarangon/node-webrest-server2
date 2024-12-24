import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
},(req, res) => {
    
    console.log(req.url);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hola Mundo!</h1>');
    res.end();
});


server.listen(3000, () => {
    console.log('Server running on port 3000');
})