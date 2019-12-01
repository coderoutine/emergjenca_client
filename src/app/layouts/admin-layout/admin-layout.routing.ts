import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { EventDetailsComponent } from 'app/pages/event-details/event-details.component';
import { ShelterCreateComponent } from 'app/pages/shelter-create/shelter-create.component';
import { SupplyCreateComponent } from 'app/pages/supply-create/supply-create.component';
import { EventCreateComponent } from 'app/pages/event-create/event-create.component';
import { AuthorizeGuard } from 'app/api-authorization/authorize.guard';
import { ShelterUpdateComponent } from 'app/pages/shelter-update/shelter-update.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'event-create',      component: EventCreateComponent },
    { path: 'event-details/:id',      component: EventDetailsComponent },
    { path: 'event-details/:id/shelter-create/:type',      component: ShelterCreateComponent,canActivate: [AuthorizeGuard] },
    { path: 'event-details/:id/shelter-update/:shelterId',      component: ShelterUpdateComponent,canActivate: [AuthorizeGuard] },
    { path: 'event-details/:id/supply-create',      component: SupplyCreateComponent,canActivate: [AuthorizeGuard] },
    // { path: 'notifications',  component: NotificationsComponent }
];
