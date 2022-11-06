import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'app-login-form',
    template: '<div></div>',
})
export class LoginFormComponent {
    public loginForm:FormGroup = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email]),
			password: new FormControl('', [
				Validators.required,
			]),
    });
}