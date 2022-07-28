import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Array<Book> = [];
  selectedBook: Book = new Book; 
  booksRecieved!: Array<Book>;
  action!: string;
  constructor(private httpService: HttpClientService, 
    private activedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void { 
    this.refreshList() ; 

   
  }
  

  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], {queryParams: {action: "add"}})
  } 

 
 
  refreshList() {
    this.httpService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    ); 
    this.activedRoute.queryParams.subscribe(
    (params) => {
      this.action = params['action']; 
      const id = params['id'];
      // if id exists, convert it to integer and then retrive the book from
      // the books array
            if (id) {
              this.selectedBook= this.books.find(book => {
                return book.id === +id;
              })!;
    
            }
  }) }
handleSuccessfulResponse(response: Book[]): void {
  this.books = new Array<Book>();
 this.booksRecieved = response; 
  for(const book of this.booksRecieved) {
    const bookRetrievedWithImageField = new Book();
    bookRetrievedWithImageField.id = book.id;
    bookRetrievedWithImageField.name = book.name;
    bookRetrievedWithImageField.price = book.price;
    bookRetrievedWithImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
    bookRetrievedWithImageField.picByte = book.picByte;
    bookRetrievedWithImageField.author = book.author;
    this.books.push(bookRetrievedWithImageField);
  }

  }
 

  setBook(id: number) {
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });
  }
}
