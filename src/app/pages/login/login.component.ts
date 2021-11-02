import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/sevices/account.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  showPassword = false;

  msgSubscription: any;

  loginForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar,) {

      this.msgSubscription = this.accountService.getAuthStatusData().subscribe(data => {
        this.isLoading = false;
        // console.log(data)
        if (data == null) {
          return;
        } else if (data == "You have been successfully registered."
          || data == "You have been successfully logged in.") {
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          })
        } else if (data.includes('no user record')) {
          this.loginForm.controls['email'].setErrors({ emailDontExists: true });
          this.loginForm.controls['email'].markAllAsTouched();
        } else if (this.loginForm.controls['email'].errors
          && !this.loginForm.controls['email'].errors.emailDontExists) {
          this.loginForm.controls['email'].setErrors(null);
          this.loginForm.controls['email'].markAllAsTouched();
        } else if (data.includes('password is invalid')) {
          this.loginForm.controls['password'].setErrors({ wrongPassword: true });
          this.loginForm.controls['password'].markAllAsTouched();
        } else if (this.loginForm.controls['password'].errors
          && !this.loginForm.controls['password'].errors.wrongPassword) {
          this.loginForm.controls['password'].setErrors(null);
          this.loginForm.controls['password'].markAllAsTouched();
        } else if (data.includes('network error')) {
          this.openSnackBar('Couldnt connect to the intenet.', 'OK');
        } else {
          this.openSnackBar('Something went wrong, try again later.', 'OK');
          // console.log(data);
        }
      });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.isLoading = true;
    // console.log(this.loginForm);

    // console.log(this.loginForm.value);
    // console.log(this.loginForm.status);
    this.accountService.signIn(this.loginForm.value)
  }

}
