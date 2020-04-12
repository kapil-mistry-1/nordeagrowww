import { Component, OnInit, Input } from '@angular/core';
import { Fund } from '../../models/fund';
import { ReturnsFieldService } from '../../services/returns-field.service';
declare var $: any;
declare var Highcharts: any;

@Component({
  selector: 'app-performance-graph',
  templateUrl: './performance-graph.component.html',
  styleUrls: ['./performance-graph.component.scss']
})
export class PerformanceGraphComponent implements OnInit {
  @Input() public fundDetails: Fund;
  selectedYear1: boolean = false;
  selectedYear3: boolean = false;
  selectedYear5: boolean = false;
  constructor(private returnsFieldService: ReturnsFieldService) { }

  ngOnInit(): void {
    this.getYear(1);
  }

getYear(year: number){
  if(year == 1){
    this.selectedYear1 =true;
    this.selectedYear3 =false;
    this.selectedYear5 =false;
    this.genrteChart(this.fundDetails['chartData'][0]['1Y']);           
  } else if(year == 3){
    this.selectedYear1 = false;
    this.selectedYear3 = true;
    this.selectedYear5 = false;
    this.genrteChart(this.fundDetails['chartData'][0]['3Y']);
    this.fundDetails['chartData'][0]['3Y'] 
  } else if(year == 5){
    this.selectedYear1 = false;
    this.selectedYear3 = false;
    this.selectedYear5 = true;
    this.genrteChart(this.fundDetails['chartData'][0]['5Y']);  
  }
  this.returnsFieldService.returnsField(year);
}
  
genrteChart(data : any){
  $(function() {
    $('#container').highcharts({
      chart: {
        type: 'line',
        zoomType: 'x'
      },
      title: {
        text: ''
      },
      tooltip: {
        borderColor: '#0000a0',
        borderRadius: 10,
        borderWidth: 3,
        crosshairs: [true,false],
        pointFormat: '<b>{series.name} : </b> {point.y:.2f} <br/>',          
        xDateFormat: '<b>DATE : </b> %d %b %Y'                 
      },
       plotOptions: {
        series: {
            marker: {
              enabled: false
            }
        }
      },          
      xAxis: {
        visible: false,
        type: 'datetime'               
      },
      yAxis: {
        visible: false            
      },
      series: [{
        showInLegend: false, 
        color: '#0000a0',
        name: 'NAV',
        data: data
        }]
    });
});
}

}
