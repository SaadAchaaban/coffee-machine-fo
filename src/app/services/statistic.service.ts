import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DailyStatisticRecord } from '../interfaces/DailyStatisticRecord.interface';
import { HourlyStatisticsRecord } from '../interfaces/HourlyStatisticsRecord.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private _dailyStatistics = new BehaviorSubject<any>(null);
  private _hourlyStatistics = new BehaviorSubject<any>(null);
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private readonly baseURL = 'https://localhost:7059';

  constructor(private http: HttpClient) { }

  get dailyStatistics(): Observable<any> {
    return this._dailyStatistics.asObservable();
  }

  get hourlyStatistics(): Observable<any> {
    return this._hourlyStatistics.asObservable();
  }

  fetchDailyStatistics() {
    this.http.get<DailyStatisticRecord>(`${this.baseURL}/Statistics/Daily`, { headers: this.headers })
      .subscribe({
        next: (stats) => {
          const statsArray = Object.entries(stats).map(([date, data]) => ({
            date,
            ...data
          }));
          this._dailyStatistics.next(statsArray);
        },
        error: (err) => {
          console.error("Failed to fetch daily statistics", err);
        }
      });
  }

  fetchHourlyStatistics() {
    this.http.get<HourlyStatisticsRecord>(`${this.baseURL}/Statistics/Hourly`, { headers: this.headers })
      .subscribe({
        next: (stats) => {
          const statsArray = Object.entries(stats).map(([date, hoursData]) => {
            const hoursArray = Object.entries(hoursData).map(([hourRange, count]) => ({
              hourRange,
              count
            }));
            return { date, hours: hoursArray };
          });
          this._hourlyStatistics.next(statsArray);
        },
        error: (err) => {
          console.error("Failed to fetch hourly statistics", err);
        }
      });
  }

}
