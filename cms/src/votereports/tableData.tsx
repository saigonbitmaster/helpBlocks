import * as React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { useDataProvider, useTranslate } from "react-admin";
import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import Table from "../components/table";
import { data as tableData } from "./sampleData";

const DataTable = (props) => {
  const translate = useTranslate();

  /* 
  const [postedJobs, setDataTables] = React.useState([]);

  const dataProvider = useDataProvider();
  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/getmonthlyplutustxsreport",
        { filter: { queryType: "emp" } },
        "GET"
      )
      .then((result) => setDataTables(result.data.reverse()))
      .catch((error) => console.error(error));
  }, []);

  */
  const headers = [
    { key: "_id", name: "Month" },
    { key: "totalCaseVotes", name: "Total case votes" },
    { key: "caseUpVotes", name: "Up votes" },
    { key: "totalUnlockUpVotes", name: "Unlock votes" },
    { key: "unlockUpVotes", name: "Unlock up votes" },
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
      title={translate("pos.dashboard.voteData")}
      subtitle={`Last 12 months vote data`}
    >
      <Table headers={headers} data={tableData}></Table>
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

export default DataTable;
