class StackedBarChart extends ConfiguredChart{
	    
        setChartUnitConfig(){
            for(var i=0;i<this.data.datasets.length;i++){
                var random=Math.round(Math.random()*5);
                this.data.datasets[i].backgroundColor=backgroundColor[random];
               // this.data.datasets[i].borderColor=borderColor[random];
              //  this.data.datasets[i].borderWidth=borderWidth;               

            }
        }
        
        setChartConfig(){

                var max=0;
                for(var i=0;i<this.data.datasets.length;i++){
                var number=Math.max.apply(null,this.data.datasets[i].data);
                    if(max<number) max=number;
                }
                var step= Math.round(max/10);
                this.chartConfig.options.scales={
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    steps: step,
                                    max:max
                                },
                                stacked: true
                            }],
                            
                            xAxes: [{
                                    stacked: true
                            }]
                }
                this.chartConfig.options.title={
                            display:true,
                            text:"Stacked Bar Chart"
                }
            }

        chart(){
            this.type='bar';
             if(myChart!=null) myChart.destroy();
            myChart = new Chart(this.ctx, {
                type: this.type,
                data: this.data,

                options: {
                    title:{
                        display:true,
                        text:"Chart.js Bar Chart - Stacked"
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
           /*     options: {
                    scales: {

                        yAxes: [{
                            ticks: {
                                    beginAtZero:true,
                                    steps: 10,
                                    max:100
                                },
                   stacked: true
                        }]
                    },
                    title:{
                        display:true,
                        text:"Chart.js Bar Chart - Stacked"
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: true,
                    /*scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
                options:{
                    title:{
                        display:true,
                        text:"Chart.js Bar Chart - Stacked"
                    },
                    tooltips: {
                        mode: 'label'
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            ticks: {
                                    beginAtZero:true,
                                    steps: 10,
                                    max:100
                                },
                            stacked: true
                        }]
                    }
                }
            });*/
        }
}


