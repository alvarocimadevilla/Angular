import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/zonaCliente/loginComponent/login.component';
import { RegistroComponent } from './componentes/zonaCliente/registroComponent/registro.component';

export const routes: Routes = [
    { path:'Cliente/Login', component: LoginComponent },
    { path:'Cliente/Registro', component: RegistroComponent }
];
