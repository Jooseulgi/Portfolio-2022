import Page from "./common/page";
import '@fortawesome/fontawesome-free/js/all.js'

export default class Index extends Page {
    constructor() {
        super();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    new Index();
}); 