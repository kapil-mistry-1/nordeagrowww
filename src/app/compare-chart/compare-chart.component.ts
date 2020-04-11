import { Component, OnInit, Input } from '@angular/core';
import { FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
declare var $: any;
declare var Highcharts: any;
@Component({
  selector: 'compare-chart',
  templateUrl: './compare-chart.component.html',
  styleUrls: ['./compare-chart.component.scss']
})
export class CompareChartComponent implements OnInit {

  @Input() parentSubject: Subject<any>;
  showChartContainer: Boolean = false;
  fundDetails: any;
  selectedVal: any;
  constructor() { }
  ngOnInit(): void {
    this.selectedVal = '1';

    this.parentSubject.subscribe(event => {
      this.fundDetails = event;
      //  console.log('called when the fund selected at chart parent page', event);
      if (event.length != 0) {
        this.updateChart(event);
        this.showChartContainer = true;
      }
      else {
        this.showChartContainer = false;
        var chart = $("#chartcontainer").highcharts();
        chart ? chart.destroy() : 'alert(something went wrong)'
      }
    });

  }
  updateChart(event) {
    this.selectedVal = '1';

    var chartOptions = {
      chart: {
        type: 'spline',
        marginTop: 150,
        margin: 0,
        renderTo: 'chartcontainer',
      },
      title: {
        text: 'Performance Graph',
        style: {
          fontSize: '20px',
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
          fontWeight: '500'
        },
        align: 'left',
      },
      legend: {
        align: 'right',
        display: 'flex',
        verticalAlign: 'top',
        layout: 'vertical',
        itemMarginTop: 5,

      },
      tooltip: {
        borderColor: '#0000a0',
        borderRadius: 10,
        borderWidth: 3,
        shared: true,
        split: true,
        crosshairs: [true,false],

        pointFormatter: function () {
          var point = this,
            series = point.series,
            legendSymbol = "<svg width='20' height='20'>" + series.legendSymbol.element.outerHTML + "</svg>";
          return '<span style="margin:auto">' + legendSymbol + '<b>NAV : </b> ' + point.y + ' Rs.</span><br/>';
        },
        xDateFormat: '<b>DATE : </b> %d-%b-%Y'   

      },
      xAxis: {
        visible: false,
        type: 'datetime',
       
      },
      yAxis: {
        visible: false
      },
      // series: [{
      // }]
    };
    $(function () {
      var chart1 = new Highcharts.Chart(chartOptions);
      let colormap = { 0: '#0000A0', 1: '#9400D3', 2: '#00d09c' };
      //fundChartData pass from chart parent page contains all fund details
      if (chart1) {
        for (let i = 0; i < event.length; i++) {
          let fundChartData = event[i]['fundChartData'];
          var legendtitle =fundChartData['name'] + ' (' + fundChartData['oneYear'] + ') '
          chart1.addSeries({
            name: legendtitle,
            data: fundChartData['chartData'][0]['1Y'],
            color: colormap[i]
          });
        }
        chart1.redraw();
      }
    });
  }

  plotSeriesData(data, year) {
    let yearmap = { 1: '1Y', 3: '3Y', 5: '5Y' };
    let titleyearmap = { 1: 'oneYear', 3: 'threeYears', 5: 'fiveYears' };

    var chart2 = $("#chartcontainer").highcharts();
    if (chart2) {
      for (let i = 0; i < this.fundDetails.length; i++) {
        let fundChartData = this.fundDetails[i]['fundChartData']
        var legendtitle = fundChartData['name'] + ' (' + fundChartData[titleyearmap[year]] + ') '
        chart2.series[i].update({ name: legendtitle });
        chart2.series[i].setData(fundChartData['chartData'][0][yearmap[year]])
      }
    }
  }
  onValChange(event) {
    this.selectedVal = event;
    this.plotSeriesData(this.fundDetails, event)
  }


}
