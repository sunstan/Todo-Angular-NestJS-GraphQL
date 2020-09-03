import {Observable, of, throwError} from 'rxjs';

export function extract(body: any, name: string): Observable<any> {
    if (body.data && body.data[name] !== undefined)
        return of(body.data[name]);

    throwError(body.errors || 'Unknown error');
}
