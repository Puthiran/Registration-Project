import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { ViewcustomersComponent } from "./viewcustomers/viewcustomers.component";

const routes: Routes = [
    {path: 'register',component: RegisterComponent},
    {path: 'viewcustomers',component: ViewcustomersComponent},
    { path: "", redirectTo: "register", pathMatch: "full" },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}