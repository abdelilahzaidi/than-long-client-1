import { UserEditComponent } from './user-edit/user-edit.component';
UserEditComponent
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserNewComponent } from './user-new/user-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './container/admin.component';
import { MenuComponent } from './menu/menu.component';
import { ProgramComponent } from './home/program/program.component';



@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    UserNewComponent,
    UserEditComponent,
    AdminComponent,
    MenuComponent,
    ProgramComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
