import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:AppServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    'Email': new FormControl('', Validators.required),
    'Password': new FormControl('', Validators.required)
  });

  loginSubmit() {
    if(this.loginForm.valid) {
      console.log('Login ts ', this.loginForm.value);
      this.service.loginData(this.loginForm.value).subscribe((res: any) => {
        console.log('res ', res);
        this.loginForm.reset();
        console.log(res.data, 'data come from backend');
        if(res.data[0].c == 1) {
          console.log("Login return data => ", res);
          console.log("User ID = ", res.data[0].u_id);
          this.service.setID(res.data[0].u_id);
          this.router.navigate(['/inside']);
        }
        else {
          alert('Please check the Email and Password!');
        }
      });
    }else {
      console.log('error');
    }
  }
}
