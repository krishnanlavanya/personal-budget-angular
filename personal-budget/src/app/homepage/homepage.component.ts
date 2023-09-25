import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource : any ={
    datasets: [
     {
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#336EFF',
            '#58FF33',
            '#FF3333',
            '#FF9F33',

        ],
    }
],

    labels: []
};

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    this.http.get('http://locahost:3000/budget').subscribe((res: any) =>{
      for( var i=0; i< res.myBudget.length; i++)
      {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i]=res.myBudget[i].title;
          this.createChart();
      }
    });
  }

  createChart() {
    var ctx= document.getElementById("myChart");
    var myPieChart = new Chart(ctx as any,{
        type:'pie',
        data: this.dataSource
    });
  }


}
