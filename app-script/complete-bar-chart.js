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
        sells:14
    }
    ,{
        axis:"Dec",
        sells:91
    }
];
// console.log(data.map(x=>x.sells));
function renderBarChart(renderContainer,dataset,config){
    const id = `#${renderContainer.id}`;
    // const chart_prop = {
    //     margin:{
    //         top:config.margin_top,
    //         right:config.margin_right,
    //         bottom:config.margin_bottom,
    //         left:config.margin_left,
    //     },
    //     recat_padding:config.padding,
    //     x_axis_space:20,
    //     y_axis_space:20,
    //     chart_content:{
    //         width:renderContainer.width-config.margin_left-config.margin_right-20,
    //         height:renderContainer.height-config.margin_top-config.margin_bottom-20
    //     }
    // }
    const width_container = renderContainer.width;
    const height_container = renderContainer.height;
    const padding = config.padding;
    const width_rect = (width_container/dataset.length)-2*padding;
    const x_axis_space = 20;
    const y_axis_space = 20;
    

    const xScale = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([y_axis_space,width_container]);
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height_container-x_axis_space,0]);


    var svg = d3.select(id)
        .append('svg')
        .attr('width','100%')
        .attr('height','100%');

    var rect_group = svg.append("g").attr("class","rect-group");
    

    rect_group
        .selectAll(".rects")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width",width_rect)
        .attr("height",function(d,i){
            return yScale(100-d.sells);
        })
        .attr("class","rects")
        .style("fill",function(d){
            if(d.sells<40){
                return "red";
            }else{
                return "green";
            }
        })
        .attr("x",function(d,i){
            return xScale(i)+padding;
        })
        .attr("y",function(d,i){
            return yScale(d.sells);
        });
    
    var x_axis_group = svg.append("g").attr("class","x-axis-group");

    x_axis_group
        .selectAll(".x-axis-items")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class","x-axis-items")
        .text(function(d){
            return d.axis;
        })
        .style("fill","#000000")
        .attr("x",function(d,i){
            return xScale(i)+(width_rect/2)+padding;
        })
        .attr("y",function(d,i){
            return yScale(0)+15;
        })
        .style('text-anchor', 'middle');
    
    var y_axis_arr = [];

    for(var i = 0;i<=100;i+=20){
        y_axis_arr.push(i);
    }
    
    var y_axis_group = svg.append("g").attr("class","y-axis-group");
    
        y_axis_group
            .selectAll(".y-axis-items")
            .data(y_axis_arr)
            .enter()
            .append("text")
            .attr("class","y-axis-items")
            .text(function(d){
                return d;
            })
            .style("fill","#000000")
            .attr("x",function(d,i){
                return 0;
            })
            .attr("y",function(d,i){
                return yScale(d)+2;
            })
            .style('text-anchor', 'start');
        

}
