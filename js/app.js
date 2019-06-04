import bsCustomFileInput from "bs-custom-file-input";
import Vue from 'vue';
import VModal from 'vue-js-modal';

$(document).ready(function () {
    bsCustomFileInput.init()
});

Vue.use(VModal);

const app = new Vue({
    el: '#app',
    data: {
        
    },
    methods: {
        
    },
});
