'use strict';

var express    = require("express"),
    request    = require('request'),
    ejs        = require('ejs'),
    app        = express();

class Server {
    constructor(port){
        this.port = port;
    }
    
    initExpress() {
        
        app.use(express.static(__dirname + '/app'));

        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');

        app.get('/', function (req, res) {
        res.render('index', {});
        }); 
        app.use('*', function(req, res){
            res.sendFile(__dirname + '/app/index.html');
        });

    }
   
    run(){
        
        this.initExpress();
        app.listen(this.port);
        console.log('Сервер запущен на порте ' + this.port);
    }
}

var server = new Server(8080);
server.run();

module.exports = Server;
