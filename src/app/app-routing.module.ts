import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'form',
    component: FormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
