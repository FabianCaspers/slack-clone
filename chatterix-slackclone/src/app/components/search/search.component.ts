import { Component } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public search!: any;

  constructor(
    public messagesService: MessagesService
  ) { }


  ngOnInit() {
    this.messagesService.currentSearch.subscribe(search => {
      this.search = search;
    });
  }
}
