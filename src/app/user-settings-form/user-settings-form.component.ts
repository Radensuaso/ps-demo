import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: '',
    emailOffers: false,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: '',
  };

  userSettings: UserSettings = {
    ...this.originalUserSettings,
  };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes?: Observable<string[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
    this.dataService.postUserSettingsForm(this.userSettings).subscribe(
      (result) => console.log('success: ', result),
      (error) => this.onHttpError(error)
    );
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }
}
