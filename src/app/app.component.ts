import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoffeeMachineService } from './services/coffee-machine.service';
import { CoffeeMachineState } from './interfaces/CoffeeMachineState.interface';

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

  coffeeData = {
    "14/02/2024": {
      "firstCupTime": "15:27",
      "lastCupTime": "15:27",
      "averageCups": 1
    },
    "15/02/2024": {
      "firstCupTime": "14:54",
      "lastCupTime": "16:19",
      "averageCups": 7
    }
  };

  coffeeDataArray = Object.entries(this.coffeeData).map(([date, data]) => ({
    date,
    ...data
  }));

  coffeeHourlyData = {
    "14/02/2024": {
      "15-16": 1
    },
    "15/02/2024": {
      "14-15": 5,
      "16-17": 2
    }
  };

  coffeeHourlyDataArray = Object.entries(this.coffeeHourlyData).map(([date, hours]) => ({
    date,
    hours: Object.entries(hours).map(([hourRange, cups]) => ({hourRange, cups}))
  }));

  constructor(
    private coffeeMachineService: CoffeeMachineService,
  ) {}

  ngOnInit(): void {
    this.coffeeMachineService.startFetchInterval();
    this.coffeeMachineService.state.subscribe(state => {
      this.state = state;
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
          console.log("error", err);
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
          console.log("error", err);
      },
      complete: () => {}
    });
  }

  makeCoffee(): void {
    this.coffeeMachineService.makeCoffee().subscribe({
      next: async (result: any) => {
        console.log("result", result);
      },
      error: async (err: any) => {
          console.log("error", err);
      },
      complete: () => {}
    });
  }

}
