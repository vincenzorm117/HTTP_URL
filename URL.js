


function HTTP_URL(href) {
    var data = {
        href: '',
        origin: '',
        protocol: '',
        host: '',
        hostname: '',
        port: '',
        pathname: '',
        // paths: '',
        hash: '',
        search: '',
        queryParams: {}
    }

    var regex = /^(((https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?))?([\/]?[^?#]*)(\?[^#]*|)(#.*|)$/;
    var originRegex = /^((https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)$/;
    var hostRegex = /^([^:\/?#]*)(?:\:([0-9]+))?$/;

    /*
        ^(
            (
                (https?\:)\/\/
            )?
            (
                ([^:\/?#]*)
                (?:\:([0-9]+))?
            )
        )?
        ([\/]?[^?#]*)
        (\?[^#]*|)
        (#.*|)$
    */


    data.searchParams = {
         reset: function(search) {
            queryParams = {};
            if( typeof(search) === typeof('') ) {
                search.trim().replace(/^\?/,'').split('&').map(function(param){
                    var p = param.split('=').map(function(a){ return a.trim() });
                    if( typeof(p[0]) == typeof('') && p[0] !== '' && typeof(p[1]) == typeof('') && p[1] !== '') {
                        queryParams[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
                    }
                });
            }
            data.search = this.toString();
            SetHrefWithValues();
        },
        delete: function(name) {
            var del = queryParams[name];
            delete queryParams[name];
            data.search = this.toString();
            SetHrefWithValues();
            return del;
        },
        values: function() {
            return Object.keys(queryParams).map(function(key){
                return [key, queryParams[key]];
            });
        },
        keys: function() {
            return Object.keys(queryParams);
        },
        get: function(name) {
            return queryParams[name];
        },
        set: function(name, value) {
            queryParams[name] = value;
            data.search = this.toString();
            SetHrefWithValues();
        },
        has: function(name) {
            return name in queryParams;
        },
        toString: function() {
            return Object.keys(queryParams).map(function(key){
                return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]);
            }).join('&');
        },
        clear: function() {
            queryParams = {};
            data.search = this.toString();
            SetHrefWithValues();
        }
    }

    // function ParsePath(path) {
    //     return path.split('/').map(function(a){
    //         return a.trim();
    //     }).filter(function(a){
    //         return a !== '';
    //     });
    // }

    function SetValuesWithHref(href) {
        var match = href.match(regex);
        data.href = href;
        if( match ) {
            data.origin = match[1];
            data.protocol = match[3];
            data.host = match[4];
            data.hostname = match[5];
            data.port = match[6];

            data.pathname = match[7];
            // data.paths = ParsePath(data.pathname);

            data.hash = match[9];

            data.search = match[8];
            data.searchParams.reset(data.search);
        }
    }

    function SetHrefWithValues() {
        var href = '';
        SetOriginFromValues();
        if( data.hostname ) {
            if( data.protocol ) href += data.protocol + '//';
            href += data.hostname;
            if( data.port ) href += ':' + data.port;
        }
        if( data.pathname ) href += data.pathname;
        if( data.search ) href += '?' + data.search;
        if( data.hash ) href += data.hash;
        data.href = href;
    }

    function SetOriginFromValues() {
        var origin = '';
        if( data.hostname ) {
            if( data.protocol ) origin += data.protocol + '//';
            origin += data.hostname;
            if( data.port ) origin += data.port;
        } else {
            data.protocol = '';
            data.hostname = '';
            data.host = '';
            data.port = '';
        }
        data.origin = origin;
    }

    function ToString(s) {
        return s.toString();
    }

    function hasSSL(protocol) {
        return 0 <= ['https:','wss:'].indexOf(protocol);
    }


    var objectData = {
        get href() { return data.href; },
        get origin() { return data.origin; },
        get protocol() { return data.protocol; },
        get host() { return data.host; },
        get hostname() { return data.hostname; },
        get port() { return data.port; },
        get pathname() { return data.pathname; },
        // get paths() { return data.paths; },
        get hash() { return data.hash; },
        get search() { return data.search; },
        get searchParams() { return data.searchParams; },
        get isSecure() { return hasSSL(data.protocol); },

        set href(val) { 
            // Update all values
            SetValuesWithHref(val);
        },
        set origin(origin) { 
            // Update protocol, host, hostname, port, href
            data.origin = origin;
            var matches = origin.match(originRegex);
            data.protocol = matches[2];
            data.host = matches[3];
            data.hostname = matches[4];
            data.post = matches[5];
            SetHrefWithValues();
        },
        set protocol(protocol) { 
            // Update origin, href
            data.protocol = protocol;
            SetOriginFromValues();
            SetHrefWithValues();
        },
        set host(host) { 
            // Update hostname, port, origin, href
            var matches = host.match(hostRegex);
            data.host = host;
            data.hostname = matches[1];
            data.port = matches[1];
            SetOriginFromValues();
            SetHrefWithValues();
        },
        set hostname(hostname) { 
            // Update host, origin, href
            data.hostname = hostname;
            SetOriginFromValues();
            SetHrefWithValues();
        },
        set port(port) { 
            // Update host, origin, href
            data.port = port;
            SetOriginFromValues();
            SetHrefWithValues();
        },
        set pathname(pathname) { 
            // Update pathname, href
            data.pathname = pathname;
            // data.paths = ParsePath(pathname);
            SetHrefWithValues();
        },
        // set paths(paths) {
        //     // Update pathname, href
        //     if( !Array.isArray(paths) ) {
        //         throw new Error('Incorrect data type: paths must be an array of strings');
        //     }
        //     data.paths = paths.map(ToString);
        //     data.pathname = '/' + data.paths.join('/');
        //     SetHrefWithValues();
        // },
        set hash(hash) { 
            // Update href
            data.hash = hash;
            SetHrefWithValues();
        },
        set search(search) { 
            // Update queryParams, href
            data.search = search;
            data.searchParams.reset(search);
            SetHrefWithValues();
        },
        set searchParams(searchParams) {} // Prevent people from overriting searchParams
    }

    objectData.href = href || window.location.href;

    return objectData;
}

module.exports = HTTP_URL;