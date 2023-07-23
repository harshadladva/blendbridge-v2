import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { JobListingComponent } from './job-listing.component';

const routes: Routes = [
  {
    path: '',
    component: JobListingComponent,
  },
];

@NgModule({
  declarations: [JobListingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DataViewModule,
    CardModule,
    DropdownModule,
    HttpClientModule,
  ],
})
export class JobListingModule {}
