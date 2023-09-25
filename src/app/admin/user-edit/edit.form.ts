import { FormControl, FormGroup, Validators } from "@angular/forms";

export function fUserEdit(user: any): FormGroup {
    return new FormGroup({
        first_name: new FormControl(user.first_name),
        last_name:new FormControl(user.last_name),
        gender: new FormControl(user.gender),
        email:new FormControl(user.email),
        adress:new FormControl(user.adress),
        birthDate:new FormControl(user.birthDate),
        actif:new FormControl(user.actif),
        gsm: new FormControl(user.gsm),
        grade:new FormControl(user.grade),
        status: new FormControl(user.status),
      })
}