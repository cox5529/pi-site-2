import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { JsonEditorComponent } from 'src/app/components/json-editor.component';
import { TableConfig } from 'src/app/models/tile-configs/table-config';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-tile-settings',
  templateUrl: './table-tile-settings.component.html',
  styleUrls: ['./table-tile-settings.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TableTileSettingsComponent,
      multi: true,
    },
  ],
})
export class TableTileSettingsComponent extends JsonEditorComponent<TableConfig>
  implements OnInit, ControlValueAccessor, OnDestroy {
  form: FormGroup;
  tableOptions: TableOptions[] = [];
  changeSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private tableService: TableService,
    private snackbar: MatSnackBar
  ) {
    super();

    this.form = this.formBuilder.group({
      showColumns: this.formBuilder.control(''),
      table: this.formBuilder.control(''),
      title: this.formBuilder.control(''),
      dense: this.formBuilder.control('')
    });
  }

  async ngOnInit(): Promise<void> {
    const result = await this.tableService.getList({
      page: 0,
      query: '',
      sortColumn: 'name',
      sortDirection: 'asc'
    });

    if (result.ok) {
      this.tableOptions = result.data.map(x => ({ id: x.id, name: x.name }));
    } else {
      this.snackbar.open('Something went wrong when fetching the list of tables. Please try again later.');
    }

    this.changeSubscription = this.form.valueChanges.subscribe((x) => {
      this.onChange(this.serialize());
    });
  }

  protected updateValue(value: TableConfig): void {
    this.form.get('showColumns').setValue(value.showHeaders);
    this.form.get('table').setValue(value.tableId);
    this.form.get('title').setValue(value.title);
    this.form.get('dense').setValue(value.dense);
  }

  protected serialize(): string {
    const config: TableConfig = {
      dense: this.form.get('dense').value,
      tableId: this.form.get('table').value,
      showHeaders: this.form.get('showColumns').value,
      title: this.form.get('title').value
    };

    return JSON.stringify(config);
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }
}

interface TableOptions {
  id: string;
  name: string;
}
