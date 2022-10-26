const http = require('http');
const App = require('./app');

const server = http.createServer(App);

const port = 7777;

server.listen(port,()=>{
    console.log(`server is runnig on ${port}`);
})