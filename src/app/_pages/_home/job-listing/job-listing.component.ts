import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api';

interface JobPosts {
  company: string;
  title: string;
  subTitle: string;
  experience: string;
  salary: string;
  location: string;
  jobDescription: string;
}

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],
})
export class JobListingComponent implements OnInit {
  jobs: JobPosts[] = [];
  originalList: JobPosts[] = [];
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;

  sortField: string = 'company';
  sortKey = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<JobPosts[]>('http://localhost:8000').subscribe((data) => {
      this.jobs = data;
      this.originalList = data;
      const companies = Array.from(new Set(data.map((item) => item.company)));
      this.sortOptions = companies.map((item) => ({
        label: item,
        value: item,
      }));
      this.sortOptions.unshift({ label: 'All', value: null });
    });
  }

  onSortChange({ value }: SelectItem) {
    if (!value) {
      this.jobs = this.originalList;
    } else {
      this.jobs = this.originalList.filter((item) => item.company === value);
    }
  }
}
