var Service = require('node-windows').Service;

var svc = new Service({
    name:'GeoIp',
    description: 'Geolocation by ip address',
    script: require('path').join(__dirname,'../server.js'),
    env: [{
            name: "GEOIP_DB",
            value: "C:\\data\\GeoLite2-City.mmdb"
        },
        {
            name: "PORT",
            value: "3000"
        }]
});

svc.on('install',function(){
    svc.start();
});

svc.install();
