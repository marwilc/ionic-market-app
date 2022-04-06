import { Injectable } from '@angular/core';
import { DEPARTMENTS } from '@core/mocks/departaments.mock';
import { MOCK_RESPONSE } from '@core/mocks/products.mock';
import { ApiResponse } from '@core/models/apiResponse.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    constructor() {}

    /**
     * get departments
     *
     * @return {*}  {Observable<ApiResponse>}
     * @memberof DepartmentService
     */
    getDepartments(): Observable<ApiResponse> {
        return of({
            ...MOCK_RESPONSE,
            result: DEPARTMENTS,
        });
    }
}
