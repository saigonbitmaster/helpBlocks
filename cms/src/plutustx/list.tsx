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
  useGetOne,
  BooleanField,
} from "react-admin";
import Button from "@mui/material/Button";

//nami is sender, typhon is receiver in this example
const ListScreen = () => {
  const dataProvider = useDataProvider();
  const UnlockButton = () => {
    const record = useRecordContext();

    const handleClick = () => {
      dataProvider
        .customMethod(
          "queues/unlock",
          {
            data: {
              unlockType: "paid",
              scriptTxHash: record.lockedTxHash,
              receiverAddress:
                "addr_test1qpj6p90r4757zjgc80kkpamltm65qfl9r9kt22makl6ess76l0jqfmvf975syyp36903hacvjnddmhm9dxwsz0gs9g6qxklmrs",
            },
          },
          "POST"
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    return (
      <Button variant="text" disabled={record.isUnlocked} onClick={handleClick}>
        Pay to receiver
      </Button>
    );
  };

  const ReturnButton = () => {
    const record = useRecordContext();

    const handleClick = () => {
      dataProvider
        .customMethod(
          "queues/unlock",
          {
            data: {
              unlockType: "return",
              scriptTxHash: record.lockedTxHash,
              receiverAddress:
                "addr_test1qpdhpjfl4j7qpl3vwfukz35gnsrp9yqg8v3k3h9kcajgu0f687lk7clmty8y95470l3qc7ladppc3h27mqxag8aexltsr04r3p",
            },
          },
          "POST"
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    return (
      <Button variant="text" disabled={record.isUnlocked} onClick={handleClick}>
        Return to sender
      </Button>
    );
  };

  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate
      resource="plutustxs"
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="lockedTxHash" />
        <DateField source="lockDate" showTime />
        <TextField source="lockMessage" />
        <TextField source="unlockedTxHash" />
        <TextField source="unlockType" />
        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
        <UnlockButton />
        <ReturnButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
