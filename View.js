class View{
	constructor(df){
        this.ctx = document.getElementById("myChart").getContext("2d");
		this.radioes=document.getElementsByName("radioButton");
//construct checkbox buttons
		this.df=df;
		this.filterDataSets=[];
		this.valueDataSets=[];
		this.filterDiv='';
		this.columns=df.listColumns();
		this.checkboxDiv=document.getElementById("checkboxDiv");
		this.groupByDiv=document.getElementById("groupByDiv");
		this.chartSettingDiv=document.getElementById("chartSettingDiv");
		this.checkboxes=this.createCheckbox(this.columns,this.checkboxDiv);
		this.selectColumnButton=this.createButton("select columns","selectColumns()",this.checkboxDiv);    
		this.createBreakLine(this.checkboxDiv);
		this.createBreakLine(this.checkboxDiv);
		this.createTextNode("Add Filtering Conditions: ",this.checkboxDiv);
		this.addFilterButton=this.createButton(" + ","addFilter()",this.checkboxDiv);
		this.createButton("Filtering Row","filter()",this.checkboxDiv);
		
//construct groupby selections		
		this.createBreakLine(this.groupByDiv);
		this.createBreakLine(this.groupByDiv);
		this.createTextNode(" Select ",this.groupByDiv);
		this.labelGroupby1=this.createSelection(df.listColumns(),this.groupByDiv);
		this.createTextNode(" Group By ",this.groupByDiv);
		this.labelGroupby2=this.createSelection(df.listColumns(),this.groupByDiv);
		this.createTextNode(" Having ",this.groupByDiv);
		this.labelGroupby3=this.createSelection(['Avg','Max','Min'],this.groupByDiv);
		this.createTextNode(" As ",this.groupByDiv);
		this.createInputText(this.groupByDiv);

//construct chartsetting selections 
		this.createBreakLine(this.chartSettingDiv);    
		this.createBreakLine(this.chartSettingDiv);
		this.createTextNode("Choose Label Data",this.chartSettingDiv);
		this.createBreakLine(this.chartSettingDiv);
		this.labelSelection=this.createSelection(df.listColumns(),this.chartSettingDiv);
		this.createBreakLine(this.chartSettingDiv);
		this.createBreakLine(this.chartSettingDiv);

		this.createTextNode("Choose Value Data",this.chartSettingDiv);
		this.createBreakLine(this.chartSettingDiv);
	    this.valueSelection=this.createSelection(df.listColumns(),chartSettingDiv);
		this.valueDataSets.push({selection:this.valueSelection,deleteButton:'',breakLine:''});
		this.createButton(" + ","addValue()",this.chartSettingDiv);
		this.createButton(" chart ","chartButtonClicked()",this.chartSettingDiv);
	}

     createSelection(labels,div){
        var select = document.createElement("SELECT");
        div.appendChild(select);

        for(var i=0;i<labels.length;i++){
            var option = document.createElement("option");
            option.label=labels[i];
            select.appendChild(option);

        }        
        return select;
    }
	
	createInputText(div){
		var text=document.createElement("input");
		text.setAttribute("type","text"); 
		div.appendChild(text);
		return text;
	}

	createButton(value,onclick,div){
		var button=document.createElement("input");
		button.setAttribute("type","button");
		button.setAttribute("value",value);
		button.setAttribute("onclick",onclick);
		div.appendChild(button);
		return button;
	}

	createCheckbox(array,div){
		var checkBox=new Array(array.length);
		var labels=new Array(array.length);
		for(var i=0;i<array.length;i++){
			checkBox[i]= document.createElement("input");
			checkBox[i].setAttribute("type", "checkbox");
			labels[i]=document.createElement("label");
			labels[i].htmlFor=checkBox[i];
			labels[i].appendChild(document.createTextNode(array[i]));
			div.appendChild(checkBox[i]);
			div.appendChild(labels[i]);
        }

		return checkBox;
	}
	
	createTextNode(text,div){
		var textNode=document.createTextNode(text);
		div.appendChild(textNode);

	}

	createBreakLine(div){
		var br=document.createElement("br");
		div.appendChild(br);
        return br;
	}

	createFilter(columns){
		var filterDataSet={option1:'',option2:'',option3:'',deleteButton:'',breakLine:''};
 		filterDataSet.breakLine=document.createElement("br");
		 this.checkboxDiv.appendChild(filterDataSet.breakLine);
		filterDataSet.option1=this.createSelection(columns,this.checkboxDiv);
		filterDataSet.option2=this.createSelection(['>','==','<'],this.checkboxDiv);
		filterDataSet.option3=this.createInputText(this.checkboxDiv); 
	    filterDataSet.deleteButton=this.createButton(" - ","deleteFilter(this)",this.checkboxDiv);
		this.filterDataSets.push(filterDataSet);
	}

	deleteFilter(button){
		for(var i=0;i<this.filterDataSets.length;i++){
			if(this.filterDataSets[i].deleteButton==button){
				this.checkboxDiv.removeChild(this.filterDataSets[i].option1);
				this.checkboxDiv.removeChild(this.filterDataSets[i].option2);
				this.checkboxDiv.removeChild(this.filterDataSets[i].option3);
				this.checkboxDiv.removeChild(this.filterDataSets[i].deleteButton);
				this.checkboxDiv.removeChild(this.filterDataSets[i].breakLine);
				this.filterDataSets.splice(i,1);
				break;
			}
		}

	}

	update(df){
		var newColumns=df.listColumns();
		for(var i=0;i<this.filterDataSets.length;i++){
			this.syncOptions(newColumns,this.filterDataSets[i].option1);
		}

		this.syncOptions(newColumns,this.labelGroupby1);
		this.syncOptions(newColumns,this.labelGroupby2);
		this.syncOptions(newColumns,this.labelSelection);
		this.syncOptions(newColumns,this.valueSelection);
	}

	syncOptions(newColumns,selection){
		    var removedOptions=[];
			var newOptions=[];
			for(var i=0;i<selection.options.length;i++){
				if(newColumns.indexOf(selection.options[i].label)==-1){
					removedOptions.push(selection.options[i]);
				}
			}

			for(var i=0;i<removedOptions.length;i++){
				selection.removeChild(removedOptions[i]);
			}

			for(var i=0;i<newColumns.length;i++){
				for(var j=0;j<selection.options.length;j++){
					if(selection.options[j].label==newColumns[i]){
						break;
					}else if(j==selection.options.length-1){
						var option = document.createElement("option");
						option.label=newColumns[i];
						newOptions.push(option);
					}

				}

			}
			for(var i=0;i<newOptions.length;i++){
				selection.appendChild(newOptions[i]);
			}
	}
}