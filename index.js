"use strict";

let through2 = require('through2');

module.exports = function (options) {
    return through2.obj(function (page, enc, next) {
        page.data = page.data || {};
        if (page.content) {
            Object.keys(options).forEach(function (key) {
                var extraction = page.content.match(options[key]);
                if (extraction) {
                    page.data[key] = extraction.pop();
                }
            });
        }
        this.push(page);
        next();
    });
};
