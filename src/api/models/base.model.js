import {ApiResolverUtil} from "@/api/utils/api-resolver.util";

export class BaseModel {
    endpoint = "";
    apiResolver = null;
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.apiResolver = new ApiResolverUtil(endpoint);
    }

    create(data) {
        return this.apiResolver.request('POST', '', data);
    }

    getOne(id) {
        return this.apiResolver.request('GET', `${id}`, null);
    }

    getAll() {
        return this.apiResolver.request('GET', '', null);
    }

    update(id, data) {
        return this.apiResolver.request('PATCH', `${id}`, data);
    }

    delete(id) {
        return this.apiResolver.request('DELETE', `${id}`, null);
    }
}