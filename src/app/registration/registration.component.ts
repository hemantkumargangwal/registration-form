import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './api.servivce';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  styleUrls: ['./registration.component.css'],
  providers: [
    ApiService // Add ApiService to the providers array if not already added
  ],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // get formControls() {
  //   return this.registrationForm.controls;
  // }

  // onSubmit() {
  //   this.submitted = true;

  //   if (this.registrationForm.invalid) {
  //     return;
  //   }

  //   console.log('Form submitted successfully');
  //   console.log(this.registrationForm.value);
  //   // Handle form submission, e.g., send data to the server
  // }
  get formControls() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    // Submit data to API
    this.apiService.registerUser(this.registrationForm.value)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Handle success response here (e.g., show success message, redirect)
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle error response here (e.g., show error message)
        }
      );
  }
}
