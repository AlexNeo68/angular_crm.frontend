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

  openHistory(event, lead: Lead, index: number, leads: Lead[]): void {
    return;
  }

  datecheck(created_at: number, numb: number, type: string): boolean {
    if (type == 'less') {
      return (
        this.dateHelper('h', new Date(created_at * 1000), new Date()) < numb
      );
    }

    if (type == 'more') {
      return (
        this.dateHelper('h', new Date(created_at * 1000), new Date()) > numb
      );
    }

    return false;
  }

  dateHelper(datePart: string, fromDate: any, today: any): number {
    datePart = datePart.toLowerCase();
    let diff = today - fromDate;

    let divideBy = {
      w: 604800000,
      d: 86400000,
      h: 3600000,
      n: 60000,
      s: 1000,
    };

    return Math.floor(diff / divideBy[datePart]);
  }

  timeStr(fromDate: any): string {
    let resultDate = this.dateHelper(
      'h',
      new Date(fromDate * 1000),
      new Date()
    );

    let result = '';
    if (resultDate < 24) {
      result = 'до 24 часов';
    } else if (resultDate > 24 && resultDate < 48) {
      result = '24-48 часа';
    } else if (resultDate > 48 && resultDate < 72) {
      result = '48-72 часа';
    } else {
      result = '72 часа и более';
    }

    return result;
  }
}
