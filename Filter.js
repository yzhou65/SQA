class ChartFactory{
	createChart(ctx,type,dataSets){
		if(type=="Bar"){
			var chart=new BarChart(ctx,type,dataSets);
		} else if (type=="Line"){
			var chart=new LineChart(ctx,type,dataSets);
		}else if(type=="StackedBar"){
			var chart=new StackedBarChart();
		}
		else if(type=="Pie"){
			var chart=new PieChart();
		}else
		{
			console.log("input chart type not acceptable");
		}
	}
}