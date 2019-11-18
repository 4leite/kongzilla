#!/bin/sh
if [ "$1" == "run" ]; then
    tee /usr/share/nginx/html/env.js << EOF > /dev/null
(function(window) {
	window.env = window.env || {} 
	window.env.API_ROOT = "${API_HOST:-http://localhost:8001}";
})(window);
EOF
    exec nginx -g 'daemon off;'
else
    exec "$@"
fi