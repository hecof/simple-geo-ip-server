var Promise = require('bluebird')
var dbPath = process.env.GEOIP_DB || './data/GeoLite2-City.mmdb';
var countries = Promise.promisifyAll(require('maxmind-db-reader').openSync(dbPath))

function query(ip) {
    return countries.getGeoDataAsync(ip)
        .then(g => {
            if (g)
                return {
                    city: {
                        names: g.city.names
                    },
                    country: {
                        code: g.country.iso_code,
                        names: g.country.names
                    },
                    continent: {
                        code: g.continent.code,
                        names: g.continent.names
                    },
                    location: g.location,
                    postal: g.postal
                }

            return null
        })
}

module.exports = query
