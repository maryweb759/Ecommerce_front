import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @Output() refreshBook = new EventEmitter();
  @Input() book!: Book; 
  imgURL: any; 
  private selectedFile!: File;
  constructor(private httpService: HttpClientService, private router: Router,
    private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  saveBook() {

   const uploadData = new FormData();
   uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);

   this.httpClient.post('http://localhost:8080/books/upload', uploadData, {observe: 'response'})
   .subscribe((response)=> {
     console.log("response ----");
     
     console.log(response);
     
     if(response.status == 200) {  
      if(this.book.id == 0) {
         this.httpService.addBook(this.book).subscribe(
         (book) => {
           this.refreshBook.emit();
           this.router.navigate(['admin', 'books']);
         }
       );
       console.log('Image uploaded successfully');
      } else {
        this.httpService.updateBook(this.book).subscribe(
          (book) => {
            this.refreshBook.emit();
            this.router.navigate(["admin", "books"])
          }
        )
      }
      
     } else {
      console.log('Image not uploaded successfully');

     }
   })
  } 

  public onFileChanged(event:any) {
   console.log(event);
   this.selectedFile = event.target.files[0]; 

   let reader = new FileReader();
   reader.readAsDataURL(event.target.files[0]);
   reader.onload = (event2) => {
     this.imgURL = reader.result;
   }
  }
}
 
// const uploadData = new FormData();
// uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);

// this.httpClient.post('http://localhost:8080/books/upload', uploadData, {observe: 'response'})
// .subscribe((response)=> {
//   console.log("response ----");
  
//   console.log(response);
  
//   if(response.status == 200) {  
   
//     this.httpService.addBook(this.book).subscribe(
//       (book) => {
//         this.refreshBook.emit();
//         this.router.navigate(['admin', 'books']);
//       }
//     );
//     console.log('Image uploaded successfully');
//   } else {
//    console.log('Image not uploaded successfully');

//   }
// })