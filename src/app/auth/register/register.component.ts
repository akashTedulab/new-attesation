import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  initials_gender:any;
  isLinear = true;
  textFieldTypee!:boolean;
  isTextFieldType!: boolean;
  svg:any;
  isValidThirdForm!: boolean;

	readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	readonly charValidate = /^[.a-zA-Z ]*$/;
	readonly postalValidate = /^[a-zA-Z0-9 ]+$/;
	readonly mobileValidate =/^[0-9]\d{5,12}$/;
	readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;

  constructor(private fb: FormBuilder) {}
  title = 'app';

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstNameCtrl: [
        '',
        [
          Validators.pattern(this.charValidate),
          Validators.required,
          Validators.maxLength(70),
          Validators.minLength(3),
        ],
      ],
      LastNameCtrl: [
        '',
        [
          Validators.pattern(this.charValidate),
          Validators.required,
          Validators.maxLength(70),
          Validators.minLength(2),
          Validators.pattern(/^\S*$/),
        ],
      ],
    });

    this.secondFormGroup = this.fb.group({
      genderCtrl: ['', Validators.required],
    });

    this.thirdFormGroup= this.fb.group({
			emailCtrl : ['', [ Validators.required, Validators.pattern(this.emailValidate)]],
			passwordCtrl : ['',[Validators.required, Validators.pattern(this.passwordValidate)]],
			repasswordCtrl : ['',[Validators.required, Validators.pattern(this.passwordValidate)]],
			phoneCtrl:['', [ Validators.required, Validators.pattern(this.mobileValidate)]],
			captchaCtrl:['', Validators.required],
		});

}

radioChange(event:any) {
  if(event){
    if(event=='Male'){
      this.initials_gender = "Mr.";
      this.secondFormGroup.patchValue({
        genderCtrl : event
      })
    }else if(event=='Female'){
      this.initials_gender = "Ms.";
      this.secondFormGroup.patchValue({
        genderCtrl : event
      })
    }else if(event=='Transgender'){
      this.initials_gender = " ";
      this.secondFormGroup.patchValue({
        genderCtrl : event
      })


    }
  }
}

showHidePassword(){
  this.isTextFieldType = !this.isTextFieldType;
}

showHideConfirmPassword(){
  this.textFieldTypee = !this.textFieldTypee;
}

register(){
    this.thirdFormGroup.controls.emailCtrl.markAsDirty();
		this.thirdFormGroup.controls.passwordCtrl.markAsDirty();
		this.thirdFormGroup.controls.repasswordCtrl.markAsDirty();
		this.thirdFormGroup.controls.phoneCtrl.markAsDirty();
		this.thirdFormGroup.controls.captchaCtrl.markAsDirty();


    if(this.thirdFormGroup.controls.passwordCtrl.value == this.thirdFormGroup.controls.repasswordCtrl.value){
			if(this.thirdFormGroup.valid){
        console.log("Hellooooo")
      }
      } else {
        console.log("Password not matched")
    }
  }

}
