import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import DashboardMetrics from "./metrics";
import { useMediaQuery } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const chart1 = [
  { name: "A", uv: 400, pv: 2400, amt: 2400 },
  { name: "B", uv: 700, pv: 3600, amt: 2800 },
  { name: "C", uv: 900, pv: 4000, amt: 3000 },
  { name: "D", uv: 650, pv: 3500, amt: 3700 },
];
const chart2 = [
  { name: "Enero", orders: 800, completed: 700, returned: 100 },
  { name: "Febrero", orders: 900, completed: 780, returned: 120 },
  { name: "Marzo", orders: 1370, completed: 1000, returned: 370 },
  { name: "Abril", orders: 1400, completed: 1400, returned: 0 },
];

const chart3 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <React.Fragment>
      <Title title="Admin Panel" />
      {isSmall ? (
        <Card>
          <CardContent>
            <ResponsiveContainer width="90%" aspect={2}>
              <LineChart
                width={600}
                height={300}
                data={chart1}
                margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="uv" stroke="#6D27E3" />
                <Line type="monotone" dataKey="pv" stroke="#FFAD2B" />
                <Line type="monotone" dataKey="amt" stroke="#F77F40" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Legend
                  align="left"
                  verticalAlign="middle"
                  layout="vertical"
                  iconSize={20}
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="90%" aspect={2}>
              <BarChart
                width={600}
                height={300}
                data={chart2}
                margin={{ top: 30, bottom: 30 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" />
                <Bar dataKey="completed" fill="#20D60D" />
                <Bar dataKey="returned" fill="#B80000" />
              </BarChart>
            </ResponsiveContainer>
            <Divider light />
            <DashboardMetrics />
          </CardContent>
        </Card>
      ) : (
        <div className="dashboard-wrapper">
          <Card>
            <div className="top-line">
              <Grid container direction="row">
                <Grid item xs={6} md={6} lg={6}>
                  <AreaChart
                    width={600}
                    height={300}
                    data={chart3}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 50,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                    <Area
                      type="monotone"
                      dataKey="amt"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                  </AreaChart>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <DashboardMetrics />
                </Grid>
              </Grid>
            </div>
            <Divider light />
            <CardContent>
              <div className="middle-line">
                <Grid container>
                  <Grid item xs={6} md={6} lg={6}>
                    <BarChart
                      width={730}
                      height={250}
                      data={chart2}
                      margin={{ top: 30 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="#8884d8" />
                      <Bar dataKey="completed" fill="#20D60D" />
                      <Bar dataKey="returned" fill="#B80000" />
                    </BarChart>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <LineChart
                      width={600}
                      height={300}
                      data={chart1}
                      margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                    >
                      <Line type="monotone" dataKey="uv" stroke="#6D27E3" />
                      <Line type="monotone" dataKey="pv" stroke="#FFAD2B" />
                      <Line type="monotone" dataKey="amt" stroke="#F77F40" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <Legend
                        align="left"
                        verticalAlign="middle"
                        layout="vertical"
                        iconSize={20}
                      />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
            <Divider light />
            <div className="bottom-line"></div>
          </Card>
        </div>
      )}
    </React.Fragment>
  );

}

export default Dashboard;
