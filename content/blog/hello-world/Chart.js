import React from 'react'
import * as d3 from "d3";
import {scaleLinear} from 'd3-scale'
import {max} from 'd3-array'
class Chart extends React.Component {
    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        const node = this.node
        const dataMax = max(this.props.data)
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, 500])

        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect')

        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove()

        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', '#fe9922')
            .attr('x', (d,i) => i * 25)
            .attr('y', d => 500 - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 25)
    }
    render() {
        return (<svg ref={node => this.node = node} width={500} height={500}></svg>)
    }

}
export default Chart