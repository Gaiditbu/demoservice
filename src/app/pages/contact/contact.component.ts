import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  };

  submitForm(form: any) {
    if (form.valid) {
      // Submit the form data to your server or perform other actions
      console.log(this.formData);
    } else {
      // Handle form validation errors
      console.log('Form is invalid. Please check the fields.');
    }
  }
}