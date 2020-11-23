import { OnDestroy, Input, OnChanges, SimpleChanges, Directive } from '@angular/core';
import { TileDto } from 'src/app/models/dtos/tile-dto';
import { Subscription } from 'rxjs';

@Directive()
export abstract class BaseTile<T> implements OnDestroy, OnChanges {
  @Input() tile: TileDto;
  configuration: T;

  subscriptions: Subscription[] = [];

  abstract initialize(): void;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tile) {
      this.configuration = JSON.parse(this.tile.configurationJson) as T;
      this.initialize();
    }
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
