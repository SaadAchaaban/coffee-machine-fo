import { State } from "../enums/State";

export interface CoffeeMachineState {
  isOn: boolean;
  isMakingCoffee: boolean;
  IsInAlertState?: boolean;
  waterLevelState: State;
  beanFeedState: State;
  wasteCoffeeState: State;
  waterTrayState: State;
}
