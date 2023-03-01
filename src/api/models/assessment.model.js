import {BaseModel} from "@/api/models/base.model";

export class AssessmentModel extends BaseModel {
    constructor() {
        super("assessment");
    }

    async getByProfession(profession_id) {
        return await this.apiResolver.request('GET', `profession/${profession_id}`, null);
    }
}