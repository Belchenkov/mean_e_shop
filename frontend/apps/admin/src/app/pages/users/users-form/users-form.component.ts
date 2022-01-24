import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

import { IUser, UsersService } from '@frontend/users';
import { IUsersItemResponse } from '../../../../../../../libs/users/src/lib/models/users-item-response';

@Component({
  selector: 'frontend-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentUserId: string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this._checkEditMode();
  }

  get userForm() {
    return this.form.controls;
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    this.isSubmitted = true;
    if (this.form.invalid) return;

    const user: IUser = {
      id: this.currentUserId,
      name: this.userForm.name.value,
    };

    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  private _checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(this.currentUserId)
          .subscribe((res: IUsersItemResponse) => {
            if (res.success) {
              this.userForm.name.setValue(res.user.name);
            }
          });
      }
    });
  }

  private _updateUser(user: IUser): void {
    this.usersService.updateUser(user)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: `User ${user.name} is updated!`
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back())
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.message
        });
      })
  }

  private _addUser(user: IUser): void {
    this.usersService.createUser(user)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: `User ${user.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back())
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.message
        });
      })
  }
}
