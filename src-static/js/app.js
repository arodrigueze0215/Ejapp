import styles from '../css/app.css';
var $ = window.$ = window.jQuery= require("jquery");
import dt from 'datatables.net';
import csrftoken from './libs/csrftoken.js';
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