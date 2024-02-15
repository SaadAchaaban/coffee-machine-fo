import { TestBed } from '@angular/core/testing';

import { CoffeeMachineService } from './coffee-machine.service';

describe('CoffeeMachineService', () => {
  let service: CoffeeMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
