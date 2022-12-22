import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  addSongForm!: FormGroup;
  submitted = false;
  songData: any;
  allValues!: FormData;
  file!: File;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,
    public dialogRef: MatDialogRef<AddSongComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addSongForm = this.formBuilder.group({
      song: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      artist: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      releaseYear: ["",[Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      first: ["",Validators.required],
      year: ["",Validators.required],
      playCount: ["",Validators.required],
    })
  }

  get f() {
    return this.addSongForm.controls;
  }

  upload(files: FileList){
     this.file = files[0]
    console.log(files);
  }

  onAdd(){
    this.submitted = true;
    if (this.addSongForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append("file", this.file);
    formData.append("song", this.addSongForm.get('song')?.value);
    formData.append("artist", this.addSongForm.get('artist')?.value);
    formData.append("releaseYear", this.addSongForm.get('releaseYear')?.value);
    formData.append("first", this.addSongForm.get('first')?.value);
    formData.append("year", this.addSongForm.get('year')?.value);
    formData.append("playCount", this.addSongForm.get('playCount')?.value);

    this.authService.createSong(formData).subscribe({
      next: res => {
        this.songData = res
        this.dialogRef.close();
      },
      error: err => {
        console.log(err);

      }
    })
  }

  onCancel(){
    this.dialogRef.close()
  }

}
