import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellService } from './shell/shell.service';
import { MainComponent } from './components/main/main.component';
import { TestComponent } from './components/test/test.component';
import { ResultComponent } from './components/result/result.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  ShellService.childRoutes([
    { path: '', redirectTo: '/main', pathMatch: 'full'},
    {
      path: 'main',
      component: MainComponent
    },
    {
      path: 'test',
      component: TestComponent
    },
    {
      path: 'result',
      component: ResultComponent
    },
    {
      path: 'result-list',
      component: ResultListComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'contact',
      component: ContactComponent
    },
    {path:'**',component:MainComponent}
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
