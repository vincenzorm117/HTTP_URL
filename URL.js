function HTTP_URL(href) {
    var self = this;
    var regex = /^(((https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?))?([\/]?[^?#]*)(\?[^#]*|)(#.*|)$/;

    function SetValues(href) {
        var match = href.match(regex);
        this.href = href;
        if( match ) {
            this.origin = match[1];
            this.protocol = match[3];
            this.host = match[4];
            this.hostname = match[5];
            this.port = match[6];
            this.pathname = match[7];
            this.paths = ParsePath(this.pathname);
            this.hash = match[9];

            SetSearchParams(match[8]);
        }
    }

    function UpdateHref() {
        var href = '';
        if( this.hostname ) {
            if( this.protocol ) href += this.protocol + '//';
            href += this.hostname;
            if( this.port ) href += this.port;
        }
        if( this.pathname ) href += this.pathname;
        if( this.search ) href += this.search;
        if( this.hash ) href += this.hash;
        this.href = href;
    }

    function SetSearchParams(search) {
        self.search = search;
        self.queryParams = {};
        search.trim().replace(/^\?/,'').split('&').map(function(param){
            var p = param.split('=').map(function(a){ return a.trim() });
            if( typeof(p[0]) == typeof('') && p[0] !== '' && typeof(p[1]) == typeof('') && p[1] !== '') {
                self.queryParams[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
            }
        });
    }

    function ParsePath(path) {
        return path.split('/').map(function(a){
            return a.trim();
        }).filter(function(a){
            return a !== '';
        });
    }

    function RefreshSearchQuery() {
        self.search = '';
        for(var k in self.queryParams) {
            self.search += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(self.queryParams[k]);
        }
        self.search = self.search.replace(/^&/,'?');
        UpdateHref.call(this);
    }

    this.setParam = function(key, value) {
        this.queryParams[key] = value;
        RefreshSearchQuery();
    }

    this.removeParam = function(key) {
        delete this.queryParams[key];
        RefreshSearchQuery();
    }

    this.set = function(key, value) {
        var validKeys = ['hash', 'hostname', 'protocol', 'port'];
        if( 0 <= validKeys.indexOf(key) ) {
            this[key] = value;
        }
    }

    this.setHref = function(href) {
        SetValues.call(this, href);
    }

    SetValues.call(this, href || window.location.href);
}


function OLD_HTTP_URL(href) {
    var self = this;
    var regex = /^(((https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?))?([\/]?[^?#]*)(\?[^#]*|)(#.*|)$/;

    function SetValues(href) {
        var match = href.match(regex);
        this.href = href;
        if( match ) {
            this.origin = match[1];
            this.protocol = match[3];
            this.host = match[4];
            this.hostname = match[5];
            this.port = match[6];
            this.pathname = match[7];
            this.paths = ParsePath(this.pathname);
            this.hash = match[9];

            SetSearchParams(match[8]);
        }
    }

    function UpdateHref() {
        var href = '';
        if( this.hostname ) {
            if( this.protocol ) href += this.protocol + '//';
            href += this.hostname;
            if( this.port ) href += this.port;
        }
        if( this.pathname ) href += this.pathname;
        if( this.search ) href += this.search;
        if( this.hash ) href += this.hash;
        this.href = href;
    }

    function SetSearchParams(search) {
        self.search = search;
        self.queryParams = {};
        search.trim().replace(/^\?/,'').split('&').map(function(param){
            var p = param.split('=').map(function(a){ return a.trim() });
            if( typeof(p[0]) == typeof('') && p[0] !== '' && typeof(p[1]) == typeof('') && p[1] !== '') {
                self.queryParams[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
            }
        });
    }

    function ParsePath(path) {
        return path.split('/').map(function(a){
            return a.trim();
        }).filter(function(a){
            return a !== '';
        });
    }

    function RefreshSearchQuery() {
        self.search = '';
        for(var k in self.queryParams) {
            self.search += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(self.queryParams[k]);
        }
        self.search = self.search.replace(/^&/,'?');
        UpdateHref.call(this);
    }

    this.setParam = function(key, value) {
        this.queryParams[key] = value;
        RefreshSearchQuery.call(this);
    }

    this.removeParam = function(key) {
        delete this.queryParams[key];
        RefreshSearchQuery.call(this);
    }

    this.set = function(key, value) {
        var validKeys = ['hash', 'hostname', 'protocol', 'port'];
        if( 0 <= validKeys.indexOf(key) ) {
            this[key] = value;
        }
    }

    this.setHash = function(hash) {
        this.hash = hash;
        UpdateHref.call(this);
    }

    this.setHref = function(href) {
        SetValues.call(this, href);
    }

    var href = {

    }

    SetValues.call(this, href || window.location.href);
}








