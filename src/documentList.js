import DocumentService from "./documentService.js";
import { append, el, txt } from "./utils.js";


const render_empty = () => {
    return el(`
        <article class="card-empty flex f-column justify-content-center align-items-center gap1 py2 box">
            <img src="asset/document.png" alt="">
            <p class="m0">Nenhum documento criado</p>
        </article>
    `);
}

export default class DocumentList {
    constructor(parent, limit = 10) {
        this._limit = limit;
        this._service = new DocumentService();
        this._parent = parent;
        this._documents = [];
    }

    load(page = 1) {
        this._service.read(page, this._limit).then(response => {
            this._documents = [];
            this._parent.innerHTML = "";

            if (response.length === 0) {
                this._parent.appendChild(render_empty());
                return;
            }
    
            response.forEach(document => this.add(document));
        }).catch(console.error);
    }

    add({doc_name, type, name, cpf, cep, street, number, city, uf, id}) {
        if (this._documents.length >= this._limit) return;

        let btn = el(
            `<button class="btn-delete">
                <img src="/asset/delete_black.png" alt="logo delete" />
            </button>
            `
        );

        btn.addEventListener("click", event => {
            this._service.delete(id);
            this._documents.splice(this._documents.indexOf(article), 1);
            this._parent.removeChild(article);
            if (this._parent.children.length === 0) {
                this._parent.appendChild(render_empty());
            }
        }, {once: true});

        let article = append(
            el('<article class="section-information px1">'),
            el('<h2>', doc_name),
            append(
                el('<div class="flex justify-content-between">'),
                append(
                    el('<p>'),
                    el('<strong>', type),
                    el('<br>'),
                    txt(`Nome: ${name}`),
                    el('<br>'),
                    txt(`CPF: ${cpf}`)
                ),
                append(
                    el('<p>'),
                    el('<strong>', 'Dados do cartório'),
                    el('<br>'),
                    txt(`CEP: ${cep}`),
                    el('<br>'),
                    txt(`Rua: ${street} Nº: ${number}`),
                    el('<br>'),
                    txt(`Cidade: ${city} UF: ${uf}`),
                )
            ),
            append(
                el('<footer>'),
                append(
                    el('<p>'),
                    el('<strong>', 'Data da criação: '),
                    txt('11 de maio de 2021'),
                    btn
                )
            )
        );

        if (this._documents.length === 0) this._parent.innerHTML = "";

        this._documents.push(article);
        this._parent.appendChild(article);
    }
}

