import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() error: string | null;

  @Output() submitted = new EventEmitter<User>();
  
  form: FormGroup = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', Validators.required)
});

  hide = true;
  get passwordInput() { return this.form.get('password'); } 
  
  constructor() { }
  
  ngOnInit() { }
  
  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }


}
