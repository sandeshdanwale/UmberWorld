import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
    mode: string;
    constructor() {
        this.mode = "Buy";
    }
}