import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.scss']
})
export class DeleteSongComponent implements OnInit {
  yesFlag = false;
  apiUrl: any;
  message = '';
  itemData: any;
  token: any;
  isSuccessful = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    public dialogRef: MatDialogRef<DeleteSongComponent>, private router: Router) { }

  ngOnInit(): void {
    this.itemData = this.data.rowData;
    this.yesFlag = true;
  }

  clickNo() {
    this.dialogRef.close();
  }

  clickYes() {
    this.authService.deleteSong(this.itemData.id).subscribe({
      next: data => {
        this.message = data.message;
        this.isSuccessful = true;
        this.dialogRef.close();
        
      },
      error: err => {
        console.log(err);
        
      }
    });
  }
  
}




