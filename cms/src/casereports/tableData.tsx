import * as React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";

import { useTranslate, useDataProvider } from "react-admin";

import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import Table from "../components/table";
import { postedCases } from "./sampleData";

const PostedJob = (props) => {
  /* 
  const dataProvider = useDataProvider();
  const [postedCases, setPostedCases] = React.useState([]);
  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/getmonthlycasereport",
        { filter: { queryType: "emp" } },
        "GET"
      )
      .then((result) => setPostedCases(result.data.reverse()))
      .catch((error) => console.error(error));
  }, []); 
   */

  const translate = useTranslate();
  const headers = [
    { key: "_id", name: "Month" },
    { key: "confirmedCases", name: "Confirmed cases" },
    { key: "postedCases", name: "Posted cases" },
    { key: "sumDeliveredAmounts", name: "Sum of delivered amounts ($Ada)" },
    { key: "completeCases", name: "Complete cases" },
    { key: "confirmedToUnlock", name: "Confirmed to unlock fund" },
  ];
  return (
    <CardWithIcon
      to={{
        pathname: "/cases",
        search: stringify({
          filter: JSON.stringify({ status: "active" }),
        }),
      }}
      icon={DynamicFeedOutlinedIcon}
      title={translate("pos.dashboard.postedCases")}
      subtitle={`Last 12 months posted cases`}
    >
      <Table headers={headers} data={postedCases}></Table>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/cases"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.allPostedCases")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default PostedJob;
