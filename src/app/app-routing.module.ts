import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {Solution1Component} from "./solution1/solution1.component";
import {Solution2Component} from "./solution2/solution2.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'solution1',
    component: Solution1Component
  },
  {
    path: 'solution2',
    component: Solution2Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
