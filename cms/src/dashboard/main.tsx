import React from "react";
import styled from "styled-components";
import MapWithMarkerInfo from "../components/customMarker";
import DefaultMarker from "../components/defaultMarker";
import PaidByPlutus from "./dataTable";
import Box from "@mui/material/Box";

const DefaultMarkerMap = () => (
  <MapWrapper>
    <DefaultMarker />
  </MapWrapper>
);

const CustomMarkerMap = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
    }}
  >
    <MapWrapper>
      <MapWithMarkerInfo />
    </MapWrapper>
    <ListWrapper>
      <PaidByPlutus numberOfJobs={0} totalAmount={0}></PaidByPlutus>
    </ListWrapper>
  </Box>
);

const MapWrapper = styled.section`
  width: 64vw;
  height: 92vh;
`;

const ListWrapper = styled.section`
  width: 22vw;
  height: 92vh;
`;

export { CustomMarkerMap, DefaultMarkerMap };
