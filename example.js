const npmin = require('./')

npmin(['dick', 'colorful'])
.then(result => console.log(result))
.catch(e => console.log(e.stack))
