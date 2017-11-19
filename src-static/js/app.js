import styles from '../css/app.css';
var $ = window.$ = window.jQuery= require("jquery");
import dt from 'datatables.net';
import csrftoken from './libs/csrftoken.js';
require("babel-core/register");
require("babel-polyfill");
require("./libs/foundation.min.js");
require("./fds-list.js");
require("./inscription.js");
require("./login.js");
require('./api/api.jsx')
require("./react-components/index.jsx");
$(document).foundation();