module.exports = function(options) {
    return function(page, spider, next) {
        page.data = page.data || {};
        Object.keys(options).forEach(function(key) {
            var extraction = page.content.match(options[key]);
            if(extraction) {
                page.data[key] = extraction.pop();
            }
        });
        next();
    }
};
