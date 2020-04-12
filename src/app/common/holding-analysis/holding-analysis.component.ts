import {
  Component,
  OnInit, Input, ViewChild
} from '@angular/core';
import { Fund } from '../../models/fund';
import { NgStyle } from '@angular/common';
declare var $: any;
declare var Highcharts: any;

@Component({
  selector: 'app-holding-analysis',
  templateUrl: './holding-analysis.component.html',
  styleUrls: ['./holding-analysis.component.scss']
})
export class HoldingAnalysisComponent implements OnInit {
  @Input() fundDetails: Fund;
  dataForChart;
  
  constructor() {
    
  }
  
  ngOnInit() {
    this.dataForChart = [
      {
      name: 'Services',
      y: this.fundDetails.yvalService
      }, {
      name: 'Others',
      y: this.fundDetails.yvalOthers
      }, {
      name: 'Technology',
      y: this.fundDetails.yvalTechnology
      }, {
      name: 'Financial',
      y: this.fundDetails.yvalFinancial
      }, {
      name: 'FMCG',
      y: this.fundDetails.yvalFMCG
      }, {
      name: 'Chemicals',
      y: this.fundDetails.yvalChemical
    }]
    this.createChartForHoldingAnalysis(this.dataForChart, this.fundDetails.allocatedFund);
  }
  createChartForHoldingAnalysis (data : any, allocatedFund: string){
    $(function () {
      
      Highcharts.setOptions({
        colors: ['#2B547E', '#342D7E', '#0041C2', '#6960EC', '#488AC7', '#95B9C7', '#56A5EC', '#00FFFF']
      });
      $('#pieChart').highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          type: 'pie',
          marginBottom: 100,
          marginLeft: 100
        },
        legend: {
          useHTML: true,
          labelFormatter: function() {
                return '<div style=" display: flex;-webkit-box-align: center; '
                +'position: relative;margin-bottom: 15px; ">'
                +'<div style="color:#000000,font-size:12px !important; width:150px">'
                +'<b>'+ this.name + '</b></div><div style="color:#000000,font-size:12px position: absolute;top: 0;right: -95px;!important;">'+this.y+'%</div></div>'; 
        },	
          align: 'right',
          verticalAlign: 'top',
          layout: 'vertical',
          x: 0,
          y: 105
        },
        title: {
          text: 'Equity Sector Allocation',
          x: -60

        },
        subtitle: {
          text: allocatedFund,
          x:-67,
          y:180,
          style: {
            fontWeight: 'bold'
        }
      },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            showInLegend: true
          },
          series: {
            animation: false
          }
        },
        series: [{
          name: '',
          type: 'pie',
          //colorByPoint: true,
          innerSize: '50%',
          data:  data
        }]
    });
  });
}

}
