var data = [
    {
        axis:"Jan",
        sells:45
    },
    {
        axis:"Feb",
        sells:25
    },
    {
        axis:"Mar",
        sells:65
    },{
        axis:"Apr",
        sells:75
    },
    {
        axis:"May",
        sells:15
    },
    {
        axis:"Jun",
        sells:5
    },
    {
        axis:"Jul",
        sells:40
    },{
        axis:"Aug",
        sells:21
    },
    {
        axis:"Sep",
        sells:78
    },{
        axis:"Oct",
        sells:62
    }
    ,{
        axis:"Nov",
        sells:10
    }
    ,{
        axis:"Dec",
        sells:91
    }
];
function renderBarChart(renderContainer,dataset,config){

    var maxSells = 100;
    // for(let i = 0; i< dataset.length;i++){
    //     maxSells = dataset[i].sells > maxSells?dataset[i].sells:maxSells;
    // }
    // console.log(maxSells);
    // maxSells *= 1.25;
    const id = "#"+renderContainer.id;
    const x_axis_space = 20;
    const y_axis_space = 20;
    const secondary_y_axis_space = 25;
    var canvas_details = d3.select(id)
        .node().getBoundingClientRect().valueOf();
    const width_container = canvas_details.width;
    const height_container = canvas_details.height;
    const padding = config.padding;
    const widthRect = ( (width_container-config.margin.left-config.margin.right-y_axis_space)/dataset.length)-2*padding;
    const xScale = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([y_axis_space+config.margin.left,width_container-config.margin.right]);
    const yScale = d3.scaleLinear()
        .domain([0, maxSells])
        .range([config.margin.top,height_container-x_axis_space-config.margin.bottom]);

    var y_axis_arr = [];
    var incVl = maxSells/config.axisCount;
    for(i=0;i<=maxSells;i+=incVl){
        y_axis_arr.push(i);
    }
    
    d3.select(id).select('svg')
        .remove();
    var svg = d3.select(id)
        .append('svg')
        .attr('width','100%')
        .attr('height','100%');


    if(widthRect<=0){
        svg.append("text")
            .text("no space to render chart.")
            .attr("x","50")
            .attr("y","250");
        return;
    }
    var horizontal_path = svg.append("g")
        .attr("class", "horizontal_lines");
    horizontal_path
            .selectAll(".horizontal_line")
            .data(y_axis_arr)
            .enter()
            .append('path')
            .attr('class', 'horizontal_line')
            .attr('stroke', '#aaaaaa')
            .attr('stroke-width', '1')
            .attr('stroke-dasharray', '0.9')
            .attr('d', function (d) {
            var y = yScale(maxSells - d);
                return "M "+(config.margin.left+y_axis_space)+" "+ y+" H "+(width_container-config.margin.right);
            });
    var vertical_path = svg.append("g")
        .attr("class", "vertical_lines");
    vertical_path
        .selectAll(".vertical_line")
        .data(dataset)
        .enter()
        .append('path')
        .attr('class', 'vertical_line')
        .attr('stroke', '#aaaaaa')
        .attr('stroke-width', '1')
        .attr('stroke-dasharray', '0.9')
        .attr('d', function (d,i) {
            var x = xScale(i);
            return "M "+x+" "+config.margin.top+" V "+(height_container-config.margin.bottom-x_axis_space);
        });
    var rect_group = svg.append("g").attr("class","rect-group");

    rect_group
        .selectAll(".rects")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width",function(){
            return widthRect;
        })
        .attr("height",function(d){
            
            return yScale(d.sells) - config.margin.top;
        })
        .attr("class","rects")
        .style("fill",function(d){
            return "rgba(69,168,234,1)"
            // if(d.sells<40){
            //     return "red";
            // }else{
            //     return "green";
            // }
        })
        .attr("x",function(d,i){
            return xScale(i)+padding;
        })
        .attr("y",function(d){
            return yScale(maxSells-d.sells);
        })
        .on("mouseover", rectMouseIn)
        .on("mouseout", rectMouseOut)
    
    var x_axis_group = svg.append("g").attr("class","x-axis-group");

    x_axis_group
        .selectAll(".x-axis-items")
        .data(dataset)
        .enter()
            .append("text")
            .attr("class","x-axis-items")
            .text(function(d){return d.axis})
            .attr("x",function(d,i){
                return xScale(i)+padding+widthRect/2;
            })
            .attr("y",function(){
                return height_container - config.margin.bottom;
            })
            .attr("text-anchor","middle")
            .style("fill","#000000")
            .style("font-size","14px");
    

    
    var y_axis_group = svg.append("g").attr("class","y-axis-group");
        
    y_axis_group
        .selectAll(".y-axis-items")
        .data(y_axis_arr)
        .enter()
        .append("text")
        .attr("class","x-axis-items")
        .text(function(d){return d;})
        .attr("x",function(d,i){
            return config.margin.left;
        })
        .attr("y",function(d){
            return yScale(maxSells - d)+5;
        })
        .style("fill","#000000")
        .style("font-size","14px");

    var secondary_y_axis_group = svg.append("g").attr("class","y-axis-group-one");

    secondary_y_axis_group
        .selectAll(".y-axis-items")
        .data(y_axis_arr)
        .enter()
        .append("text")
        .attr("class","x-axis-items")
        .text(function(d){return d/10+" L.C";})
        .attr("x",function(d,i){
            return width_container - config.margin.right + secondary_y_axis_space;
        })
        .attr("y",function(d){
            return yScale(maxSells - d)+5;
        })
        .attr('d', function (d) {
            var y = yScale(maxSells - d);
                return "M "+(config.margin.left+y_axis_space)+" "+ y+" H "+(width_container-config.margin.right);
            })
        .style("fill","#000000")
        .style("font-size","14px")
        .attr("text-anchor","end");
}



function rectMouseIn(d,i){
    console.log("In : "+JSON.stringify(d, undefined,2)+" i is "+i);
    console.log( d3.event.clientX, d3.event.clientY );
    d3.select(this).style("opacity",0.5);
}
function rectMouseOut(d,i){
    console.log("Out : "+JSON.stringify(d, undefined,2)+" i is "+i);
    d3.select(this).style("opacity",1);
}
