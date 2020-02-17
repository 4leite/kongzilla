#!/bin/sh
if [ "$1" == "run" ]; then
    tee /usr/share/nginx/html/_kongzilla/env.js << EOF > /dev/null
(function(window) {
	window.env = window.env || {};
    window.env.API_NAMES = "${API_NAMES}";
    window.env.API_TYPES = "${API_TYPES}";
	window.env.API_URLS = "${API_URLS}";
})(window);
EOF
    exec nginx -g 'daemon off;'
else
    exec "$@"
fi