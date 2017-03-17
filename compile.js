#!/usr/bin/env node
var fs = require('fs');
var glob = require( 'glob' );
var path = require('path');
var yamljs = require('yamljs');
var mkdirp = require('mkdirp');



if(makeAllDocs()) {
    json2yml();
}

function json2yml() {
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
}

function makeAllDocs() {
    var allDocs = {};
    var success = true;
    glob( 'json/**/*.json', function( err, files ) {
        var itemCount = 0;
        files.forEach(function (file) {
            var data = require(path.resolve(__dirname, file));
            if (itemCount == 0) {
                allDocs = data;
            }
            else {
                setPathsInAllDocs(data);
            }
            itemCount++;
        });
        mkdirp('./json/avia/allDocs', function (err) {
            if (err) {
                success = false;
                return console.error(err);
            }

            fs.writeFile('./json/avia/allDocs/docs.json', JSON.stringify(allDocs), function (err) {
                if (err) {
                    success = false;
                    return console.error(err);
                }
                console.log('successful for all docs');
            });
        });

    });

    function setPathsInAllDocs(data) {
        var paths  =  data.paths;
        for (var path in paths) {
            if (paths.hasOwnProperty(path)) {
                allDocs.paths[path] = paths[path];
            }
        }
    }
    return success;
}

