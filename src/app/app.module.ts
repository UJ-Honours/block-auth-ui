import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './mega-menu/nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';
import { TokensComponent } from './tokens/tokens.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    DevicesComponent,
    UsersComponent,
    TokensComponent,
    PageNotFoundComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
