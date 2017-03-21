var express = require('express');

function loadAngularModules(app) {
    app.use('/node_modules', express.static(process.cwd() + '/node_modules'));
}

module.exports.http = {
    customMiddleware: loadAngularModules
};