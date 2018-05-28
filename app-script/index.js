//$('#svg-container').text("Hi");
var svg = d3.select("#svg-container")
    .append("svg")
    .attr("width","100%");

const startingX = 50;
const radius = 25;
const startingY = 50;
const padding = 20;

var arr = [
    {
        r:25,
        color:"red"
    },
    {
        r:20,
        color:"blue"
    },
    {
        r:35,
        color:"green"
    },
    {
        r:10,
        color:"yellow"
    },
    {
        r:45,
        color:"cyan"
    }
];


// for(let i =1;i<=5;i++){
//     svg.append("circle")
//     .attr("id",function(){
//         return "#id"+i;
//     })
//     .attr("cx",function(){
//         return (i)*(startingX)+(i-1)*padding;
//     })
//     .attr("cy",startingY)
//     .attr("r",radius)
//     .attr("class","circ")
//     .style("stroke","#3cb3e7");
// }
// svg
//     .selectAll(".circleClass")
//     .data(arr)
//     .enter()
//         .append("circle")
//         .attr("id",function(data,i){
//             return "id"+i;
//         })
//         .attr("cx",function(data,i){
            
//             return (i+1)*(startingX)+(i)*padding;
//         })
//         .attr("cy",startingY)
//         .attr("r",function(d,i){ 
//             console.log("d is"+JSON.stringify(d));
//             return d.r})
//         .attr("class","circleClass")
//         .style("fill",function(d){
//             return d.color;
//         });
var container_obj = {id:"bar-chart",height:500,width:500};
var configObj = {
    axisCount:5,
    padding:10,
    margin:{
        top:40,
        right: 100,
        bottom:90,
        left: 10
    }
};

renderBarChart(container_obj,data,configObj);
window.addEventListener('resize', function(){
    renderBarChart(container_obj,data,configObj);
});


    