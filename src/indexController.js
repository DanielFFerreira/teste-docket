import DocumentList from "./documentList.js";
import DocumentService from "./documentService.js";
import { timed_class } from "./utils.js";

const service = new DocumentService();
const list = new DocumentList(document.getElementById('list'), 10);

document.addEventListener("DOMContentLoaded", event => {
    list.load(1);
    const form = document.getElementById("form");

    form.addEventListener("submit", event => {
        event.preventDefault();
        const data = {};
        const form_data = new FormData(form);
        for (let i of form_data.keys()) {
            data[i] = form_data.get(i);
        }
        service.create(data).then(response => {
            list.add(response);
            timed_class(document.querySelector("#modal"), "visible", 6000);
        }).catch(message => {
            console.error(message);
        });
    });
});