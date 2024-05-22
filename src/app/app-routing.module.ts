import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { UserComponent } from './admin/user/user.component';
import { SignupComponent } from './admin/signup/signup.component';
import { authGuard } from './share/guard/auth.guard';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { UserProfileComponent } from './admin/user/user-profile/user-profile.component';
import { CityEditComponent } from './admin/cities/city-edit/city-edit.component';
import { CitiesComponent } from './admin/cities/cities.component';
import { AgencesComponent } from './admin/agences/agences.component';
import { AgenceEditComponent } from './admin/agences/agence-edit/agence-edit.component';
import { SliderComponent } from './admin/slider/slider.component';
import { SliderEditComponent } from './admin/slider/slider-edit/slider-edit.component';
import { TypePropertyComponent } from './admin/properties/type-property/type-property.component';
import { TypePropertyEditComponent } from './admin/properties/type-property/type-property-edit/type-property-edit.component';
import { PropertiesComponent } from './admin/properties/properties.component';
import { PropertyCreateComponent } from './admin/properties/property-create/property-create.component';
import { PropertyEditComponent } from './admin/properties/property-edit/property-edit.component';
import { PropertyImageComponent } from './admin/properties/property-image/property-image.component';
import { EditTerrainPropertyComponent } from './admin/properties/edit-terrain-property/edit-terrain-property.component';
import { PropertyEditFeactureComponent } from './admin/properties/property-edit-feacture/property-edit-feacture.component';


const routes: Routes = [
 {
  path : '', component : HomeComponent,
 },
 { path: '', redirectTo: '', pathMatch: 'full' },
 {
    path : 'admin/login',
    component : LoginComponent,
  },
 {
  path : 'admin',
  component : AdminTemplateComponent , canActivate: [authGuard],
  children : [
    {
      path : '', component : UserComponent, canActivate: [authGuard]

    },
    {
      path : 'add-user', component : SignupComponent, canActivate: [authGuard]
    },
    {
      path : 'edit-user/:id', component : UserEditComponent, canActivate : [authGuard]
    },
    {
      path : 'profile/:id', component : UserProfileComponent, canActivate : [authGuard] 
    },
    {
      path : 'cities', component : CitiesComponent, canActivate : [authGuard]
    },
    {
      path : 'add-city', component : CityEditComponent, canActivate : [authGuard]
    },
    {
      path : 'edit-city/:id', component : CityEditComponent, canActivate : [authGuard]
    }
    ,
    {
      path : 'agences', component : AgencesComponent, canActivate : [authGuard]
    },
    {
      path : 'add-agence', component : AgenceEditComponent, canActivate : [authGuard]
    },
    {
      path : 'edit-agence/:id', component : AgenceEditComponent, canActivate : [authGuard]
    },
    {
      path : 'sliders', component : SliderComponent, canActivate : [authGuard]
    },
    {
      path : 'add-slider', component : SliderEditComponent, canActivate : [authGuard]
    },
    {
      path : 'edit-slider/:id', component : SliderEditComponent, canActivate : [authGuard]
    },
    {
      path : 'type-properties', component : TypePropertyComponent, canActivate : [authGuard]
    },
    {
      path : 'add-type-property', component : TypePropertyEditComponent, canActivate : [authGuard]
    },
    {
      path : 'edit-type-property/:id', component : TypePropertyEditComponent, canActivate : [authGuard]
    },
    {
      path : 'properties', component : PropertiesComponent, canActivate : [authGuard]
    },
    {
      path : 'add-property', component : PropertyCreateComponent, canActivate : [authGuard]
    },
    {
      path : 'edit-property/:id', component : PropertyCreateComponent, canActivate : [authGuard]
    },
    {
      path : 'edit-terrain-property/:id', component : EditTerrainPropertyComponent, canActivate : [authGuard]
    },
    {
      path : 'add-images-property/:id', component : PropertyImageComponent, canActivate : [authGuard]
    }
    ,
    {
      path : 'edit-feactures-property/:id', component : PropertyEditFeactureComponent, canActivate : [authGuard]
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
