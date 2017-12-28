import styles from '../css/app.css';
var $ = window.$ = window.jQuery= require("jquery");
import dt from 'datatables.net';
import csrftoken from './libs/csrftoken.js';

/* global variables to mediaqueries responsive*/
window.maxWidth1240 = '(max-width: 1240px)';
window.maxWidth1024 = '(max-width: 1024px)';
window.maxWidth963 = '(max-width: 963px)';
window.maxWidth900 = '(max-width: 900px)';
window.maxWidth800 = '(max-width: 800px)';
window.maxWidth640 = '(max-width: 640px)';
window.maxWidth480 = '(max-width: 480px)';
window.maxWidth300 = '(max-width: 300px)';

require('moment');
require("babel-core/register");
require("babel-polyfill");
require("./libs/foundation.min.js");
require("./fds-list.js");
require("./inscription.js");
require("./login.js");
require('./api/api.jsx')
require("./react-components/pages/inscriptions-list/index.jsx");
require("./react-components/pages/inscriptionDetail/index.jsx");
require("./react-components/ResultsTemplate/index.jsx");
$(document).foundation();