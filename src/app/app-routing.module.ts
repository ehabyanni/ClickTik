import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TestGuardComponent } from './test-guard/test-guard.component';
import { isAuthenticatedGaurd } from './_gaurds/isAuthenticated.guard';

const routes: Routes = [
  { path: ''                , component: LoginComponent             },
  { path: "login"           , component: LoginComponent             },
  { path: "home"            , component: HomeComponent           
                            , canActivate: [isAuthenticatedGaurd]   },
  { path: "testGuard"       , component: TestGuardComponent       
                            , canActivate: [isAuthenticatedGaurd]   },
  { path: "**"              , component: LoginComponent             }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
