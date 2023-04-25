import {BaseModel} from "@/api/models/base.model";

export class UserTestAvailableModel extends BaseModel {
    constructor() {
        super("user-test-available");
    }

    getAvailableByCurrent() {
        return this.apiResolver.request('GET', `current/user`, null);
    }

    getAvailableByUser(userId) {
        return this.apiResolver.request('GET', `user/${userId}`, null);
    }
    
    save(data) {
      return this.apiResolver.request('POST', '', data)
    }
  
  updateRelatives(userId, data) {
      return this.apiResolver.request('PATCH', `update-relatives/${userId}`, data)
    }
}
