import { HttpErrorResponse } from '@angular/common/http';

export interface ApiResponse {
    code?: number;
    message?: string;
    status: boolean;
    result?: any;
}

export interface ErrorResponse extends HttpErrorResponse {
    error: Partial<ApiResponse>;
}
