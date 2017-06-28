import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor(
    ) {
    }

    public isNull(str: string): boolean {
        if (!str) {
            return true;
        }
        if (str == '') {
            return true;
        }
        if (typeof str == 'undefined') {
            return true;
        }
        return false;
    }

}