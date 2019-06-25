import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { AddNewComponent } from './add-new/add-new.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  { path:'', component: MainpageComponent},
  { path:'listnews', component: NewsComponent},
  { path:'addnews/:id', component: AddNewComponent},
  { path:'addnews', component: AddNewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainpageComponent, NewsComponent, AddNewComponent]
