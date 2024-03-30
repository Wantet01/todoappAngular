import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    console.log('calling....')
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      
      const apiUrl = 'https://todo-app-be-nu.vercel.app/api/todos/login';

      this.http.post<any>(apiUrl, { email, password }).subscribe(
        response => {
          if (response.status === 200) {
            // Save token in local storage
            localStorage.setItem('accessToken', response.accessToken);

            // Display success message
            alert(response.message);

            // Redirect to dashboard
            this.router.navigate(['/dashboard']);
          } else {
            // Display error message
           alert(response.message);
          }
        },
        error => {
          // Handle HTTP error
          console.error('Error:', error);
          alert('An error occurred. Please try again later.');
        }
      );
    }
  }

  
 }
