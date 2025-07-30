import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/config';

bootstrapApplication(App, appConfig).catch(err => console.error(err));
