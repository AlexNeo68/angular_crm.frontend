import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { PreloaderComponent } from './components/layout/preloader/preloader.component';
import { SidenavListComponent } from './components/layout/sidenav-list/sidenav-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloaderInterceptor } from 'src/app/interceptors/preloader.interceptor';
import { FormComponent } from './componens/form/form.component';
import { LoginComponent } from './componens/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    PreloaderComponent,
    SidenavListComponent,
    FormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PreloaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
