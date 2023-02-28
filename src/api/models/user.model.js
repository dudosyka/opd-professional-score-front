import {BaseModel} from "@/api/models/base.model";

export class UserModel extends BaseModel {
    constructor() {
        super("user");
    }

    getCurrent() {
        return this.apiResolver.request('GET', 'cur', null);
    }
}