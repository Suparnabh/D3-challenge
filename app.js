// @TODO: YOUR CODE HERE!
d3.csv("data.csv").then(function(demoData){
    console.log(demoData);

// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 1200;
var svgHeight = 660;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// data

const healthcare = [];
const poverty = [];
const state = [];



demoData.forEach(item=>{
        healthcare.push(+item.healthcare);
        poverty.push(+item.poverty);
        state.push(item.abbr);
});


console.log(healthcare);
console.log(poverty);
console.log(state);

// append svg and group
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// scales
var xScale = d3.scaleLinear()
  .domain([0, d3.max(poverty)])
  .range([0, width]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(healthcare)])
  .range([height, 0]);

// create axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);


// append axes
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(xAxis);

chartGroup.append("g")
.call(yAxis);

//add axis labels
chartGroup.append("text")
.attr("text-anchor", "middle")  
.attr("transform", `translate(${margin.left-80}, ${height /2})rotate(-90)`)  
.text("In Household %");

chartGroup.append("text")
.attr("text-anchor", "middle")  
.attr("transform", `translate(${width / 2}, ${height + margin.top -10})`)  
.text("In Poverty %");


// append circles to data points
var circlesGroup = chartGroup.selectAll("circle")
.data(demoData)
.enter()
.append("circle")
.attr("cx", d => xScale(+d.poverty))
.attr("cy", d => yScale(+d.healthcare))
.attr("r", "10")
.attr("fill", "#89bdd3")
.attr("stroke","#e3e3e3");

//Add the SVG Text Element to the svgContainer
const text = chartGroup.selectAll("text")
.data(demoData)
.enter()
.append("text");

//Add SVG Text Element Attributes
const textLabels = text
.attr("x", d=> xScale(+d.poverty))
.attr("y", d => yScale(+d.healthcare))
.text(d=>d.abbr)
.attr("font-family","sans-serif")
.attr("fill","white")
.attr("font-size","7px")
.attr("text-anchor","middle");

});