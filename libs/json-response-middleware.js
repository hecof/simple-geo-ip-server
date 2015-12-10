'use strict'

function middleware(res){
    res.notFound = function(){
        res.writeHead(400, {"Content-Type": "text/plain"})
        res.end(JSON.stringify({
            ok: false,
            error: {
                type: 'not_found'
            }
        }))
    }

    res.ok = function (data){
        res.writeHead(200, {"Content-Type": "application/json"})

        var obj = {
            ok: true
        }

        if (data)
            for(let key in data)
                obj[key] = data[key];

        res.end(JSON.stringify(obj));
    }

    res.error = function(error, data){
        res.writeHead(200, {"Content-Type": "application/json"})

        var obj = {
            ok: false,
            error: error
        }

        if (data)
            for(let key in data)
                obj[key] = data[key];

        res.end(JSON.stringify(obj));
    }
}

module.exports = middleware
