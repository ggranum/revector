import {join} from 'path';

//noinspection TypeScriptUnresolvedVariable
export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');

export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const DIST_COMPONENTS_ROOT = join(DIST_ROOT, '@revector');


export const NPM_VENDOR_FILES = [
  '@angular',
  'core-js/client',
  'firebase',
  'hammerjs',
  'rxjs',
  'angularfire2/**/*.js',
  'systemjs/dist',
  'zone.js/dist'
];
