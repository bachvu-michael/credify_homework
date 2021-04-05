import React, { PureComponent, Component } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';


const COLORS = ['#D63595', '#EE82C3', '#FFBAE3', '#F8DDED'];

export default class ShapePieChart extends Component<{
    data: any
}> {
    // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si';

    state = {
        activeIndex: 0,
    };
    renderActiveShape = (props: any) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="pie-chart-middle">
                    {payload.value} %
                </text>
                <text x={cx} y={cy} dy={25} textAnchor="middle" fill="#333" className="pie-chart-middle-des">
                    total conversions
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                {/* <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                /> */}
            </g>

        )
        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };
    onPieEnter = (_: any, index: any) => {
        this.setState({
            activeIndex: index,
        });
    };
    render() {

        return (
            <ResponsiveContainer width="100%" height={200}>
                <PieChart >
                    <Pie
                        // startAngle={-270}
                        startAngle={90}
                        endAngle={-270}
                        activeIndex={this.state.activeIndex}
                        activeShape={this.renderActiveShape}
                        data={this.props.data}
                        cx="50%"
                        cy={90}
                        innerRadius={70}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={this.onPieEnter}
                    >
                        {this.props.data.map((entry: any, index: any) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

