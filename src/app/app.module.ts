import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { UserComponent } from './admin/user/user.component';
import { NavbarComponent } from './admin/admin-template/includes/navbar/navbar.component';
import { SidebarComponent } from './admin/admin-template/includes/sidebar/sidebar.component';
import { FooterComponent } from './admin/admin-template/includes/footer/footer.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { UserProfileComponent } from './admin/user/user-profile/user-profile.component';
import { PropertiesComponent } from './admin/properties/properties.component';
import { PropertyCreateComponent } from './admin/properties/property-create/property-create.component';
import { CitiesComponent } from './admin/cities/cities.component';
import { CityEditComponent } from './admin/cities/city-edit/city-edit.component';
import { AgencesComponent } from './admin/agences/agences.component';
import { AgenceEditComponent } from './admin/agences/agence-edit/agence-edit.component';
import { SliderComponent } from './admin/slider/slider.component';
import { SliderEditComponent } from './admin/slider/slider-edit/slider-edit.component';
import { PropertyEditComponent } from './admin/properties/property-edit/property-edit.component';
import { PropertyImageComponent } from './admin/properties/property-image/property-image.component';
import { TypePropertyComponent } from './admin/properties/type-property/type-property.component';
import { TypePropertyEditComponent } from './admin/properties/type-property/type-property-edit/type-property-edit.component';
import { EditTerrainPropertyComponent } from './admin/properties/edit-terrain-property/edit-terrain-property.component';
import { PropertyEditFeactureComponent } from './admin/properties/property-edit-feacture/property-edit-feacture.component';
import { NavbarHomeComponent } from './home/include/navbar-home/navbar-home.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    UserEditComponent,
    UserProfileComponent,
    PropertiesComponent,
    PropertyCreateComponent,
    CitiesComponent,
    CityEditComponent,
    AgencesComponent,
    AgenceEditComponent,
    SliderComponent,
    SliderEditComponent,
    PropertyEditComponent,
    PropertyImageComponent,
    TypePropertyComponent,
    TypePropertyEditComponent,
    EditTerrainPropertyComponent,
    PropertyEditFeactureComponent,
    NavbarHomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'line-spin-fade' })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
