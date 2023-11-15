import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Verificar si el usuario está autenticado (lógica depende de tu servicio de autenticación)
    if (this.loginService.isLoggedIn()) {
      return true; // Permite el acceso a la ruta
    } else {
      // Redirige al componente de inicio de sesión si el usuario no está autenticado
      return this.router.parseUrl('/login'); // Reemplaza '/login' con tu ruta de inicio de sesión
    }
  }
  
}
