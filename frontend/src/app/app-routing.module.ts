import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './_services/auth-guard.service';

const routes: Routes = [
  // signUp path
  {
    path: "signUp",
    loadChildren: () => import('../app/components/login/login.module').then(module => module.LoginModule).catch(err => console.error(err))
  },
  // login path
  {
    path: "login",
    loadChildren: () => import('../app/components/login/login.module').then(module => module.LoginModule).catch(err => console.error(err))
  },

  // guarded routes
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      // home path
      {
        path: "home",
        loadChildren: () => import('../app/components/home/home.module').then(module => module.HomeModule).catch(err => console.error(err))
      },
      // graph path
      {
        path: "graph",
        loadChildren: () => import('../app/components/graph/graph.module').then(module => module.GraphModule).catch(err => console.error(err))
      },
    ]
  },

  // default path
  {
    path: "",
    redirectTo: "signUp",
    pathMatch: "full"
  },
  // error route
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
