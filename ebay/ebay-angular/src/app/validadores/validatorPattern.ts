/*
    ===============================================================================================
    = validador personalizado para comprobar formato de email como si fuese el Validators.pattern =
    ===============================================================================================
    el objetivo es devolver un objeto de tipo ValidatorFn 
    2 formas:
        - mediante una clase o bien q implemente interface Validators o sin implmentar esa interface con
            un metodo q devuelva un objeto ValidatorFn
        - sin hacer uso de ninguna clase, el modulo exporta una funcion q genera el ValidatorFn <=== la mas UTILIZADA!!!
*/

import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

//#region ----------1º metodo clase q implementa interface Validator ---------------------------
//me gustaria q se le pasara por parametro el valor de la expresion regular a usar....NO PUEDO PASARSELO COMO ARGUMENTO al metodo VALIDATE
//de la interface Validator, pq incumple su formato ( solo admite un unico argumento llamado control:AbstractControl )
//necesito sobrecargar constructor....

//para usarlo, en componente importar referencia:   import { ValidatorPattern } from .....
//y en objeto FormControl donde quieras validar, en validadores sincronos:  new ValidatorPattern('tipo').validate

// export class ValidatorPattern implements Validator {
//     public tipoAValidar:string;
//     private _patron?: RegExp;

//     constructor( paramPatron: string){
//         this.tipoAValidar=paramPatron;

//         switch (this.tipoAValidar) {
//             case "email":
//                 this._patron=new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
//                 break;
//             case "telefono":
//                 this._patron=new RegExp("^(+?\d{2}\s?)?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}$"); //<--formato +34 666 22 22 22
//                 break;
//         }
//     }

//     validate(control: AbstractControl): ValidationErrors | null {
//         //valor del input-email mapeado en parametro control
//         let _email:string = control.value || '';
//         //if(! new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$").test(_email) ) return { "emailFormat": "formato erroneo del email" }
//         if(! this._patron?.test(_email) ) return { "emailFormat": "formato erroneo del email" }

//         return null; 
//     }
// }


//#endregion

//#region ---------- 2º metodo clase q NO IMPLEMENTA INTERFACE VALIDATOR, q tiene un metodo q devuelve ValidorFn -------------------
//para usarlo, en componente importar referencia:   import { ValidatorPattern } from .....
//y en objeto FormControl donde quieras validar, en validadores sincronos:  new ValidatorPattern('tipo').validate()

// export class ValidatorPattern {
//     public tipoAValidar:string;
//     private _patron?: RegExp;

//     constructor( paramPatron: string){
//         this.tipoAValidar=paramPatron;

//         switch (this.tipoAValidar) {
//             case "email":
//                 this._patron=new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
//                 break;
//             case "telefono":
//                 this._patron=new RegExp("^(+?\d{2}\s?)?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}$"); //<--formato +34 666 22 22 22
//                 break;
//         }
//     }

//     validate(): ValidatorFn {
//         return (control:AbstractControl)=>{
//                     //valor del input-email mapeado en parametro control
//                     let _email:string = control.value || '';
//                     //if(! new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$").test(_email) ) return { "emailFormat": "formato erroneo del email" }
//                     if(! this._patron?.test(_email) ) return { "emailFormat": "formato erroneo del email" }

//                     return null;             
//                     }
//     }
// }

//#endregion

//#region ---------- 3º metodo SIN CLASES!!!! exportas una funcion q crea el objeto ValidatorFn ----------------------
//para usarlo, en componente importar referencia:   import { ValidatorPattern } from .....
//y en objeto FormControl donde quieras validar, en validadores sincronos:  ValidatorPattern('..tipo...')

export function ValidatorPattern( tipo:string ):ValidatorFn {
    let _patron:RegExp;

    switch (tipo) {
            case "email":
                _patron=new RegExp("^.\+@.\+\..\+$");
                break;
            case "telefono":
                _patron=new RegExp("^(+?\d{2}\s?)?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}$"); //<--formato +34 666 22 22 22
                break;
            case "password":
                _patron=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&-_]).{6,}$"); //<--formato una MAYS una MINS un simbolo un digito
                break;
    }

    return (control: AbstractControl): ValidationErrors | null => {
                    //valor del input-email mapeado en parametro control
                    let _valor:string = control.value || '';
                    //if(! new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$").test(_email) ) return { "emailFormat": "formato erroneo del email" }
                    if(! _patron?.test(_valor) ) return { "pattern": "formato erroneo del email" }

                    return null;             
    }
    
}
//#endregion