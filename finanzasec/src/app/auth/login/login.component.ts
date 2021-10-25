import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Usuario } from '../../model/Usuario.model';
import { EndPoint } from '../../enum/EndPoint.enum';
import { Variables } from '../../enum/Variables.enum';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SaService } from '../../services/sa.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService,
    private api: ApiService,
    private router: Router,
    private sa: SaService
  ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      // let data = { token: user.idToken }
      this.api.log('ngOnInit', user)
      if (user) {
        let data = { token: user.idToken }
        this.api.iniciarSesion(data).subscribe((data) => {
          if (data.ok) {
            let obj: any = data.data;
            localStorage.setItem(Variables.TOKEN_LOCALSTORAGE, '' + obj["token"]);
            this.router.navigateByUrl('/' + EndPoint.PERFIL);
          } else {
            this.sa.error('Error al iniciar sesion', JSON.stringify(data.error))
          }
        })
      }
    });
  }

  login(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

}
