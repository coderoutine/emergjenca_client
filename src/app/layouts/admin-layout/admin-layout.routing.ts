import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { EventDetailsComponent } from 'app/pages/event-details/event-details.component';
import { SafetyZonesComponent } from 'app/pages/safety-zones/safety-zones.component';
import { ShelterCreateComponent } from 'app/pages/shelter-create/shelter-create.component';
import { SafetyZoneCreateComponent } from 'app/pages/safety-zone-create/safety-zone-create.component';
import { SupplyCreateComponent } from 'app/pages/supply-create/supply-create.component';
import { EventCreateComponent } from 'app/pages/event-create/event-create.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'event-create',      component: EventCreateComponent },
    { path: 'event-details/:id',      component: EventDetailsComponent },
    { path: 'safety-zones/:eventId/:type',      component: SafetyZonesComponent },
    { path: 'event-details/:id/shelter-create/:type',      component: ShelterCreateComponent },
    { path: 'event-details/:id/supply-create',      component: SupplyCreateComponent },
    // { path: 'notifications',  component: NotificationsComponent }
];
