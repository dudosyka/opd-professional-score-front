import {ApiResolverUtil} from "@/api/utils/api-resolver.util";

export class AuthorizationModel extends ApiResolverUtil {
    constructor() {
        super("user");
    }

    auth(credentials) {
        return this.unauthorizedRequest("POST", "login", credentials)
    }
}