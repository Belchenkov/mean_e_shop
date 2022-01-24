import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { IUser, IUsersListResponse, UsersService } from '@frontend/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usersService.deleteUser(userId)
          .subscribe(() => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success!',
              detail: 'User is deleted!'
            });
          }, (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error!',
              detail: error.message
            });
          });
      },
      reject: () => {}
    });
  }

  updateUser(userId: string): void {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  private _getUsers() {
    this.usersService.getUsers()
      .subscribe((res: IUsersListResponse) => {
        if (res.success) {
          this.users = res.users;
        }
      });
  }
}
