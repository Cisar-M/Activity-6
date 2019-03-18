import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Chart} from 'Chart.js' ;
import{ ReportingService }from './reporting.service';
import{mergeMap,groupBy,map,reduce} from 'rxjs/operators';
import{of} from 'rxjs'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReportApp';
  chart =[];
  options =[
    {id: 1 , text: "Pretoria"},
    {id: 2 , text: "Nelspruit"},
    {id: 3, text: "Durban"}
  ]
  selection:Number=3;
  constructor(private reporting : ReportingService){}

  random_rgba(){
    var o = Math.round, r=Math.random ,s=255;
    return ' rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s)+ ',0.7)';
   }

  submitRequest(){
    this.reporting.getReportingData(this.selection).subscribe(response =>{
      console.log(response);
      let keys =response["Branches"].map(d =>d.description);
      let values = response["Branches"].map(d=>d.Amount);

        this.employee = response("Employees");

        this.chart = new Chart('canvas',{
          type:'bar',
          data:{
            labels: keys,
            Datasets: [
              {
                data: values,
                boarderColor: "#3cba9f",
                fill: false,
                backgroundColor: [
                  this.random_rgba(),
                  this.random_rgba(),
                  this.random_rgba(),
                  this.random_rgba()
                ]
              }
            ]
          },
          options:{
            legend: {
              display:false
            },
            title: {
              display:true,
              text: "Sales by Branch"
            },
            Scale:{
              xAxes:[{
                display: true,
                barPercentage:0.75
              }],
              yAxes: [{
                display: true,
                ticks:{
                  min: 0,
                  max: 100
                }
              }]
            }
          }
        })

    })

  }
}


