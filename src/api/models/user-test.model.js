import {BaseModel} from "@/api/models/base.model";

export class UserTestModel extends BaseModel {
    constructor() {
        super("user-test");
    }

    resultByUser(userId) {
        return this.apiResolver.request('GET', `result/${userId}`, null)
    }

    resultByCurrentUser() {
        return this.apiResolver.request('GET', 'current/result', null)
    }

    resultByUserAndTest(userId, testId) {
        return this.apiResolver.request('GET', `result/${userId}/${testId}`)
    }

    resultByCurrentUserAndTest(testId) {
        return this.apiResolver.request('GET', `current/result/${testId}`, null);
    }
}
