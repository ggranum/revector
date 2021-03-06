import {Routes} from '@angular/router';
import {Home} from './demo-app';
import {ButtonDemo} from '../button/button-demo';
import {AsciiDoctorPanelDemo} from '../asciidoctor-panel/asciidoctor-panel-demo';
import {InlineProfileDemo} from "../ux/inline-profile-demo";

export const DEMO_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'button', component: ButtonDemo},
  {path: 'asciidoctor-panel', component: AsciiDoctorPanelDemo},
  {path: 'inline-profile', component: InlineProfileDemo}
];
