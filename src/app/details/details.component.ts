import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundService } from '../services/fund.service';
import { Fund } from '../models/fund';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public fundDetails: Fund;
  fundId;
  fundname;
  constructor(private route: ActivatedRoute, private fundService: FundService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.fundService.getFundsById(routeParams.id).subscribe((data) => {
        this.fundDetails = data[0];
      });
    });    
  }
  navigateCompare(){
    this.router.navigate(['/compare', this.fundId]);
  }
}
