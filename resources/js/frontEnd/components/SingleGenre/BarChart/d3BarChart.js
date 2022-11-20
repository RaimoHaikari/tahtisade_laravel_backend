import * as d3 from "d3";
import { 
    format,
    select
} from "d3";

export const d3BarChact = () => {

    let svg;
    let gElem;
    let gActive;    // Aktiivisen genren arvosanojen jakauman sisältävä kerros
    let gComp;      // Vertailtavan genren arvosanojen jakauman sisältävä kerros

    let gYAxis;
    let gYAxisLbl;
    let gXAxis;

    let acBars;     // Aktiivisen genren arvosanojen jakaumaa esittävät pylvänäiset
    let compBars;   // Vertailtavana olevan genren arvosanojen jakaumaa esittävät pylvänäiset

    let acBarsWidthScale = 0.5;

    let tooltip;


    let actData = []
    let compData = [];

    let width = 200;
    let height = 200;
    let margin = {top: 20, right: 50, bottom: 50, left: 100};

    let tooltipMargin = {top: 80}

    /*
     * Kun kaikki genret ja tähtimäärien arvostelujen lukumäärät huomioidaan, 
     * niin mikä on suurin yksittäisen tähtimäärän arvostelujen lukumäärä
     */
    let maxNumbOfStars;

    // Curranin value accessorit..
    let xValue;
    let yValue;

    // Akselit
    let xAxis;
    let yAxis;

    // Skaalaus tähdistä pikseleihin
    let xScale;
    let yScale;

    let updateData;
    let updateHeight;
    let updateWidth;

    function chart(selection){

        const hideTooltip = (event) => {

            tooltip
                .style("opacity", 0)
                .style("left", `-10000px`)
                .style("top",`-10000px`)  

        }


        const initVars = () => {

            xScale = d3
                .scaleBand()
                .domain(actData.map(d => xValue(d)))
                .range([0, width])
                .padding(0.2)

            /*
             * y-akselissa huomioidaan valmiiksi aineiston suurin skaalattu
             * yksittäisen tähtimäärän keräämien arviointien lukumäärä
             */
            yScale =  d3
                .scaleLinear()
                //.domain([0, d3.max(actData, yValue)])
                .domain([0,maxNumbOfStars])
                .range([height, 0])


            xAxis = d3
                .axisBottom(xScale)


            yAxis = d3
                .axisLeft(yScale)
                .tickSize(-width)

        }

        const render = () => {

            gYAxis
                .call(yAxis)

            gYAxisLbl
                .append('text')
                .text("Kappaletta")
                    //.attr('fill','navy')
                    //.attr('letter-spacing',5)
                    .attr('x',0)
                    

            gXAxis
                .call(xAxis)
                .append('text')
                .text("Tähtiä")
                    .attr('fill','navy')
                    //.attr('letter-spacing',5)
                    .attr('x',width / 2)
                    .attr('y',40)
                
            renderActiveBars();
            renderCompBars();

        }

        /* Aktiivisen genren arvosanojen jakauman tulostus */
        const renderActiveBars = () => {

            acBars = gActive
                .selectAll('rect')
                .data(actData)
                .enter()
                .append('rect')
                    .attr("class", "activeGenre")
                    .attr('x', d => {
                        let xTrans = xScale.bandwidth() * acBarsWidthScale / 2;

                        return xScale(xValue(d)) + xTrans
                    })
                    .attr('width', xScale.bandwidth() * acBarsWidthScale)
                    .attr('y', d => yScale(yValue(d)))
                    .attr('height', d => {
                        return height - yScale(yValue(d))
                    })
                .on('mouseover', (event, d) => renderTooltip(event, d))
                .on('mousemove', (event) => updateTooltip(event))
                .on('mouseout', (event) => hideTooltip(event))

        }

       /* Vertiltavana olevan genren arvosanojen jakauman tulostus */
       const renderCompBars = () => {

            compBars = gComp
                .selectAll('rect')
                .data(compData)
                .enter()
                .append('rect')
                    .attr("class", "compGenre")
                    .attr('x', d => xScale(xValue(d)))
                    .attr('width', xScale.bandwidth())
                    .attr('y', d => yScale(yValue(d)))
                    .attr('height', d => {
                        return height - yScale(yValue(d))
                })
                .on('mouseover', (event, d) => renderTooltip(event, d))
                .on('mousemove', (event) => updateTooltip(event))
                .on('mouseout', (event) => hideTooltip(event))
        }

        const renderTooltip = (event, d) => {

            tooltip
                .style("opacity", 1)
                .style("left", `${event.pageX}px`)
                .style("top",`${event.pageY-tooltipMargin.top}px`)

            d3
                .select("#singleGenreTooltipStartsActive")
                .html(actData.filter(a => a.stars === d.stars)[0].total)

            d3
                .select("#singleGenreTooltipStartsComp")
                .html(compData.filter(a => a.stars === d.stars)[0].total)

        }



        const updateTooltip = (event) => {

            tooltip
                .style("left", `${event.pageX}px`)
                .style("top",`${event.pageY-tooltipMargin.top}px`)  

        }

        /*
         *
         */
        selection.each(function(){

            xValue = d => d.stars
            yValue = d => d.total

            initVars();

            svg = d3
                .select(this)
                .append('svg')
                .attr("class", "starsDistribution")
                .attr("viewBox", [0,0, margin.left + width + margin.right, margin.top + height + margin.bottom])

            gElem = svg
                .append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`)

            gYAxis = gElem
                .append('g')
                    .attr("class", "yAxis");

            gXAxis = gElem
                .append('g')
                    .attr("class", "xAxis")
                    .attr('transform', `translate(${0},${height})`)

            gYAxisLbl = svg
                .append('g')
                .attr("class", "yAxisLbl")
                .attr('transform', `translate(${margin.left/2},${margin.top + (height/2)})`)

            gComp = gElem
                .append('g')

            gActive = gElem
                .append('g')

            tooltip = d3
                .select('#singleGenreTooltip')

            render()



            /*
             *
             */
            updateData = function() {

                // update the bars
                d3.selectAll(".compGenre")
                    .data(compData)
                    .transition().duration(1000)
                        .attr('x', d => xScale(xValue(d)))
                        .attr('width', xScale.bandwidth())
                        .attr('y', d => yScale(yValue(d)))
                        .attr('height', d => {
                            return height - yScale(yValue(d))
                        })


            }
            updateHeight = function() {}
            updateWidth = function() {}

        })
    }

    /* Vertailtavana olevan GENREN saamien arvostelujen jakauman asetus */
    chart.compData = function(val){

        if(!arguments.length) return compData;

        compData = val;

        if(typeof updateData === 'function')
            updateData();
   
        return chart

    }

    /* Aktiivisen GENREN saamien arvostelujen jakauman asetus */
    chart.actData = function(val){

        if(!arguments.length) return actData;

        actData = val;

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

    /*
     * 
     */
    chart.maxNumbOfStars = function(val){

        if(!arguments.length) return maxNumbOfStars;

        maxNumbOfStars = val;

        return chart

    }

    chart.width = function(val){

        if(!arguments.length) return width;

        width = val;

        if(typeof updateWidth === 'function')
            updateWidth();
   
        return chart

    }


    return chart

}