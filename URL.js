


function HTTP_URL(href) {
    var data = {
        href: null,
        origin: null,
        protocol: null,
        host: null,
        hostname: null,
        port: null,
        pathname: null,
        paths: null,
        hash: null,
        queryString: null,
        queryParams: null
    }

    var regex = /^(((https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?))?([\/]?[^?#]*)(\?[^#]*|)(#.*|)$/;
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


    function ParsePath(path) {
        return path.split('/').map(function(a){
            return a.trim();
        }).filter(function(a){
            return a !== '';
        });
    }

    function GetSearchParams(search) {
        var queryParams = {};
        search.trim().replace(/^\?/,'').split('&').map(function(param){
            var p = param.split('=').map(function(a){ return a.trim() });
            if( typeof(p[0]) == typeof('') && p[0] !== '' && typeof(p[1]) == typeof('') && p[1] !== '') {
                queryParams[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
            }
        });
        return queryParams;
    }

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
            data.paths = ParsePath(data.pathname);

            data.hash = match[9];

            data.queryString = match[8];
            data.queryParams = GetSearchParams(data.queryString);
        }
    }

    function SetHrefWithValues() {
        var href = '';
        if( data.hostname ) {
            if( data.protocol ) href += data.protocol + '//';
            href += data.hostname;
            if( data.port ) href += data.port;
        }
        if( data.pathname ) href += data.pathname;
        if( data.search ) href += data.search;
        if( data.hash ) href += data.hash;
        data.href = href;
    }


    var objectData = {
        get href() { return data.href; },
        get origin() { return data.origin; },
        get protocol() { return data.protocol; },
        get host() { return data.host; },
        get hostname() { return data.hostname; },
        get port() { return data.port; },
        get pathname() { return data.pathname; },
        get paths() { return data.paths; },
        get hash() { return data.hash; },
        get queryString() { return data.queryString; },
        get queryParams() { return data.queryParams; },

        set href(val) { 
            // Update all values
            SetValuesWithHref(val);
        },
        set origin(val) { 
            // Update protocol, host, hostname, port, href
            data.origin = origin;
        },
        set protocol(val) { 
            // Update origin, href
        },
        set host(val) { 
            // Update hostname, port, origin, href
        },
        set hostname(val) { 
            // Update host, origin, href
        },
        set port(val) { 
            // Update host, origin, href
            data.port = val;
            SetHrefWithValues();
        },
        set pathname(val) { 
            // Update pathname, href
            data.pathname = val;
        },
        set paths(val) {
            // Update pathname, href
            data.paths = val;
        },
        set hash(val) { 
            // Update href
            data.hash = val;
            SetHrefWithValues();
        },
        set queryString(val) { 
            // Update queryParams, href
        },
        set queryParams(val) { 
            // Update queryString, href
        }
    }

    objectData.href = href || window.location.href;

    return objectData;
}