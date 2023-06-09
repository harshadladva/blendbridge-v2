import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobListingComponent } from './job-listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

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
    DropdownModule,
    HttpClientModule
  ],
})
export class JobListingModule {}
