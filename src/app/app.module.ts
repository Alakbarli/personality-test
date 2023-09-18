import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { ShellModule } from './shell/shell.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material/material.module';
import { TestComponent } from './components/test/test.component';
import { ResultComponent } from './components/result/result.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { ProgressWithDirective } from './directives/progress-with.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TestComponent,
    ResultComponent,
    AboutComponent,
    ContactComponent,
    ResultListComponent,
    ProgressWithDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    ShellModule,
    MaterialModule,
    //NoopAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
