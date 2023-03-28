import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.html',
  styleUrls: ['./dialog-box.css']
})
export class CommonDialog {

  constructor(public dialogRef: MatDialogRef<CommonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    dialogRef.disableClose = true;
  }

  updateValues(event: any): void {
    let response = event.currentTarget.innerText;
    this.dialogRef.close(response);
  }
}

export interface DialogData {
  heading: string;
  firstButton: string;
  secondButton: string;
  thirdButton: string;
}
