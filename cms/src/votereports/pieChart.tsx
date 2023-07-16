import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useDataProvider } from "react-admin";
import { PieChart, Pie, Cell } from "recharts";
import Typography from "@mui/material/Typography";

const PaymentChart = () => {
  const [data2, setData] = React.useState({
    _id: "voteReports",
    totalCases: 250,
    rejectedCases: 150,
    rejectedUnlockCases: 50,
    totalConfirmedCases: 200,
  });
 /*  const dataProvider = useDataProvider();
  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/voteReports",
        { filter: { queryType: "emp" } },
        "GET"
      )
      .then((result) => setData(result.data))
      .catch((error) => console.error(error));
  }, []); */

  const data1 = [
    { name: "Rejected cases", value: data2.rejectedCases },
    {
      name: "Confirmed cases",
      value: data2.totalCases - data2.rejectedCases,
    },
  ];
  const data = [
    { name: "Rejected to unlock cases", value: data2.rejectedUnlockCases },
    {
      name: "Confirmed to unlock cases",
      value: data2.totalConfirmedCases - data2.rejectedUnlockCases,
    },
  ];
  const COLORS = ["#FF8042", "#0088FE" ];
  const COLORS1 = ["#FFBB28","#00C49F" ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader
        title="Vote results"
        titleTypographyProps={{ variant: "subtitle1" }}
        subheader={
          <Typography variant="subtitle2" gutterBottom>
            {`Confirmed cases: ${data2.totalCases}, Rejected cases: ${data2.rejectedCases}, Confirmed to unlock cases: ${data2.totalConfirmedCases}, Rejected to unlock cases: ${data2.rejectedUnlockCases}`}
          </Typography>
        }
      />
      <CardContent>
        <div
          style={{
            width: "100%",
            height: 275,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data1}
                cx="25%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {data1.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Pie
                data={data}
                cx="75%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS1[index % COLORS1.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentChart;
