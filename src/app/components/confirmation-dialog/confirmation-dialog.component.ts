import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.sass']
})
export class ConfirmationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationText
  ) { }

}

export interface ConfirmationText {
  prompt: string;
  trueButton: string;
  falseButton: string;
}
