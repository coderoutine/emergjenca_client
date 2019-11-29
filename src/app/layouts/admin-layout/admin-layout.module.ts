import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailsComponent } from 'app/pages/event-details/event-details.component';
import { AgmCoreModule } from '@agm/core';
import { SafetyZonesComponent } from 'app/pages/safety-zones/safety-zones.component';
import { ShelterCreateComponent } from 'app/pages/shelter-create/shelter-create.component';
import { SafetyZoneCreateComponent } from 'app/pages/safety-zone-create/safety-zone-create.component';
import { SupplyCreateComponent } from 'app/pages/supply-create/supply-create.component';
import { EventCreateComponent } from 'app/pages/event-create/event-create.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYZGue7QIrxD7ep8zWPSVXNvcCMCg8Lyw'
    }),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    EventDetailsComponent,
    ShelterCreateComponent,
    EventCreateComponent,
    SafetyZoneCreateComponent,
    SupplyCreateComponent,
    SafetyZonesComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
