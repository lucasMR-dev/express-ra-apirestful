import * as React from "react";
import { Card, CardContent } from "@material-ui/core/";
import { Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <React.Fragment>
      <Card>
        <CardContent style={{ textAlign: "center" }}>
          <img src="/logo512.png" height="250" width="250" alt=""></img>
          <Typography variant="h5" color="primary">
            404
          </Typography>
          <Typography variant="body1" color="primary">
            Page not found
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
export default NotFound;
