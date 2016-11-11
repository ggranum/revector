import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'home',
  template: `
    <p>Welcome to the development demos for Angular Material 2!</p>
    <p>Open the sidenav to select a demo. </p>
  `
})
export class Home {}

@Component({
  selector: 'demo-app',
  providers: [],
  templateUrl: 'demo-app.html',
  styleUrls: ['demo-app.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoApp {
  navItems = [
    {name: 'Button', route: 'button'},
    {name: 'Button2', route: 'button2'},
  ];
}
