exports.install = function (Vue, options) {

        Vue.prototype.DateFormat = function(val) {
                if (val == undefined) {
                return "";
                }
                return val.substring(0,10);
        }
};