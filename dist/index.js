module.exports = (() => {
    'use strict';
    var e = {
            880: (e, r, t) => {
                t.r(r), t.d(r, {Table: () => u});
                const o = require('react');
                var n = t.n(o);
                function u(e) {
                    return n().createElement('div', null, 'table');
                }
            },
        },
        r = {};
    function t(o) {
        if (r[o]) return r[o].exports;
        var n = (r[o] = {exports: {}});
        return e[o](n, n.exports, t), n.exports;
    }
    return (
        (t.n = e => {
            var r = e && e.__esModule ? () => e.default : () => e;
            return t.d(r, {a: r}), r;
        }),
        (t.d = (e, r) => {
            for (var o in r) t.o(r, o) && !t.o(e, o) && Object.defineProperty(e, o, {enumerable: !0, get: r[o]});
        }),
        (t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
        (t.r = e => {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}),
                Object.defineProperty(e, '__esModule', {value: !0});
        }),
        t(880)
    );
})();
