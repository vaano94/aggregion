// constants.js
angular
    .module('app')
    .constant('api', {
        // core address to the server
        BASE_ADDRESS: "https://ds.aggregion.com/api",
        // if you call this address you'll be given a replacement image
        COVER_NOT_AVAIL_ADDRESS : "https://storage.aggregion.com/api/files/12ce171be47031a58f6d12ddefca93d52bda709b1b720d50cf48747d6cd44cb6/shared/data"
    });