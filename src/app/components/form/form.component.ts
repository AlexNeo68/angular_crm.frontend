import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { Source } from 'src/app/models/source';
import { Status } from 'src/app/models/status';
import { Task } from 'src/app/models/task';
import { Unit } from 'src/app/models/unit';
import { User } from 'src/app/models/user';
import { LeadService } from 'src/app/services/lead.service';
import { SourceService } from 'src/app/services/source.service';
import { StatusService } from 'src/app/services/status.service';
import { TaskService } from 'src/app/services/task.service';
import { UnitService } from 'src/app/services/unit.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  lead: Lead;
  task: Task;
  isLead: boolean;

  units: Unit[];
  statuses: Status[];
  sources: Source[];
  users: User[];

  addSaleCount: number = 0;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private statusService: StatusService,
    private sourceService: SourceService,
    private userService: UserService,
    private leadService: LeadService,
    private taskService: TaskService,
    private toastService: MatSnackBar
  ) {
    this.lead = new Lead();
    this.task = new Task();
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.getUnits();
    this.getSources();
    this.getStatuses();
    this.getUsers();
    this.form = this.fb.group({
      linkPhone: new FormGroup(
        {
          link: new FormControl(''),
          phone: new FormControl(''),
        },
        this.RequireLinkPhone()
      ),

      source_id: new FormControl('', Validators.required),
      unit_id: new FormControl('', Validators.required),

      is_processed: new FormControl('', Validators.required),
      is_express_delivery: new FormControl('', Validators.required),
      is_add_sale: new FormControl('', Validators.required),

      text: new FormControl(''),
      responsible_id: new FormControl(''),
      is_lead: new FormControl(true),
    });

    this.onChangesIsLead();
  }
  onChangesIsLead() {
    throw new Error('Method not implemented.');
  }
  RequireLinkPhone():
    | import('@angular/forms').ValidatorFn
    | import('@angular/forms').ValidatorFn[]
    | import('@angular/forms').AbstractControlOptions {
    return (group: FormGroup): ValidationErrors => {
      const link = group.controls['link'];
      const phone = group.controls['phone'];

      if ((!link.value && !phone.value) || (link.value && phone.value)) {
        link.setErrors({ RequireLinkPhone: true });
        phone.setErrors({ RequireLinkPhone: true });
        return { RequireLinkPhone: true };
      } else {
        link.setErrors(null);
        phone.setErrors(null);
        return null;
      }
    };
  }
  getUnits() {
    this.unitService.getUnits().subscribe((data: Unit[]) => {
      this.units = data;
    });
  }
  getStatuses() {
    this.statusService.getStatuses().subscribe((data: Status[]) => {
      this.statuses = data;
    });
  }
  getSources() {
    this.sourceService.getSources().subscribe((data: Source[]) => {
      this.sources = data;
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {}
}
