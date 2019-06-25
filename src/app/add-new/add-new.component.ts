import { Component, OnInit, Input } from '@angular/core';
import { News } from '../model/news';
import { HttpclientService } from '../service/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  public categorys=[];
  news={};
  id:number;
  categoryHasError = true;
  submitted = false;
  errorMsg = '';
  checked;
  constructor(private service: HttpclientService,
    private route:ActivatedRoute) {
    
   }

  ngOnInit() {
    
    this.service.getCategory().subscribe(data=> this.categorys = data);
    
    let ids = parseInt(this.route.snapshot.paramMap.get("id"));
    this.id=ids;
    console.log(this.id);
  
    if(isNaN(this.id)){
      this.checked=true;
      this.news = new News("","","","","");
    }else{
      this.service.getNewById(this.id).subscribe(data => this.news = data);
      this.checked=false;
    }
  }

  validateCategory(value) {
    if (value === '') {
      this.categoryHasError = true;
    } else {
      this.categoryHasError = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    if(isNaN(this.id)){
      this.service.createNew(this.news)
      .subscribe(
        () => alert("Employee created successfully."),
        error => this.errorMsg = error.statusText
      )
    }else{
      this.service.updateNew(this.news,this.id)
      .subscribe(
        () => alert("Employee updated successfully."),
        error => this.errorMsg = error.statusText
      )
    }
    
  }

}
