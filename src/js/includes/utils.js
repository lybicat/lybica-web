module.exports.getUrlParameter = function (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariable = sPageURL.split('&').map(function(varStr) {
            return varStr.split('=');
        }).filter(function(vars) {
            return vars[0] === sParam;
        }).pop();
    if (sURLVariable !== undefined) {
        return sURLVariable[1] || true;
    }
    return null;
};
