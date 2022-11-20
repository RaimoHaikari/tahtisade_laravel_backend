import * as d3 from "d3";

import { 
    select
} from "d3";


export const D3Countdown = () => {

    let svg;
    let gElem;

    let gNeedle;
    let needle;

    let gText;
    let text;
    let textVal = 1;

    let angle = 0;
    
    let width = 200;
    let height = 200;
    let data = [];

    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let updateData;
    let updateHeight;
    let updateWidth;

    const drawBackground = () => {

        gElem
            .append("circle")
            .style("stroke", "none")
            .style("fill", "url('#myGradient')")
            .attr("r", 2*width)
        
        gElem
            .append("circle")
            .attr("class", "circles")
                .attr("r", width * 0.2)

        gElem
            .append("circle")
                .attr("class", "circles")
                .attr("r", width * 0.15);

        gElem
            .append("line")
                .attr("class", "lines")
                .attr("x1", -width / 2)
                .attr("y1", 0)                    
                .attr("x2", width / 2)
                .attr("y2", 0)    

        gElem
            .append("line")
                .attr("class", "lines")
                .attr("x1", 0)
                .attr("y1", -height / 2)                    
                .attr("x2", 0)
                .attr("y2", height / 2)       
    }

    const drawNeedle = () => {

        needle = gNeedle
            .append("line")
                .attr("class", "needle")
                .attr("x1", 0)
                .attr("y1", -height )                    
                .attr("x2", 0)
                .attr("y2", 0)

    }

    const update = () => {

        needle
            .transition()
            .ease(d3.easeLinear)
            .duration(100)
            .attr("transform",`rotate(${angle})`)

        text
            .text(textVal++)

        angle = angle + 10

        if(textVal>10)
            textVal = 1

    }

    function chart(selection){

        /*
         *
         */
        selection.each(function(){

            svg = d3
                .select(this)
                //.append('svg')
                    .attr("viewBox", [0,0, width, height]);

            gElem = svg
                .append('g')
                .classed("gBackground", true)
                .attr('transform', ` translate(${width/2},${height/2})`);

            gNeedle = svg
                .append('g')
                .classed("gNeedle", true)
                .attr('transform', ` translate(${width/2},${height/2})`);

            gText = svg
                .append('g')
                .classed("gText", true)
                .attr('transform', ` translate(${width/2},${height/2})`);

            drawBackground();
            drawNeedle();

            text = svg
                .append("text")
                .text(textVal)
                .attr("y", "50%")
                .attr("x", "50%")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle")
                .attr("font-size", 36)
                .attr("font-family", "monospace")
                .attr("fill", "white");


            setInterval(update,100)


            updateData = function() {}

            updateHeight = function() {}

            updateWidth = function() {}

        })
    }

    chart.data = function(val){

        if(!arguments.length) return data;

        data = val;

        if(typeof updateData === 'function')
            updateData();
   
        return chart

    }

    chart.height = function(val){

        if(!arguments.length) return height;

        height = val;

        if(typeof updateHeight === 'function')
            updateHeight();
   
        return chart

    }


    chart.width = function(val){

        if(!arguments.length) return width;

        width = val;

        if(typeof updataWidth === 'function')
            updateWidth();
   
        return chart

    }

    return chart

}