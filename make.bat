call node-sass -r scss/ -o css/ --output-style compressed
call uglifyjs js/wiki.js js/main.js -c booleans,dead_code -m -o js/wikilingual-min.js