import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from './services/auth.service';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { AddSongComponent } from './components/add-song/add-song.component';
import { UpdateSongComponent } from './components/update-song/update-song.component';
import { DeleteSongComponent } from './components/delete-song/delete-song.component';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const AUTH_API = environment.baseUrl;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  title = 'Task';
  items = ['item 1', 'item 2', 'item 3', 'item 3', 'item 3'];
  dtOptions: DataTables.Settings = {};
  songsData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  itemId: any;
  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dtOptions = {
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollCollapse: true,
      scrollX: true,
      responsive: true,
      dom: 'lBfrtip'
    };
    this.getSongs();
  }

  getSongs(){
    this.authService.getSongs().subscribe({
      next: res => {
        console.log(res);
        
        this.songsData = res;
      }
    })
  }

  addSong(){
      const dialogRef = this.dialog.open(AddSongComponent, {
        width: '900px',
        panelClass: 'custom-modalbox',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
  }

  onUpdate(item: any,i:any){
    this.itemId = item.id
    const dialogRef = this.dialog.open(UpdateSongComponent, {
      width: '900px',
      panelClass: 'custom-modalbox',
      data: { rowData: item },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.authService.getSongById(this.itemId).subscribe({
        next: data => {
          console.log(data);
          this.songsData[i] = data;
        }
      })
      
    });
  }

  onDelete(item: any,i: any){
    const deleteDialogRef = this.dialog.open(DeleteSongComponent, {
      width: '350px',
      data: { rowData: item },
      disableClose: true
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      this.songsData.splice(i, 1);
     //  this.getSongs();
      // console.log('The dialog was closed : ' + result);
      if (result === true) {

        // this.refreshTableData.emit();
       // this.songsData.splice(ind, 1);
      }

    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
