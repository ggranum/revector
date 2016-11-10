import {Routes} from '@angular/router';
import {Home} from './demo-app';
import {ButtonDemo} from '../button/button-demo';
import {ButtonDemo2} from '../asciidoctor-panel/asciidoctor-panel-demo';

export const DEMO_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'button', component: ButtonDemo},
  {path: 'button2', component: ButtonDemo2}
];
