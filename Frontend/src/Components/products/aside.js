/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import inflection from "inflection";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CategoryIcon from '@material-ui/icons/Category';
import BusinessIcon from '@material-ui/icons/Business';
import {
  FilterList,
  FilterListItem,
  useGetList,
  useTranslate
} from "react-admin";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: "15em",
      marginRight: "1em",
      overflow: "initial",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ListBrands = () => {
  let list;
  const { data, ids } = useGetList("brands", { page: 1, perPage: 100 }, { field: "name", order: "ASC" }, {});
  list = { data, ids }
  return list
}

const ListCategories = () => {
  let list;
  const { data, ids } = useGetList("categories", { page: 1, perPage: 100 }, { field: "name", order: "ASC" }, {});
  list = { data, ids }
  return list
}

const Aside = () => {
  const brands = ListBrands();
  const categories = ListCategories();
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <Card className={classes.root}>
      <CardContent>
        <FilterList
          label="Categories"
          icon={<CategoryIcon />}
        >
          {categories.ids &&
            categories.data &&
            categories.ids.map((id) => (
              <FilterListItem
                label={translate(`resources.categories.names.${categories.data[id].name}`)}
                key={categories.data[id].id}
                value={{ categories: categories.data[id].name }}
              />
            ))}
        </FilterList>

        <FilterList
          label="Brands"
          icon={<BusinessIcon />}
        >
          {brands.ids &&
            brands.data &&
            brands.ids.map((id) => (
              <FilterListItem
                label={inflection.humanize(brands.data[id].name)}
                key={brands.data[id].id}
                value={{ brand: brands.data[id].name }}
              />
            ))}
        </FilterList>

      </CardContent>
    </Card>
  );
};

export default Aside;
