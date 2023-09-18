import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import { ShellComponent } from './shell.component';



@NgModule({
  declarations: [
    ShellComponent,
  ],
  imports: [
    CommonModule,
    //NoopAnimationsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
  ]
})
export class ShellModule { }
