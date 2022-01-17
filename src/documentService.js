import wrapper from "./wrapper.js";

const url = "http://localhost:3000";

export default class DocumentService {
    async create(data) {
        return wrapper(await fetch(`${url}/document`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }));
    }

    async read(page = 1, limit = 10) {
        return wrapper(await fetch(`${url}/document/?_page=${page}&_limit=${limit}`, {
            method: 'GET'
        }));
    }


    async delete(id) {
        return wrapper(await fetch(`${url}/document/${id}`, {
            method: 'DELETE'
        }));
    }
}