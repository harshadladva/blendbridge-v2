import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helper/guards/_auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./_pages/_account/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./_pages/_home/job-listing/job-listing.module').then(
        (m) => m.JobListingModule
      ),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
