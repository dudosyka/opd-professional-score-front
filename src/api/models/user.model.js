import {BaseModel} from "@/api/models/base.model";

export class UserModel extends BaseModel {
    constructor() {
        super("user");
    }

    getCurrent() {
        return this.apiResolver.request('GET', 'cur', null);
    }

    getAllResp() {
        return this.apiResolver.request('GET', 'all/resp', null);
    }
    
    rate(id, answerData) {
      return this.apiResolver.request('POST', `profile/rate/${id}`, {
        answer: answerData.answer
      })
    }
    
    rateSelf() {
      return this.apiResolver.request('GET', `profile/rate`, null)
    }
}