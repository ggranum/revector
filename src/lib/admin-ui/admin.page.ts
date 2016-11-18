import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from "@angular/core";
import {
  Params,
  Router,
  ActivatedRoute
} from "@angular/router";
import {AuthStoreState} from "@revector/auth-service";
import {Store} from "@ngrx/store";

@Component({
  selector: 'rv-admin-page',
  template: `<div class='admin-page-content' layout="row" layout-align="center">
  <md-tab-group flex color="primary" [selectedIndex]="1">
    <md-tab label="Users">
      <rv-user-list></rv-user-list>
    </md-tab>
    <md-tab label="Roles">
      <rv-role-list></rv-role-list>
    </md-tab>
    <md-tab label="Permissions">
      <rv-permission-list></rv-permission-list>
    </md-tab>
  </md-tab-group>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AdminPage {


  constructor(private route: ActivatedRoute, private router: Router, private _store: Store<AuthStoreState>) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
    });


  }

}
