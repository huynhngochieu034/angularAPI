import { Component, OnInit } from '@angular/core';
import { HttpclientService } from '../service/httpclient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news=[];
  id;
  ids=[];
  dem=0;
  totalCheckBoxChild:number;
  isCheckedParent = false;
  disableDelete = true;
  errorMsg = '';
  constructor(private service: HttpclientService,
    private router: Router) { }

  ngOnInit() {
    this.service.getNews().subscribe(data=> this.news = data);
  }

  checkAllChild(){
    if(this.isCheckedParent){
      for(var i=0 ; i < this.news.length; i++) {
        this.news[i].checked = true;
      }
      this.disableDelete=false;
    }else{
      for(var i=0 ; i < this.news.length; i++) {
        this.news[i].checked = false;
      }
      this.disableDelete=true;
    }
  }

  checkParent(newa, event){
    this.totalCheckBoxChild = this.news.length;
    if(event.target.checked){
      newa.checked = true;
      this.disableDelete = false;
    }else{
      newa.checked = false;
      if(this.news.filter(opt => opt.checked).length == 0){
        this.disableDelete = true;
      }
    }
     this.dem = this.news.filter(opt => opt.checked).length;
     if(this.dem == this.totalCheckBoxChild){
      this.isCheckedParent = true;
     }else{
      this.isCheckedParent = false;
     }

  }

  updateNew(newa) {
  this.router.navigate(['/addnews', newa.id]);
  this.id= newa.id;
  console.log(this.id);
  } 

  deleteNew(){
    var j=0;
   for(var i=0; i< this.news.length; i++){
     if(this.news[i].checked){
        this.ids[j++] = this.news[i].id;
     }
   }
   this.actionDelete();
  }
  actionDelete(){
    console.log(this.ids[0]);
    console.log(this.ids[1]);
    if (this.ids[0] == "") {
      this.ids.splice(0, 1);
    }
     this.service.deleteNew(this.ids).subscribe(
      () => alert("Employees delete successfully."),
      error => this.errorMsg = error.statusText
    )
  }

}
