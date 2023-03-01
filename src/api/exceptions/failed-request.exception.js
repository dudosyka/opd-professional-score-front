export class FailedRequestException extends Error {
    fullPath = "";
    endpoint = "";
    method = "";
    data = {};
    bearer = "";
    statusCode = 0;
    constructor(fullPath, endpoint, method, data, bearer, statusCode) {
        super();
        this.fullPath = fullPath;
        this.endpoint = endpoint;
        this.method = method;
        this.data = data;
        this.bearer = bearer;
        this.statusCode = statusCode;
    }
}