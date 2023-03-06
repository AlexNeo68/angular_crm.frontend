import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  nLeads: Lead[];
  dLeads: Lead[];
  processingLeads: Lead[];

  leadExpress: boolean = false;
  leadProcess: boolean = false;

  dLeadQuality: boolean = false;
  dLeadQualityFalse: boolean = false;

  processingLeadProcess: boolean = false;

  constructor(
    private leadService: LeadService,
    private toastService: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.leadService.getLeads().subscribe((data) => {
      this.nLeads = data.new;
      this.dLeads = data.done;
      this.processingLeads = data.process;
    });
  }
}
