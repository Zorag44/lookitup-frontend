import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  public buttonClickEvent: EventEmitter<void> = new EventEmitter<void>();
}
