// Import jQuery global
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// Import bootstrap
import 'bootstrap'

// Example for modules
import {sayhello} from "./modules/sayhello";

$(function(){
    sayhello('Bo');
});
