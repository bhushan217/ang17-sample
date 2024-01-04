import { Routes } from '@angular/router';
import { ConfigAdminComponent } from './components/config-admin/config-admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { JsonReferenceComponent } from './shared/components/formly/json-reference/json-reference.component';

export const routes: Routes = [
  {
    path:'', pathMatch: 'full', redirectTo: '/config-admin'
  },
  { path:'config-admin', component: ConfigAdminComponent, title: 'Config Admin', data:{icon: '🎫'}}, 
  { path:'json-reference', component: JsonReferenceComponent, title: 'Json Ref', data:{icon: '👨🏿‍💻'}}, 
  { path: '**', component: PageNotFoundComponent, title: '404 PNF'}
];
