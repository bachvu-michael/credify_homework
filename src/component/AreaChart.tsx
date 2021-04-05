import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend } from 'recharts';



export default class AreaChartComponent extends PureComponent<{
    data: any
}>{
    render() {
        // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxsssx")
        // console.log(this.props.data,"xxxxx")
        // console.log("xxxxxxxxxxxxxxxxxxxxxxxx")
        return (
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={this.props.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fff" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7A22A0" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#A72186" stopOpacity={0} />
                        </linearGradient>

                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="2 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="user" stroke="#C4C4C4" fillOpacity={1} fill="url(#colorPv)" />
                    <Area type="monotone" dataKey="profit" stroke="#7A22A0" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
