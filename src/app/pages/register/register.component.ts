import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/sevices/account.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  hide = true;
  id: string;

  msgSubscription: any;

  professions = [
    'Electrician',
    'Plubmer',
    'Welder',
    'painter',
    'Handyman'
  ];
  experiances = [
    'Less than 6 Months',
    'Less than 1 year',
    'Less than 2 years',
    'More than 2 years'
  ];
  registerForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    fullName: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(14),
      Validators.pattern('^((\\+-?)|0)?[0-9]*')
    ]),
    profession: new FormControl('', [
      Validators.required,
    ]),
    experiance: new FormControl('', [
      Validators.required,
    ]),
    companyIndividual: new FormControl('Individual', [
      Validators.required,
    ]),
  });

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar, ) {
    this.id = this.idGeneretor();
    this.accountService.clearAuthStatusData();
    this.msgSubscription = this.accountService.getAuthStatusData().subscribe(data => {
      this.isLoading = false;
      if (data == null) {
        return;
      } else if (data == "a okay") {
        this.openSnackBar('You have registerd successfully.', 'OK');
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        })
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

  idGeneretor(): string {
    return Math.random().toString(36).substr(2, 20);
  }

  register() {
    this.isLoading = true;
    // console.log(this.registerForm);

    // console.log(this.registerForm.value);
    // console.log(this.registerForm.status);
    this.accountService.signUp(Object.assign({ id: this.id, data: this.registerForm.value }))
  }
}
