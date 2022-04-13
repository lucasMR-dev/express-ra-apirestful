import React from "react";
import { Title, usePermissions, useTranslate } from "react-admin";
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
  ResponsiveContainer
} from "recharts";
import { useMediaQuery, Card, CardContent, Divider, Grid } from "@material-ui/core";
import DashboardMetrics from "./metrics";
import { RrhhDashboard } from "./dashboard/rrhh";
import { WarehouseDashboard } from "./dashboard/warehouse";
import { SystemDashboard } from "./dashboard/systemMonitor";

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


const Default = () => {
  return (
    <div className="dashboard-wrapper">
      <Card>
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
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const CustomDashboard = () => {
  const { loaded, permissions } = usePermissions();
  return loaded ? (
    typeof permissions == "object" ? (
      permissions.includes('Warehouse') && permissions.includes('manager') ? (
        <WarehouseDashboard />
      ) : permissions.includes('RRHH') && permissions.includes('manager') ? (
        <RrhhDashboard />
      ) : <Default />
    ) : <SystemDashboard />
  ) : null
}

const Dashboard = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const translate = useTranslate();
  return (
    <React.Fragment>
      <Title title={translate("titles.Admin Panel")} />
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
      ) : <CustomDashboard />}
    </React.Fragment>
  )
}

export default Dashboard;
