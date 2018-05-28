var data = [
    {
        axis:"Jan",
        sells:45,
        sells1:5,
        sells2:12
    },
    {
        axis:"Feb",
        sells:25,
        sells1:15,
        sells2:12
    },
    {
        axis:"Mar",
        sells:65,
        sells1:35,
        sells2:12
    },{
        axis:"Apr",
        sells:75,
        sells1:25,
        sells2:12
    },
    {
        axis:"May",
        sells:15,
        sells1:20,
        sells2:12
    },
    {
        axis:"Jun",
        sells:5,
        sells1:30,
        sells2:12
    },
    {
        axis:"Jul",
        sells:40,
        sells1:6,
        sells2:12
    },{
        axis:"Aug",
        sells:21,
        sells1:8,
        sells2:12
    },
    {
        axis:"Sep",
        sells:78,
        sells1:14,
        sells2:12
    },{
        axis:"Oct",
        sells:62,
        sells1:4,
        sells2:12
    }
    ,{
        axis:"Nov",
        sells:10,
        sells1:11,
        sells2:12
    }
    ,{
        axis:"Dec",
        sells:91,
        sells1:50,
        sells2:12
    }
];
function renderBarChart(renderContainer,dataset,config){

    var maxSells = 0;
    for(var i = 0; i< dataset.length;i++){
        var sum = dataset[i].sells+dataset[i].sells1+dataset[i].sells2;
        if(sum>maxSells){
            maxSells = sum;
        }
        // maxSells = dataset[i].sells > maxSells?dataset[i].sells:maxSells;
    }
    maxSells = Math.ceil(maxSells/20)*20;
    console.log(maxSells);
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

    var secondary_rect_group = svg.append("g").attr("class","secondary_rect-group");
    
    secondary_rect_group
        .selectAll(".rects2")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width",function(){
            return widthRect;
        })
        .attr("height",function(d){
            return yScale(d.sells1) - config.margin.top;
        })
        .attr("class","rects2")
        .style("fill",function(d){
            return "rgba(168,168,234,1)"
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
            return yScale(maxSells-(d.sells1+d.sells));
        })
        .on("mouseover", rectMouseIn)
        .on("mouseout", rectMouseOut)


        var green_rect_group = svg.append("g").attr("class","green_rect-group");
    
    green_rect_group
        .selectAll(".rect3")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width",function(){
            return widthRect;
        })
        .attr("height",function(d){
            return yScale(d.sells2) - config.margin.top;
        })
        .attr("class","rect3")
        .style("fill",function(d){
            return "orange"
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
            return yScale(maxSells-(d.sells1+d.sells+d.sells2));
        })
        .on("mouseover", rectMouseIn)
        .on("mouseout", rectMouseOut)
    var special_vertical_path = svg.append("g")
        .attr("class", "special_vertical_lines");

    special_vertical_path
        .append('path')
        .attr('class', 'special_vertical_line')
        .attr('stroke', 'yellow')
        .attr('stroke-width', '3')
        .attr('d', function () {
            var x = xScale(2)+ (widthRect/2) + padding;
            return "M "+x+" "+config.margin.top+" V "+(height_container-config.margin.bottom-x_axis_space);
        });
    var x_axis_group = svg.append("g").attr("class","x-axis-group");

    x_axis_group
        .selectAll(".x-axis-items")
        .data(dataset)
        .enter()
            .append("text")
            .attr("class","x-axis-items")
            .attr("id",function(d,i){
                return "x_axis_text_"+i;
            })
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
        .attr("text-anchor","start");
}



function rectMouseIn(d,i){
    console.log("In : "+JSON.stringify(d, undefined,2)+" i is "+i);
    console.log( d3.event.clientX, d3.event.clientY );
    d3.select(this).style("opacity",0.5);
    var index = i;
    var id = "#x_axis_text_"+index;
    d3.select(id).style("fill","#ff0000").style("font-size","20px");
}
function rectMouseOut(d,i){
    console.log("Out : "+JSON.stringify(d, undefined,2)+" i is "+i);
    d3.select(this).style("opacity",1);
    var index = i;
    var id = "#x_axis_text_"+index;
    d3.select(id).style("fill","#000000").style("font-size","14px");
}
