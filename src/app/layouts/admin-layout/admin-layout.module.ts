import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailsComponent } from 'app/pages/event-details/event-details.component';
import { AgmCoreModule } from '@agm/core';
import { ShelterCreateComponent } from 'app/pages/shelter-create/shelter-create.component';
import { ShelterUpdateComponent } from 'app/pages/shelter-update/shelter-update.component';
import { SupplyCreateComponent } from 'app/pages/supply-create/supply-create.component';
import { EventCreateComponent } from 'app/pages/event-create/event-create.component';
import { DisqusModule } from 'ngx-disqus';
import { SupplyUpdateComponent } from 'app/pages/supply-update/supply-update.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYZGue7QIrxD7ep8zWPSVXNvcCMCg8Lyw'
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DisqusModule
  ],
  declarations: [
    DashboardComponent,
    EventDetailsComponent,
    ShelterCreateComponent,
    ShelterUpdateComponent,
    SupplyUpdateComponent,
    EventCreateComponent,
    SupplyCreateComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
