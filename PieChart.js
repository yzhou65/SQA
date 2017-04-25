class PieChart extends ConfiguredChart{
        setChartConfig(){
                this.chartConfig.colorSet=[
                    "#F7464A",
                    "#46BFBD",
                    "#FDB45C",
                    "#949FB1",
                    "#4D5360",
                    
                    "#F7564A",
                    "#46CFBD",
                    "#FDC45C",
                    "#94AFB1",
                    "#4D6360",

                    "#17464A",
                    "#66BFBD",
                    "#1DB45C",
                    "#B49FB1",
                    "#6D5360",
                ];	    
            
            for(var i=0;i<this.data.datasets[0].data.length;i++){
                    var random=Math.round(Math.random()*15);
                    this.data.datasets[0].backgroundColor[i]=this.chartConfig.colorSet[random];
            }
            this.chartConfig.options={
                title:{
                        display:true,
                        text:"Pie Chart"
                        }
                       
                }
        }

        chart(){
            this.type='pie';
            if(myChart!=null) myChart.destroy();

            var myChart = new Chart(this.ctx, {
                type: this.type,
                data: this.data,
                options: {
                    text: this.chartConfig.options.title.text
                }
            });
        }
}


