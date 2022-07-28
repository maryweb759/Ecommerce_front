import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserComponent } from './admin/user/user.component';
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import {FormsModule} from '@angular/forms';
import { ViewUserComponent } from './admin/user/view-user/view-user.component';
import { BooksComponent } from './admin/books/books.component';
import { AddBookComponent } from './admin/books/add-book/add-book.component';
import { ViewBookComponent } from './admin/books/view-book/view-book.component';
import { ShoopBookComponent } from './shoop-book/shoop-book.component';

const routes: Routes = [
  { path: 'admin/users', component: UserComponent },
  { path: 'admin/books', component: BooksComponent },
  {path: 'shoop', component: ShoopBookComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FooterComponent,
    MenuComponent,
    AddUserComponent,
    ViewUserComponent,
    BooksComponent,
    AddBookComponent,
    ViewBookComponent,
    ShoopBookComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    FormsModule,
     [RouterModule.forRoot(routes)],

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
