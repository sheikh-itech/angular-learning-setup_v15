
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './data/AppComponent';
import { DataService } from './data/DataService';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent],
  providers: [DataService], // <-- provide DataService at AppModule level
  bootstrap: [AppComponent]
})
export class AppModuleLevel { }
