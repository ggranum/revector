import {Routes} from '@angular/router';
import {Home} from './demo-app';
import {ButtonDemo} from '../button/button-demo';
import {ButtonDemo2} from '../button2/button-demo2';

export const DEMO_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'button', component: ButtonDemo},
  {path: 'button2', component: ButtonDemo2}
];
