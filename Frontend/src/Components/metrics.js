import * as React from "react";
import { useQuery, Loading, Error } from "react-admin";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

const LinkToRelatedProducts = ({ record }) => {
  return record ? (
    <Button
      size="small"
      color="inherit"
      component={Link}
      to={{
        pathname: "/products",
        search: stringify({
          filter: JSON.stringify({ name: record }),
        }),
      }}
    >
      {record}
    </Button>
  ) : null;
};

const LinkToRelatedCategory = ({ record }) => {
  return record ? (
    <Button
      size="small"
      color="inherit"
      component={Link}
      to={{
        pathname: "/categories",
        search: stringify({
          filter: JSON.stringify({ name: record }),
        }),
      }}
    >
      {record}
    </Button>
  ) : null;
};

const LinkToRelatedBrand = ({ record }) => {
  return record ? (
    <Button
      size="small"
      color="inherit"
      component={Link}
      to={{
        pathname: "/brands",
        search: stringify({
          filter: JSON.stringify({ name: record }),
        }),
      }}
    >
      {record}
    </Button>
  ) : null;
};

const DashboardMetrics = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const payload = {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "count", order: "DESC" },
  };
  const { data, loading, error } = useQuery({
    type: "getCustomList",
    resource: "metrics",
    payload: payload,
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  // Init Maps
  const brands = data.topBrands;
  const categories = data.topCategories;
  const products = data.topProduct;

  return (
    <React.Fragment>
      {isSmall ? (
        <Grid container direction="column" style={{ marginTop: "20px" }}>
          <Card>
            <CardContent>
              <Grid container direction="column">
                <Grid item xs={12} md={12} lg={12}>
                  <Typography color="inherit" variant="subtitle1" align="center">
                    Top Brands
                  </Typography>
                  {brands.map((brand) => (
                    <Typography color="inherit" variant="subtitle2" key={brand.id} align="left">
                      {brand.name}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Grid container direction="column">
                <Grid item xs={12} md={12} lg={12}>
                  <Typography color="inherit" variant="subtitle1" align="center">
                    Top Categories
                  </Typography>
                  {categories.map((category) => (
                    <Typography color="inherit" variant="subtitle2" key={category.id} align="left">
                      {category.name}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Grid container direction="column">
                <Grid item xs={12} md={12} lg={12}>
                  <Typography color="inherit" variant="subtitle1" align="center">
                    Top Products
                  </Typography>
                  {products.map((product) => (
                    <Typography color="inherit" variant="subtitle2" key={product.id} align="left">
                      {product.name}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <Grid container direction="row" style={{ marginBottom: "20px", flexWrap: "nowrap" }}>
          <Card
            className="metrics-card"
            style={{ color: "white", backgroundColor: "darkblue" }}
          >
            <CardContent style={{ width: "100%" }}>
              <Grid container direction="row">
                <Grid container>
                  <Grid item xs={8} md={8} lg={8}>
                    <Typography
                      color="inherit"
                      variant="subtitle1"
                      align="center"
                    >
                      Top Brands
                    </Typography>
                    {brands.map((brand) => (
                      <Typography
                        color="inherit"
                        variant="subtitle2"
                        align="left"
                        key={brand.id}
                      >
                        <LinkToRelatedBrand record={brand.name} />
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <img width="80px" height="80px" src="/logo192.png" alt="" />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card
            className="metrics-card"
            style={{ color: "white", backgroundColor: "darkgreen" }}
          >
            <CardContent>
              <Grid container direction="row">
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      color="inherit"
                      variant="subtitle1"
                      align="center"
                    >
                      Top Categories
                    </Typography>
                    {categories.map((category) => (
                      <Typography
                        color="inherit"
                        variant="subtitle2"
                        align="left"
                        key={category.id}
                      >
                        <LinkToRelatedCategory record={category.name} />
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={4}>
                    <img width="80px" height="80px" src="/react-icon-black.png" alt="" />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card
            className="metrics-card"
            style={{ color: "white", backgroundColor: "darkred" }}
          >
            <CardContent>
              <Grid container direction="row">
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      color="inherit"
                      variant="subtitle1"
                      align="center"
                    >
                      Top Products
                    </Typography>
                    {products.map((product) => (
                      <Typography
                        color="inherit"
                        variant="subtitle2"
                        key={product.id}
                        align="left"
                      >
                        <LinkToRelatedProducts record={product.name.slice(0, 12)} />
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={4}>
                    <img width="80px" height="80px" src="/react-icon-red.png" alt="" />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default DashboardMetrics;
