import axios from 'axios';
import apiConf from "@/api/api.conf";
import {FailedRequestException} from "@/api/exceptions/failed-request.exception";
export class ApiResolverUtil {
    endpoint = ""

    bearer = ""

    constructor(endpoint = "") {
        this.endpoint = endpoint;
        this.bearer = localStorage.getItem('token');
    }

    unauthorizedRequest(method, path, data) {
        const url = `${apiConf.url}/${this.endpoint}/${path}`
       return axios({
           method,
           url,
           data,
            headers: {
               'Content-Type': 'application/json',
            }
       }).then(res => {
           return res.data;
       }).catch(() => {
           throw new FailedRequestException(url, this.endpoint, method, data, null);
       })
    }

    request(method, path, data) {
        const url = `${apiConf.url}/${this.endpoint}/path`;
        return axios({
            method,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearer}`
            }
        }).then(res => res.data).catch(() => {
            throw new FailedRequestException(url, this.endpoint, method, data, this.bearer);
        })
    }
}