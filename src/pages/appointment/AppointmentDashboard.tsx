import { useEffect } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Box } from "@material-ui/core";
import gtm from "../../lib/gtm";
import { getThreads } from "../../slices/chat";
import { useDispatch } from "../../store";

const AppointmentDashboard: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    dispatch(getThreads());
  }, []);

  return (
    <>
      <Helmet>
        <title>Appointment Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          height: "100%",
        }}
      >
        <p>Build the appointment dashboard here</p>
      </Box>
    </>
  );
};

export default AppointmentDashboard;
