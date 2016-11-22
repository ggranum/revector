"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AsciiDoctorPanelDemo = (function () {
    function AsciiDoctorPanelDemo() {
        this.asciidoctorContent = this.asciidoctorContent = "\n= Welcome to the ReVector Demo \nAuthor <geoff.granum@gmail.com>\n\nReVector is a pack of reusable, individually installable components, packaged similarly to Angular Material2. The packaging is a work in progress, due to some modularity issues with webpack, but we're getting there.  \n\nReVector focuses on widgets that are completely functional - a sign-in dialog that uses Reactive style patterns via NgRxStore to allow users to create accounts and actually sign-in, for example. However, it is our intention to enable reuse of the visual, UX components as standalone, developer-modifiable widgets.\n\nSome widgets, such as this one that is displaying AsciiDoc content, are purely UX; they have no dependencies on NgRx or on core/base service classes provided by ReVector. Others might have 'containers' that depend on NgRx and an active Firebase instance, but the component itself is consumable without those dependencies, such as sign-in-panel. \n\nSo for now, please feel free to bounce around this demo. Create an account and sign in. Navigate to the link:./admin[admin console] \n\n== Frameworks & technologies used by various ReVector components: \n\n* https://angular.io[Angular2]\n* https://github.com/angular/material2/[Angular Material 2]\n* https://firebase.google.com[Firebase]\n* https://github.com/ngrx/store[@ngrx]\n\n\n== Flagship 'Component': User management and authorization services for apps that use Firebase for backend services.\n\nRecreating authorization management for each new app you want to put on the web, bluntly, sucks. Firebase does a lot of the work for authentication management for us, but it doesn't provide permissions, roles, or content-level access control. So while it's great to not have to handle re-implementing the 27 different kinds of authorization... we still have to role our own access management. \n\nReVector was started to pursue the primary goal of providing an off-the-shelf module for access control, usable in Angular2, Firebase hosted web-apps. Because access control is the most tedious, boring, and, unfortunately, critical aspect of site development. Even throw-away sites need *proper* access control if they happen to collect any user data at all. Creating Rules in Firebase is a great and necessary start, but it's not automatically user-friendly.\n \nFor now we'll have to refer you directly to the https://github.com/ggranum/revector-demo/tree/master/src/app/services/auth-service[source code]. At some point - assuming there's demand - we'll add additional details describing the implementation.  \n\n== Available/proposed components:\n\n[options=\"header\"]\n|============================================================================================\n|                                  |Demo                              |Status\n|Sign-in Panel                     |link:./demo/sign-in-panel[link]   |Ready / Needs I18N\n|Sign-in Panel w/firebase          |link:./sign-in[link]              |Needs Tests\n|AsciiDoctor Panel                 |link:./demo/ascii-doctor[link]    |Ready, Needs Improvement\n|http://asciimath.org/[AsciiMath]  |                                  |Proposed\n|============================================================================================\n\n\n";
    }
    AsciiDoctorPanelDemo = __decorate([
        core_1.Component({
            selector: 'asciidoctor-panel-demo',
            templateUrl: 'asciidoctor-panel-demo.html',
            styleUrls: ['asciidoctor-panel-demo.scss'],
        })
    ], AsciiDoctorPanelDemo);
    return AsciiDoctorPanelDemo;
}());
exports.AsciiDoctorPanelDemo = AsciiDoctorPanelDemo;
