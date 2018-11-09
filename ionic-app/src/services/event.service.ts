import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class EventService {
  constructor(
    private apiService: ApiService
  ) {
  }

  getEvents() {
    return this.apiService.get('events');
  }
}
