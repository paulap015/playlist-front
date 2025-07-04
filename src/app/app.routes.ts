import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { CreateComponent } from './playlist/create/create.component';
import { ListComponent } from './playlist/list/list.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'list', component: ListComponent },

    ]
  }
];
