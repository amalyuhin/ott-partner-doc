#!/usr/bin/env node
var fs = require('fs');
var glob = require( 'glob' );
var path = require('path');
var yamljs = require('yamljs');
var mkdirp = require('mkdirp');


glob( 'json/**/*.json', function( err, files ) {
    files.forEach(function (file) {
        var data = require(path.resolve(__dirname, file));

        var yamlString = yamljs.stringify(data, 100000, 3);
        var newFileName = file.replace('json/', 'yml/').replace('.json', '.yml');

        mkdirp(path.dirname(newFileName), function (err) {
            if (err) return console.error(err);

            fs.writeFile(newFileName, yamlString, function (err) {
                if (err) return console.log(err);
                console.log('successful for ' + newFileName);
            });
        });

    });
});

