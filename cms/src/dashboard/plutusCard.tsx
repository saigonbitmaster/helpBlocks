import * as React from "react";
import DollarIcon from "@mui/icons-material/AttachMoney";
import CardWithIcon from "./cardWithIcon";

interface Props {
  numberOfJobs: number;
  totalAmount: number;
}

const PaidByPlutus = (props: Props) => {
  const { numberOfJobs = 0, totalAmount = 0 } = props;
  return (
    <CardWithIcon
      to="/cases"
      icon={DollarIcon}
      title="Transaction amounts ($Ada)"
      subtitle={`${numberOfJobs} Locked amounts, ${totalAmount} Unlocked amounts`}
    />
  );
};

export default PaidByPlutus;
