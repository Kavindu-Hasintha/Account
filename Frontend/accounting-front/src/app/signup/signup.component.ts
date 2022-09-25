import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service:AppServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    'Username': new FormControl('', Validators.required),
    'Email': new FormControl('', Validators.required),
    'Password': new FormControl('', Validators.required),
    'RePassword': new FormControl('', Validators.required),
    'DoB': new FormControl('', Validators.required),
    'Sex': new FormControl('', Validators.required)
  });

  signUpSubmit() {
    if(this.signUpForm.valid) {
      console.log('SignUp => ', this.signUpForm.value);
      if(this.signUpForm.value.Password == this.signUpForm.value.RePassword) {
        this.service.signupData(this.signUpForm.value).subscribe((res: any) => {
          this.signUpForm.reset();
          if(res.data == 0) {
            console.log(res.data, ' returned value');
            alert('Account created successfully!');
            this.router.navigate(['/inside']);
          }
          else {
            console.log(res.data, 'returned value');
            alert('Email has used by another account!');
          }
        });
      }
      else {
        alert('Re-entered Password is not matching to the password!');
        this.signUpForm.reset();
      }
    }
    else {
      alert('All field is required!');
    }
  }

}
