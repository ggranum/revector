import '../polyfills.ts';


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DemoAppModule} from './demo-app-module';

console.log('Hello world.', 'Hi')
platformBrowserDynamic().bootstrapModule(DemoAppModule);
