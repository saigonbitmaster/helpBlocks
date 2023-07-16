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
} from "react-admin";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

const ListScreen = () => {
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
        <BooleanField source="isApproved" label="Is confirmed" />
        <BooleanField source="isDelivered" />
        <NumberField source="deliveredAmount" />
        <DateField source="deliveredDate" showTime />
        <DateField source="createdAt" showTime />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
