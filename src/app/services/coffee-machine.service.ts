import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CoffeeMachineState } from '../interfaces/CoffeeMachineState.interface';

@Injectable({
  providedIn: 'root'
})
export class CoffeeMachineService {

  private _state = new BehaviorSubject<CoffeeMachineState | null>(null);
  private headers = new HttpHeaders();
  private readonly baseURL = 'https://localhost:7059';

  get state() {
    return this._state.asObservable();
  }

  constructor( private http: HttpClient ) { }

  fetchState() {
    const headers = this.headers.set('accept', '*/*');
    this.http.get<CoffeeMachineState>(`${this.baseURL}/CoffeeMachine/GetCurrentState`, { headers })
      .subscribe({
        next: (state) => {
          state.IsInAlertState = state.beanFeedState === 1 || state.wasteCoffeeState === 1 || state.waterLevelState === 1 || state.waterTrayState === 1;
          this._state.next(state);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  startFetchInterval() {
    setInterval(() => {
      this.fetchState();
    }, 1000);
  }

  turnOn(): Observable<any> {
    const headers = this.headers.set('content-type', 'application/json')
    return this.http.post<any>(`${this.baseURL}/CoffeeMachine/TurnOn`, { headers });
  }

  turnOff(): Observable<any> {
    const headers = this.headers.set('content-type', 'application/json')
    return this.http.post<any>(`${this.baseURL}/CoffeeMachine/TurnOff`, { headers });
  }

  makeCoffee(): Observable<any> {
    const headers = this.headers.set('content-type', 'application/json')
    return this.http.post<any>(`${this.baseURL}/CoffeeMachine/MakeCoffee`, { headers });
  }
}
