import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ICoffeeMachine';
  
  state = {
    isOn: false,
    isMakingCoffee: false,
    waterLevelState: 0,
    beanFeedState: 0,
    wasteCoffeeState: 0,
    waterTrayState: 0,
  }

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

  turnOnMachine(): void {}
  turnOffMachine(): void {}
  makeCoffee(): void {}

}
