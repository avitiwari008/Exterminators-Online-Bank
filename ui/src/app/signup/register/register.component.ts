import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
// import { SignupService } from 'src/app/services/signup.service';
import { map, debounceTime, take, switchMap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

// State for dropdown to select State in Address Form
interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  //set to true so that user can navigate to next section after only providing details on previous form
  isLinear = true;

  // form groups to bind form data
  personalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  credentialsFormGroup: FormGroup;
  ssnFormGroup: FormGroup;

  //variables to disable current and future dates in date picker
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(new Date().setDate(new Date().getDate() - 1))

  //States dropdown values
  states: State[] = [
    { value: 'AL', viewValue: 'Alabama' },
    { value: 'AK', viewValue: 'Alaska' },
    { value: 'AZ', viewValue: 'Arizona' },
    { value: 'AR', viewValue: 'Arkansas' },
    { value: 'CA', viewValue: 'California' },
    { value: 'CO', viewValue: 'Colorado' },
    { value: 'CT', viewValue: 'Connecticut' },
    { value: 'DE', viewValue: 'Delaware' },
    { value: 'FL', viewValue: 'Florida' },
    { value: 'GA', viewValue: 'Georgia' },
    { value: 'HI', viewValue: 'Hawaii' },
    { value: 'ID', viewValue: 'Idaho' },
    { value: 'IN', viewValue: 'Indiana' },
    { value: 'IL', viewValue: 'Illinois' },
    { value: 'IA', viewValue: 'Iowa' },
    { value: 'KS', viewValue: 'Kansas' },
    { value: 'KY', viewValue: 'Kentucky' },
    { value: 'LA', viewValue: 'Louisiana' },
    { value: 'ME', viewValue: 'Maine' },
    { value: 'MD', viewValue: 'Maryland' },
    { value: 'MA', viewValue: 'Massachusetts' },
    { value: 'MI', viewValue: 'Michigan' },
    { value: 'MN', viewValue: 'Minnisota' },
    { value: 'MS', viewValue: 'Mississipi' },
    { value: 'MO', viewValue: 'Missouri' },
    { value: 'MT', viewValue: 'Montana' },
    { value: 'NE', viewValue: 'Nebraska' },
    { value: 'NV', viewValue: 'Nevada' },
    { value: 'NH', viewValue: 'New Hampshire' },
    { value: 'NJ', viewValue: 'New Jersey' },
    { value: 'NM', viewValue: 'New Mexico' },
    { value: 'NY', viewValue: 'New York' },
    { value: 'NC', viewValue: 'North Carolina' },
    { value: 'ND', viewValue: 'North Dakota' },
    { value: 'OH', viewValue: 'Ohio' },
    { value: 'OK', viewValue: 'Oklahama' },
    { value: 'OR', viewValue: 'Oregon' },
    { value: 'PA', viewValue: 'Pennsylvania' },
    { value: 'RI', viewValue: 'Rhode Island' },
    { value: 'SC', viewValue: 'South Carolina' },
    { value: 'SD', viewValue: 'South Dakota' },
    { value: 'TN', viewValue: 'Tennessee' },
    { value: 'TX', viewValue: 'Texas' },
    { value: 'UT', viewValue: 'Utah' },
    { value: 'VT', viewValue: 'Vermont' },
    { value: 'VA', viewValue: 'Virginia' },
    { value: 'WA', viewValue: 'Washington' },
    { value: 'WV', viewValue: 'West Virginia' },
    { value: 'WI', viewValue: 'Wisconsin' },
    { value: 'WY', viewValue: 'Wyoming' },
  ];

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private service: RegisterService, private loginApi: LoginService) { }

  user: User = new User();
  users: User[] = [];
  userExists: boolean = false;

  ngOnInit(): void {
    //Validations on Personal Details Form
    this.personalFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      phoneNumberCtrl: ['', [Validators.required, Validators.minLength, Validators.pattern("^[0-9]*$")]],
      emailIDCtrl: ['', [Validators.required, Validators.email], [this.existingEmailValidator()]],
      dobCtrl: ['', [Validators.required]]
    });
    //Validations on address Details Form
    this.addressFormGroup = this._formBuilder.group({
      addressLine1Ctrl: ['', Validators.required],
      addressLine2Ctrl: ['', Validators.required],
      cityCtrl: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      stateCtrl: ['', Validators.required],
      zipCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)]]
    });
    //Validations on Credentials Form
    this.credentialsFormGroup = this._formBuilder.group({
      password: new FormControl('', [Validators.required,
      Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
    });
    //Validations on SSN Form
    this.ssnFormGroup = this._formBuilder.group({
      ssn: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    })

  }


  isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value === null || value.length === 0;
  }

  existingEmailValidator(initialEmail: string = ""): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      if (this.isEmptyInputValue(control.value)) {
        return of(null);
      } else if (control.value === initialEmail) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ =>
            this.loginApi.getUserByEmail(control.value)
              .pipe(
                map(user =>
                  user ? { existingEmail: { value: control.value } } : null
                )
              )
          )
        );
      }
    };
  }


  eventSelection(event) {
    alert(event.value);
    this.user.state = event.value;
    // console.log(this.user.state);
  }

  //below variables set to true to hide password and SSN on page load
  hide = true;
  hideSSN = true;

  //getting SSN and Password from User Input
  get passwordInput() { return this.credentialsFormGroup.get('password'); }
  get ssnInput() { return this.ssnFormGroup.get('ssn'); }


  saveUser(): void {

    //Personal info
    this.user.firstName = this.personalFormGroup.get('firstNameCtrl').value;
    this.user.lastName = this.personalFormGroup.get('lastNameCtrl').value;
    this.user.phoneNumber = this.personalFormGroup.get('phoneNumberCtrl').value;
    this.user.email = this.personalFormGroup.get('emailIDCtrl').value;
    this.user.dob = this.personalFormGroup.get('dobCtrl').value;
    //Address fields
    this.user.addressLine1 = this.addressFormGroup.get('addressLine1Ctrl').value;
    this.user.addressLine2 = this.addressFormGroup.get('addressLine2Ctrl').value;
    this.user.city = this.addressFormGroup.get('cityCtrl').value;
    this.user.state = this.addressFormGroup.get('stateCtrl').value;
    this.user.zip = this.addressFormGroup.get('zipCtrl').value;
    //Password
    //base64 encoded password
    this.user.password = btoa(this.credentialsFormGroup.get('password').value);
    //SSN Field
    this.user.ssn = this.ssnFormGroup.get('ssn').value;

    //register user and navigate to login page
    this.service.registerUser(this.user);

    this.router.navigate(['/login', {}]);
  }
}
