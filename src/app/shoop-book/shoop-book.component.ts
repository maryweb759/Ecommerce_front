import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../model/Book';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-shoop-book',
  templateUrl: './shoop-book.component.html',
  styleUrls: ['./shoop-book.component.css']
})
export class ShoopBookComponent implements OnInit {
  books: Array<Book> = [];
  booksRecieved!: Array<Book>;
  cartBook: any;

  constructor(private httpService: HttpClientService, 
    private activedRoute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this. getBooks();
     //from localstorage retrieve the cart item
   let data = localStorage.getItem('cart');
   //if this is not null convert it to JSON else initialize it as empty

 if(data != null) {
  this.cartBook = JSON.parse(data);
 } else {
  this.cartBook = []
 }
  }
  getBooks() {
    this.httpService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );  } 

    handleSuccessfulResponse(response: Book[]): void {
      this.books = new Array<Book>(); 
      this.booksRecieved = response; 
      for(const book of this.booksRecieved) {
        const bookWithretrievedImageField = new Book();
        bookWithretrievedImageField.id = book.id;
        bookWithretrievedImageField.name = book.name;
        bookWithretrievedImageField.author = book.author;
        bookWithretrievedImageField.price = book.price;
        bookWithretrievedImageField.picByte = book.picByte;
        bookWithretrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
       this.books.push(bookWithretrievedImageField);
      }
    } 

    addToCart(bookId:number) { 
      console.log(bookId);
      
    //retrieve book from books array using the book id
    let book = this.books.find(book => {
     return book.id === +bookId
    }); 
    console.log(book);
    
    let cartData = []; 
        //retrieve cart data from localstorage
     let data = localStorage.getItem('cart'); 
     console.log("data from local storage " + data);
     
     if(data != null) {
      cartData = JSON.parse(data);
     } 
     console.log("cart data after parse" + cartData);
     
         // add the selected book to cart data
      cartData.push(book); 
      console.log("cart data" + cartData);
      
      //updated the cartBooks
     this.updateCartData(cartData); 

     //save the updated cart data in localstorage
     localStorage.setItem('cart', JSON.stringify(cartData)); 

      //make the isAdded field of the book added to cart as true
     book!.isAdded = true;
    } 
  updateCartData(cartData: any) { 

    this.cartBook = cartData; 
        console.log("cart book" + this.cartBook);

  }

  goToCart() {
    this.router.navigate(["/cart"])
  }

  emptyCart() {
    this.cartBook = [];
    localStorage.clear();
}

}
