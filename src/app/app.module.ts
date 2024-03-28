import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductsComponent } from "./products/products.component";
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductSubcategoryComponent } from './product-subcategory/product-subcategory.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ProductModifyComponent } from './product-modify/product-modify.component';
import { StockComponent } from './stock/stock.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { HttpRequestInterceptor } from './auth/httpRequestInterceptor';
import { UserSettingsComponent } from './user-settings/user-settings.component';

// import { httpInterceptorProviders } from './auth/httpRequestInterceptor'
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MdbFormsModule} from 'mdb-angular-ui-kit/forms';

@NgModule({
    declarations: [
        AppComponent,
        AddProductComponent,
        LoginComponent,
        HeaderComponent,
        SignupComponent,
        CartComponent,
        ProductCategoryComponent,
        ProductsComponent,
        HomeComponent,
        ProductPageComponent,
        ProductSubcategoryComponent,
        SearchResultComponent,
        ProductModifyComponent,
        StockComponent,
        ProductBrandComponent,
        UserSettingsComponent
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}, HeaderComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // MDBBootstrapModule.forRoot(),
        HttpClientModule,
        CommonModule,
        NgFor,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        AppRoutingModule,
    ]
})
export class AppModule { }
