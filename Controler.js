
class Controler{
	constructor(view,data){
		this.view=view;
		this.data=data;
		this.columnSelectedDf;
		this.columns=data.df.listColumns();
		this.originDf=data.df;
	}
	

	addFilter(){
		this.view.createFilter(this.columns);
	} 
	
	
	addValue(){
		var valueDataSet={selection:'',deleteButton:'',breakLine:''};
 		 valueDataSet.breakLine=document.createElement("br");
		 this.view.chartSettingDiv.appendChild(valueDataSet.breakLine);
		valueDataSet.selection=this.view.createSelection(this.columns,this.view.chartSettingDiv);
	    valueDataSet.deleteButton=this.view.createButton(" - ","deleteValue(this)",this.view.chartSettingDiv);
		this.view.valueDataSets.push(valueDataSet);
	} 
	
	
	deleteValue(button){
			for(var i=0;i<this.view.valueDataSets.length;i++){
				if(this.view.valueDataSets[i].deleteButton==button){
					this.view.chartSettingDiv.removeChild(this.view.valueDataSets[i].selection);
					this.view.chartSettingDiv.removeChild(this.view.valueDataSets[i].deleteButton);
					this.view.chartSettingDiv.removeChild(this.view.valueDataSets[i].breakLine);
					this.view.valueDataSets.splice(i,1);
					break;
				}
			}
	}

	
	deleteFilter(button){
			view.deleteFilter(button);
	}

	
	selectColumns(){
			this.data.df=this.originDf;
			var originColumn=this.originDf.listColumns();
			for(var i=0;i<this.view.checkboxes.length; i++){
				if(this.view.checkboxes[i].checked==false) {           
					this.data.df=this.data.df.drop(originColumn[i]);
				}
			}
			this.columnSelectedDf=this.data.df;
			this.data.df.show();
			this.data.notifyObservers();        
    }

	
	filter(){
		var column, operation, inputValue;
		this.data.df=this.columnSelectedDf;
		for(var i=0;i<this.view.filterDataSets.length;i++){
			for(var i=0;i< this.view.filterDataSets.length;i++){
				var selectedIndex1=this.view.filterDataSets[i].option1.selectedIndex;
				var selectedIndex2=this.view.filterDataSets[i].option2.selectedIndex;
				var selectedOption1=this.view.filterDataSets[i].option1.options[selectedIndex1].label;
				var selectedOption2=this.view.filterDataSets[i].option2.options[selectedIndex2].label;
				
				if(selectedOption2=='>'){
					this.data.df=this.data.df.filter(row=>row.get(selectedOption1)>this.view.filterDataSets[i].option3.value);
				} else if(selectedOption2=='=='){
					this.data.df=this.data.df.filter(row=>row.get(selectedOption1)==this.view.filterDataSets[i].option3.value);
				}else if(selectedOption2=='<'){
					this.data.df=this.data.df.filter(row=>row.get(selectedOption1)<view.filterDataSets[i].option3.value);
				} else continue;

			}
		}
 		this.data.df.show(); 
	  this.data.notifyObservers();        
	}

	groupby(){
		var column1, column2,operation, newName;
		column1=this.view.labelGroupby1.options[this.view.labelGroupby1.selectedIndex].label;
		column2=this.view.labelGroupby2.options[this.view.labelGroupby2.selectedIndex].label;
		operation=this.view.labelGroupby3.options[this.view.labelGroupby3.selectedIndex].label;
		newName=this.view.newGroupName.value;
				
				if(operation=='Avg'){
					this.data.df= this.data.df.groupBy(column1, column2);
					this.data.df.aggregate(group => group.count()).rename('aggregation', 'groupCount');
				} else if(operation=='Max'){
					this.data.df=this.data.df.filter(row=>row.get(selectedOption1)==this.view.filterDataSets[i].option3.value);
				}else if(operation=='Min'){
					this.data.df=this.data.df.filter(row=>row.get(selectedOption1)<view.filterDataSets[i].option3.value);
				}else if(operation=='Count'){
					this.data.df= this.data.df.groupBy(column1, column2);
					this.data.df.aggregate(group => group.count(column1)).rename('aggregation', newName);	
				}

 		this.data.df.show(); 
	    this.data.notifyObservers();        
	}
	
	update(df){
		this.data.df=df;
		this.columns=df.listColumns();
	}

	
	chart() {
		var chartFactory=new ChartFactory();
		var type;
		var valueColumns=[];
		var dataSets=[];
		for(var i=0;i<this.view.radioes.length;i++){
			if(this.view.radioes[i].checked){
				type=this.view.radioes[i].value;
				break;
			}
		}
		
		var labelColumn=this.view.labelSelection.options[this.view.labelSelection.selectedIndex].label;
		var valueArrays=[];
		var labels=this.data.df.select(labelColumn).toArray();// elements of the selected label colomn for labels

		for(var i=0;i<this.view.valueDataSets.length;i++){
			valueColumns.push(this.view.valueDataSets[i].selection.options[this.view.valueDataSets[i].selection.selectedIndex].label);
			valueArrays.push(this.data.df.select(valueColumns[i]).toArray());
		}
	
		for(var i=0;i<labels.length;i++){
			var valueArray=[];
			for(var j=0;j<valueArrays.length;j++){
				valueArray.push(valueArrays[j][i]);
			}
			dataSets.push(new DataUnit(labels[i],valueArray));
		}  
		var chart= chartFactory.createChart(this.view.ctx,type,valueColumns,dataSets);
			chart.parseDataSets();
			chart.setChartConfig();
			chart.chart();
	}
}