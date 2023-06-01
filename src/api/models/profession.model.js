import {BaseModel} from "@/api/models/base.model";

export class ProfessionModel extends BaseModel {
    constructor() {
        super("profession");
    }
    
    updatePvk(id, gradedList) {
      this.apiResolver.request('POST', `${id}/pvk`, {
        pvk: gradedList
      })
    }
}