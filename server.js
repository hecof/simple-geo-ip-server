const middleware = require('./libs/json-response-middleware')
const geoIpQuery = require('./libs/geo-ip-query')

const port = process.env.PORT || 3000
const url = require('url')
const http = require('http')

http.createServer((req, res) => {
    middleware(res)

    var parsedUrl = url.parse(req.url, true);

    console.log(`Request: ${req.url}`)

    if (parsedUrl.pathname != '/') {
        res.notFound()
        return
    }

    var ip = parsedUrl.query.ip

    if (!ip) {
        res.error({
            type: 'ip_required'
        })
        return
    }

    geoIpQuery(ip).then(g => {
        if (!g){
            res.error({
                type: 'ip_not_found'
            }, {
                ip: ip
            })
            return
        }

        res.ok({
            ip: ip,
            geo: g
        })
    }).catch(e => {
        res.error({
            type: 'invalid_ip'
        }, {
            ip: ip
        });
    })
}).listen(port)

console.log(`Server listening on port ${port}`)
