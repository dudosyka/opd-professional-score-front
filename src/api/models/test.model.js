import {BaseModel} from "@/api/models/base.model";

export class TestModel extends BaseModel {
    constructor() {
        super('test');
    }
    
    async getParams(id) {
      return await this.apiResolver.request('GET', `${id}/params`, null);
    }
    
    
}