// Import jQuery global
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// Example for modules
import {sayhello} from "./modules/sayhello";

$(function(){
    sayhello('Bo');
});
