import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class LoginEventService {
    private notifySubject = new Subject<void>();
    notifyObservable = this.notifySubject.asObservable();

    constructor() { }

    notifyOtherComponent() {
        this.notifySubject.next();
    }
}