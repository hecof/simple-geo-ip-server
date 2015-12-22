var Promise = require('bluebird')
var dbPath = process.env.GEOIP_DB || './data/GeoLite2-City.mmdb';
var countries = Promise.promisifyAll(require('maxmind-db-reader').openSync(dbPath))

function query(ip) {
    return countries.getGeoDataAsync(ip)
        .then(g => {
            if (g) {
                var result = {}

                if (g.city && g.city.names)
                    result.city = {
                        names: g.city.names
                    }

                if (g.country && (g.country.iso_code || g.country.names)){
                    result.country = {}

                    if (g.country.iso_code)
                        result.country.iso_code = g.country.iso_code

                    if (g.country.names)
                        result.country.names = g.country.names
                }

                if (g.continent && (g.continent.code || g.continent.names)){
                    result.continent = {}

                    if (g.continent.code)
                        result.continent.iso_code = g.continent.code

                    if (g.continent.names)
                        result.continent.names = g.continent.names
                }

                if (g.location)
                    result.location = g.location

                if (g.postal)
                    result.postal = g.postal

                return result
            }

            return null
        })
}

module.exports = query
