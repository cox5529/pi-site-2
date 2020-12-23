import { Component, OnInit } from '@angular/core';
import { ListRow } from 'src/app/models/list-row';
import { ListConfig } from 'src/app/models/tile-configs/list-config';
import { ListService } from 'src/app/services/list.service';
import { BaseTile } from '../base-tile';

@Component({
  selector: 'app-list-tile',
  templateUrl: './list-tile.component.html',
  styleUrls: ['./list-tile.component.sass'],
})
export class ListTileComponent extends BaseTile<ListConfig> {
  lists: List[] = [];

  constructor(private listService: ListService) {
    super();
  }

  async initialize(): Promise<void> {
    const lists: List[] = [];
    for (const id of this.configuration.lists) {
      const response = await this.listService.get(id);
      if (response.ok) {
        const data = JSON.parse(response.body.jsonData) as ListRow[];
        const list: List = {
          name: response.body.name,
          data: data.map(x => x.text)
        };

        lists.push(list);
      }
    }

    this.lists = lists;
  }
}

interface List {
  data: string[];
  name: string;
}
