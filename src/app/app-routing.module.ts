import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSubcategoryComponent } from './product-subcategory/product-subcategory.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ProductModifyComponent } from './product-modify/product-modify.component';
import { StockComponent } from './stock/stock.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { CartComponent } from './cart/cart.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'products', component: ProductsComponent},
  {path : 'addProducts', component: AddProductComponent},
  {path : 'product/:id', component: ProductPageComponent},
  {path : 'productModify/:id', component: ProductModifyComponent},
  {path : 'category/:name', component: ProductCategoryComponent},
  {path : 'subcategory/:name', component: ProductSubcategoryComponent},
  {path : 'brand/:brandName', component: ProductBrandComponent},
  {path : 'search/:searchText', component: SearchResultComponent},
  {path : 'stock', component: StockComponent},
  {path : 'login', component: LoginComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'cart/:id', component: CartComponent},
  {path : 'userSettings', component: UserSettingsComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


