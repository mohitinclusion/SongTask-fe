import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.scss']
})
export class UpdateSongComponent implements OnInit {
  updateSongForm!: FormGroup;
  itemData: any;
  songData: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,
    public dialogRef: MatDialogRef<UpdateSongComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.itemData = this.data.rowData;
    console.log(this.itemData);
    
    this.createForm();
  }

  createForm() {
    this.updateSongForm = this.formBuilder.group({
      song: [this.itemData.song, Validators.required],
      artist: [this.itemData.artist, Validators.required],
      releaseYear: [this.itemData.releaseYear, Validators.required],
      first: [this.itemData.first, Validators.required],
      year: [this.itemData.year, Validators.required],
      playCount: [this.itemData.playCount, Validators.required]
    })
  }

  get f(){
    return this.updateSongForm.controls;
  }

  onUpdate() { 
    this.submitted = true;
    if (this.updateSongForm.invalid) {
      return;
    }
    this.authService.updateSong(this.itemData.id, this.updateSongForm.get('song')?.value, this.updateSongForm.get('artist')?.value,
      this.updateSongForm.get('releaseYear')?.value, this.updateSongForm.get('first')?.value, this.updateSongForm.get('year')?.value,
      this.updateSongForm.get('playCount')?.value).subscribe({
        next: res => {
          this.songData = res
          this.dialogRef.close();
        },
        error: err => {
          console.log(err);

        }
      })
  }

  onCancel() {
    this.dialogRef.close()
  }

}
