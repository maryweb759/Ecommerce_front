import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/Book';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(    private http:HttpClient
    ) { } 

    getUsers()
    {
      return this.http.get<User[]>('http://localhost:8080/users/get');
    } 

    addUser(newUser: User) {
      return this.http.post<User>('http://localhost:8080/users/add', newUser);   
    } 

    deleteUser(id: number) {
      return this.http.delete('http://localhost:8080/users/' + id);
    } 
    getBooks() {
      return this.http.get<Book[]>('http://localhost:8080/books/get');
    } 

    addBook(newBook: Book) {
      return this.http.post<Book>('http://localhost:8080/books/add', newBook);
    } 

    deleteBook(id: number) {
      return this.http.delete('http://localhost:8080/books/' + id);
    } 
    
    updateBook(updateBook: Book) {
     return this.http.put<Book>('http://localhost:8080/books/update', updateBook);
    }
}
