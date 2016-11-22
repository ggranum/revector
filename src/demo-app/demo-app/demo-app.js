"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Home = (function () {
    function Home() {
    }
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <p>Welcome to the development demos for Angular Material 2!</p>\n    <p>Open the sidenav to select a demo. </p>\n  "
        })
    ], Home);
    return Home;
}());
exports.Home = Home;
var DemoApp = (function () {
    function DemoApp() {
        this.navItems = [
            { name: 'Button', route: 'button' },
            { name: 'Inline Profile', route: 'inline-profile' },
            { name: 'Asciidoctor-panel', route: 'asciidoctor-panel' },
        ];
    }
    DemoApp = __decorate([
        core_1.Component({
            selector: 'demo-app',
            providers: [],
            templateUrl: 'demo-app.html',
            styleUrls: ['demo-app.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
        })
    ], DemoApp);
    return DemoApp;
}());
exports.DemoApp = DemoApp;
