import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  user: any = {};
  emailId: any;
  password: any;
  submitted = false;
  userToken: string = '';
  pageName: string = '';
  pathname: string = '';
  ngOnInit(): void {
    // window.location.pathname would be something like '/login'
    this.pathname = window.location.pathname.split('/').pop();
    console.log(this.pathname)
    this.pageName = this.pathname === 'login' ? 'Login' : 'SignUp';
  }

  login() {
    console.log(this.emailId, this.password);
    const postObj = {
      emailId: this.emailId,
      password: this.password,
    };
    if (this.pageName === 'SignUp') {
      this.loginService.signUp(postObj).subscribe((res) => {
        console.log('res======', res);
        this.router.navigate(['/login']);
      });
    } else {
      this.loginService.login(postObj).subscribe((res) => {
        console.log('res======', res);
        if (res.status === 'failure') {
          alert(res.message)
        }
        localStorage.setItem('JWT', res.JWT);
        this.router.navigate(['/home']);
      });
    }
  }
}
