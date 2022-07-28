import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  @Output() refreshBook = new EventEmitter();
  @Input() book!: Book; 
  constructor(private httpService: HttpClientService, 
    private activedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  deleteBook() {
   this.httpService.deleteBook(this.book.id).subscribe(
     (book) => { 
       this.refreshBook.emit();
       this.router.navigate(['admin', 'books'],);
     }
   )
  } 

  EditBook() {
    this.router.navigate(['admin', 'books'], {queryParams:{action: 'edit', id: this.book.id}})
  }
}
