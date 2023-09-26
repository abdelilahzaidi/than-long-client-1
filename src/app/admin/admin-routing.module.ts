import { UserEditComponent } from './user-edit/user-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsersComponent } from '../users/users.component';
import { AuthGuardAdmin } from '../guards/auth-admin.guard';
import { userResolver } from './user-edit/user.resolver';
import { AdminComponent } from './container/admin.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path:'admin-home',component:HomeComponent,canActivate: [AuthGuardAdmin]},
  {path:'user-new',component:UserNewComponent},
  {path:'user',component:UserComponent, canActivate: [AuthGuard]},
  {path:'users',component:UsersComponent, canActivate: [AuthGuard]},
  {path:'user-edit/:id',component:UserEditComponent, resolve: { user: userResolver() }}

];

// const routes: Routes = [
//   { path: 'admin', component: AdminComponent, children: [
//     {path: 'user-new', component: UserNewComponent },
//     { path: 'user-new', component: MenuComponent, outlet: 'menu' }
//   ] },
// ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
