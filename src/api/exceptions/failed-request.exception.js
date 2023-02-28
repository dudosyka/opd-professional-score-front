export class FailedRequestException extends Error {
    fullPath = "";
    endpoint = "";
    method = "";
    data = {};
    bearer = "";
    constructor(fullPath, endpoint, method, data, bearer) {
        super();
        this.fullPath = fullPath;
        this.endpoint = endpoint;
        this.method = method;
        this.data = data;
        this.bearer = bearer;
    }
}