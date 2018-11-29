// Import jQuery global
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import {sayhello} from "./modules/sayhello";

$(function(){
    sayhello();
});

console.log('Hello');
