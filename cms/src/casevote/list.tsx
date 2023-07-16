import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  ReferenceField,
  useRecordContext,
  ReferenceOneField,
  useDataProvider,
  FunctionField,
  NumberField,
  BooleanField,
  RichTextField,
  useRefresh,
  Labeled,
  useUpdate,
} from "react-admin";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const ListScreen = (props) => {
  const CaseVoteButton = (props) => {
    const record = useRecordContext();
    const refresh = useRefresh();
    const dataProvider = useDataProvider();
    const [vote, setVote] = React.useState({ vote: false, useId: null });

    React.useEffect(() => {
      dataProvider
        .customMethod(
          "customapis/vote",
          { filter: { queryType: "case", caseId: record._id } },
          "GET"
        )
        .then((result) => setVote(result.data))
        .catch((error) => console.error(error));
    }, []);

    const voteBody = { caseId: record._id, vote: !vote.vote };

    const handleClick = () => {
      dataProvider
        .customMethod("customapis/casevote", { data: voteBody }, "POST")
        .then((result) => setVote({ ...vote, vote: result.data.vote }))
        .catch((error) => console.error(error));
    };

    React.useEffect(() => {
      refresh();
    }, [vote]);

    return (
      <Labeled>
        <Button
        disabled = {record.isApproved }
          variant="text"
          onClick={handleClick}
          endIcon={
            vote?.vote ? (
              <ThumbDownOffAltOutlinedIcon />
            ) : (
              <ThumbUpOffAltOutlinedIcon />
            )
          }
        >
          {vote?.vote ? "Vote down" : "Vote up"}
        </Button>
      </Labeled>
    );
  };

  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "DESC" }}
      resource="cases"
      hasCreate={false}
      filter={{ queryType: "developer" }}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="address" />
        <NumberField source="requestedAmount" />
        <RichTextField source="shortDescription" />
        <ReferenceField source="postedUserId" reference="users">
          <TextField source="fullName" />
        </ReferenceField>
        <FunctionField
          label="Is confirmed"
          render={(record) => (
            <>
           { record.isApproved &&  <Typography variant="subtitle1" gutterBottom color="secondary.confirmed" >
            Confirmed
          </Typography>}
           { record.isApproved === undefined &&  <Typography variant="subtitle1" color="secondary.confirming">
            Confirming...
          </Typography>}
          { record.isApproved === false &&   <Typography variant="subtitle1" gutterBottom color="secondary.rejected">
            Rejected
          </Typography>}

          </>
          )}
        />
       
        <FunctionField
          label="No. of votes"
          render={(record) => (
            <>
              <Chip
                icon={<ThumbDownAltIcon />}
                label={
                  record.caseVotes.filter((item) => item.vote === false).length
                }
                color="warning"
              />
              <Chip
                color="success"
                icon={<ThumbUpAltIcon />}
                label={
                  record.caseVotes.filter((item) => item.vote === true).length
                }
              />
            </>
          )}
        />

        <CaseVoteButton label="Vote this case" />
        <DateField source="createdAt" showTime />
      </Datagrid>
    </List>
  );
};

export default ListScreen;