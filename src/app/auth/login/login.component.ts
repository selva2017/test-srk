import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoader: boolean;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading =>{
      this.isLoading = isLoading;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        // validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  // onSubmit() {
  //   this.authService.login({
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password
  //   });
  // }
  onSubmit(form: NgForm) {
    this.showLoader = true;
    // this.user.email = form.value.email;
    // this.user.password = form.value.password;
    // console.log(this.loginForm.value.email, this.loginForm.value.password);
    this.authService.signinUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    // if (!this.authService.isAuthenticated())
    //   this.error_msg = "Invalid username or password.";
    // else
    // this.error_msg = "";
    this.showLoader = false;
  }
  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }
}
