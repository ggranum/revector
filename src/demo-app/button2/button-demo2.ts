import {Component} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'button-demo2',
  templateUrl: 'button-demo2.html',
  styleUrls: ['button-demo2.css'],
})
export class ButtonDemo2 {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
