import {BaseModel} from "@/api/models/base.model";

export class UserTestModel extends BaseModel {
    constructor() {
        super("user-test");
    }
    
    saveResult(user_available_test, result) {
      return this.apiResolver.request('POST', '', { user_available_test, result })
    }

    async getTypes() {
      return await this.apiResolver.request('GET', 'types');
    }
    
    async getResultByType(test_id) {
      return await this.apiResolver.request('GET', `result/${test_id}/all`);
    }
    
    async getOneResult(result_id) {
      return await this.apiResolver.request('GET', `result/${result_id}`);
    }
}
