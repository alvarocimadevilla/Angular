import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorPattern } from '../../../validadores/validatorPattern';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule], //<---- necesario importar este modulo de angular para mapear elementos de la vista <form.. <input con objetos formGroup y formControl definidos en componente
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnDestroy {
  public formRegistro: FormGroup;
  private _subscripcionFormGroupValueChanges: Subscription;

  constructor(){
    this.formRegistro=new FormGroup(
                                    {
                                      nombre: new FormControl(
                                                              '',
                                                              [ Validators.required, Validators.maxLength(100), Validators.minLength(3) ] , //<---validadores sincronos sobre input-nombre
                                                              [ ] //<--------- array de validadores asincronos para input-nombre
                                      ),       
                                      apellidos: new FormControl('', [ Validators.required, Validators.maxLength(250), Validators.minLength(4) ] ),
                                      email: new FormControl('', [ Validators.required,  ValidatorPattern("email") ]),
                                      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), ValidatorPattern("password")])
                                    }
                                  );
    this._subscripcionFormGroupValueChanges=this.formRegistro
                                                .valueChanges
                                                .subscribe(
                                                          {
                                                            next: (datos:any)=> console.log('datos recogidos del observable valueChanges del formGroup...', datos),
                                                            error: (errores:any) => console.log('errores producidos en observable valueChanges del formGroup...', errores),
                                                            complete: ()=> console.log('cierre del observable valueChanges del formGroup')
                                                          }
                                                        )
  }
  ngOnDestroy(): void {
    //este metodo se ejecuta cuando componente se destruye, se quita del DOM <==== util para des-suscribirse de observables
    this._subscripcionFormGroupValueChanges.unsubscribe();
  }

RegistrarCliente(ev:any): void {
  console.log('el parametro event recibido vale...', ev);
  console.log('el contenido del formulario en objeto FORMGROUP es....', this.formRegistro);
}

}
