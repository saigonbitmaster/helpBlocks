import * as React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";

import { useGetList, useTranslate, TextField, DateField } from "react-admin";

import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import LinkBidField from "../components/linkBidsField";
import LinkVoteField from "../components/linkVoteField";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
const text = {
  color: "orange",
};

const Spacer = () => <span style={{ width: "3em" }} />;

const PostedJob = (props) => {
  interface Props {
    postedJobs: number;
    bids: number;
  }
  const { postedJobs = 0, bids = 0 } = props;

  const translate = useTranslate();
  const { data: postedCases, total: totalCases } = useGetList<any>("cases", {
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 8 },
  });

  const { total: totalApprovedCases } = useGetList<any>("cases", {
    sort: { field: "createdAt", order: "DESC" },
    filter: { isApproved: true },
    pagination: { page: 1, perPage: 8 },
  });

  const display = "block";

  return (
    <CardWithIcon
      to={{
        pathname: "/cases",
        search: stringify({
          filter: JSON.stringify({ status: "active" }),
        }),
      }}
      icon={DynamicFeedOutlinedIcon}
      title="Posted cases"
      subtitle={`${totalCases} Posted cases, ${totalApprovedCases} Confirmed cases`}
    >
      <List sx={{ display }}>
        {postedCases?.map((record: any) => (
          <>
            <ListItem key={record.id} alignItems="center">
              <ListItemAvatar>
                <AppRegistrationOutlinedIcon></AppRegistrationOutlinedIcon>
              </ListItemAvatar>
              <TextField record={record} source="name"></TextField>
              <Spacer />
              <DateField record={record} source="createdAt"></DateField>
            </ListItem>

            <ListItem
              key={record.id + 1}
              button
              component={Link}
              to={`/casevote/?filter=${JSON.stringify({ _id: record.id })}`}
              alignItems="flex-start"
            >
              <ListItemText primaryTypographyProps={{ style: text }}>
                Current votes
              </ListItemText>
              <LinkVoteField record={record} />
            </ListItem>
          </>
        ))}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/cases"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.seeAllCases")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default PostedJob;
