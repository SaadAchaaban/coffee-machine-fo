import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoffeeMachineService } from './services/coffee-machine.service';
import { CoffeeMachineState } from './interfaces/CoffeeMachineState.interface';
import { StatisticService } from './services/statistic.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ICoffeeMachine';
  state: CoffeeMachineState | null = null;
  dailyStatistics: any;
  hourlyStatistics: any;

  constructor(
    private coffeeMachineService: CoffeeMachineService,
    private statisticService: StatisticService,
  ) {}

  ngOnInit(): void {
    this.coffeeMachineService.startFetchInterval();
    this.statisticService.fetchDailyStatistics();
    this.statisticService.fetchHourlyStatistics();
    this.coffeeMachineService.state.subscribe(state => {
      this.state = state;
    });
    this.statisticService.dailyStatistics.subscribe(dailyStatistics => {
      this.dailyStatistics = dailyStatistics;
    });
    this.statisticService.hourlyStatistics.subscribe(hourlyStatistics => {
      this.hourlyStatistics = hourlyStatistics;
    });
  }

  turnOnMachine(): void {
    this.coffeeMachineService.turnOn().subscribe({
      next: async (result: any) => {
        if (this.state) {
            this.state.isOn = true;
        }
      },
      error: async (err: any) => {
          console.log("AppComponent::turnOnMachine => error =", err);
      },
      complete: () => {}
    });
  }

  turnOffMachine(): void {
    this.coffeeMachineService.turnOff().subscribe({
      next: async (result: any) => {
        if (this.state) {
          this.state.isOn = false;
        }
      },
      error: async (err: any) => {
          console.log("AppComponent::turnOffMachine => error =", err);
      },
      complete: () => {}
    });
  }

  makeCoffee(): void {
    this.coffeeMachineService.makeCoffee().subscribe({
      next: async (result: any) => {
        this.statisticService.fetchDailyStatistics();
        this.statisticService.fetchHourlyStatistics();
      },
      error: async (err: any) => {
          console.log("AppComponent::makeCoffee => error =", err);
      },
      complete: () => {}
    });
  }

}
