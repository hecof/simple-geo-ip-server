var url = require('url')
var http = require('http')
var middleware = require('./lib/json-response-middleware')
var geoIpQuery = require('./lib/geo-ip-query')

const port = process.env.PORT || 3000

http.createServer((req, res) => {
    middleware(res)

    var parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname != '/') {
        res.jsonNotFound()
        return
    }

    var ip = parsedUrl.query.ip

    if (!ip) {
        res.jsonError({
            type: 'ip_required'
        })
        return
    }

    geoIpQuery(ip).then(g => {
        if (!g){
            res.jsonError({
                type: 'ip_not_found'
            }, {
                ip: ip
            })
            return
        }

        res.jsonOk({
            ip: ip,
            geo: g
        })
    })
    .catch(e => {
        res.jsonError({
            type: 'invalid_ip'
        }, {
            ip: ip
        });
    })
}).listen(port)

//console.log(`Server listening on port ${port}`)
