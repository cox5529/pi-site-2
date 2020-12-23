import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { JsonEditorComponent } from 'src/app/components/json-editor.component';
import { ListConfig } from 'src/app/models/tile-configs/list-config';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-tile-settings',
  templateUrl: './list-tile-settings.component.html',
  styleUrls: ['./list-tile-settings.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ListTileSettingsComponent,
      multi: true,
    },
  ],
})
export class ListTileSettingsComponent extends JsonEditorComponent<ListConfig>
  implements OnInit, ControlValueAccessor, OnDestroy {
  form: FormGroup;
  listOptions: ListOptions[] = [];
  changeSubscription: Subscription;

  get listArray(): FormArray {
    return this.form.get('lists') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private snackbar: MatSnackBar
  ) {
    super();

    this.form = this.formBuilder.group({
      lists: this.formBuilder.array([
        this.formBuilder.control('')
      ])
    });
  }

  async ngOnInit(): Promise<void> {
    const result = await this.listService.getList({
      page: 0,
      query: '',
      sortColumn: 'name',
      sortDirection: 'asc'
    });

    if (result.ok) {
      this.listOptions = result.data.map(x => ({ id: x.id, name: x.name }));
    } else {
      this.snackbar.open('Something went wrong when fetching the list of lists. Please try again later.');
    }

    this.changeSubscription = this.form.valueChanges.subscribe((x) => {
      this.onChange(this.serialize());
    });
  }

  addList(): void {
    this.listArray.push(this.formBuilder.control(''));
  }

  deleteList(i: number): void {
    this.listArray.removeAt(i);
  }

  protected updateValue(value: ListConfig): void {
    if (!value.lists) {
      value.lists = [];
    }

    if (value.lists.length > 0) {
      const array = this.form.get('lists') as FormArray;
      while (array.length > value.lists.length) {
        array.removeAt(0);
      }

      while (array.length < value.lists.length) {
        array.push(this.formBuilder.control(''));
      }

      array.setValue(value.lists);
    }
  }

  protected serialize(): string {
    const value: ListConfig = this.form.value;
    return JSON.stringify(value);
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }
}

interface ListOptions {
  name: string;
  id: string;
}
