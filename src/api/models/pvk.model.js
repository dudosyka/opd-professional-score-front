import {BaseModel} from "@/api/models/base.model";

export class PvkModel extends BaseModel {
    constructor() {
        super("pvk");
    }
    
    async updateCriteria(id, criteria) {
      this.apiResolver.request('POST', `${id}/criteria`, { criteria })
    }
}