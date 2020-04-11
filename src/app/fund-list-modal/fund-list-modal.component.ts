import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FundService } from '../services/fund.service';
import { Fund } from '../models/fund';

@Component({
  selector: 'app-fund-list-modal',
  templateUrl: './fund-list-modal.component.html',
  styleUrls: ['./fund-list-modal.component.scss']
})
export class FundListModalComponent implements OnInit {
  myControl = new FormControl();
  fundsList: Fund[];
  filteredOptions: Observable<Fund[]>;
  modalIndex: number;
  fundListAfterSelect:Fund[]; 

  constructor(public dialogRef: MatDialogRef<FundListModalComponent>, private fundService: FundService, @Inject(MAT_DIALOG_DATA) modalData) { 
    this.modalIndex = modalData.modalid;
    this.fundListAfterSelect = modalData.fundListAfterSelect;

  }

  ngOnInit(): void {
    this.getFunds();
    
  }

  displayFn(option: Fund): any {
    return option ? option.name : option;
  }

  getFunds(): void {
    this.fundService.getFunds()
      .subscribe((data) => {
        this.fundsList = data;
        if (this.fundListAfterSelect.length > 0) {
          this.fundsList = this.fundsList.filter(o => !this.fundListAfterSelect.find(o2 => o2.id === o.id));
        }
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      });
  }

  private _filter(value: any): Fund[] {
      const filterValue = value;
      return this.fundsList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onFundSelection(option: any): void {
    option.value['modalBoxId'] = this.modalIndex;
    this.dialogRef.close(option.value);
  }

}
