import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiAuthorizationModule } from './api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from './api-authorization/authorize.interceptor';
import { DISQUS_SHORTNAME } from 'ngx-disqus';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NgbModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    ApiAuthorizationModule
  ],
  providers: [
    { provide: DISQUS_SHORTNAME, useValue: 'emergency-al' },
     { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
