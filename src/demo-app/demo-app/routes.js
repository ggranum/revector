"use strict";
var demo_app_1 = require('./demo-app');
var button_demo_1 = require('../button/button-demo');
var asciidoctor_panel_demo_1 = require('../asciidoctor-panel/asciidoctor-panel-demo');
var inline_profile_demo_1 = require("../ux/inline-profile-demo");
exports.DEMO_APP_ROUTES = [
    { path: '', component: demo_app_1.Home },
    { path: 'button', component: button_demo_1.ButtonDemo },
    { path: 'asciidoctor-panel', component: asciidoctor_panel_demo_1.AsciiDoctorPanelDemo },
    { path: 'inline-profile', component: inline_profile_demo_1.InlineProfileDemo }
];
