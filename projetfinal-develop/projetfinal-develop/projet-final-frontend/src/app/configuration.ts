import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class configuration {
    public backendServer = 'http://localhost:8080';
}