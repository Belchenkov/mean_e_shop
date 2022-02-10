import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

import { IUser, UsersService } from '@frontend/users';
import { IUsersItemResponse } from '../../../../../../../libs/users/src/lib/models/users-item-response';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'frontend-users-form',
  templateUrl: './users-form.component.html',
  styles: []
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentUserId: string;
  countries: { name: string; id: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
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
      password: this.userForm.password.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
    };

    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
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
              this.userForm.email.setValue(res.user.email);
              this.userForm.isAdmin.setValue(res.user.isAdmin);
              this.userForm.street.setValue(res.user.street);
              this.userForm.apartment.setValue(res.user.apartment);
              this.userForm.zip.setValue(res.user.zip);
              this.userForm.city.setValue(res.user.city);
              this.userForm.country.setValue(res.user.country);
              this.userForm.password.setValidators([]);
              this.userForm.password.updateValueAndValidity();
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

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' }))
      .map(entry => {
        return {
          id: entry[0],
          name: entry[1],
        }
      });
  }
}
