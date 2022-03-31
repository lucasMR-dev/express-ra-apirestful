import * as React from "react";
import {
  Show,
  List,
  Edit,
  Create,
  Filter,
  SearchInput,
  SimpleList,
  ReferenceArrayInput,
  TextField,
  SelectInput,
  ImageField,
  EditButton,
  SimpleForm,
  TextInput,
  DeleteButton,
  BooleanInput,
  ImageInput,
  CheckboxGroupInput,
  SimpleShowLayout,
  useQuery,
  Loading,
  Error,
  useListContext,
  useTranslate,
  usePermissions,
  Toolbar,
  SaveButton
} from "react-admin";
import {
  useMediaQuery,
  Avatar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { stringify } from "query-string";
import ProductIcon from "@material-ui/icons/Collections";

const partnerStatus_choices = [
  { id: "Aproved", name: "Aproved" },
  { id: "Pending", name: "Pending" },
  { id: "Refused", name: "Refused" },
];

const useStyles = makeStyles({
  root: {
    marginTop: "1em",
  },
  media: {
    height: 200,
  },
  title: {
    paddingBottom: "0.5em",
  },
  actionSpacer: {
    display: "flex",
    justifyContent: "space-around",
  },
  icon: { paddingRight: "0.5em" },
  link: {
    display: "inline-flex",
    alignItems: "center",
  },
});

export const LinkToRelatedProducts = ({ record }) => {
  const translate = useTranslate();
  const classes = useStyles();
  return record ? (
    <Button
      size="small"
      color="primary"
      component={Link}
      to={{
        pathname: "/products",
        search: stringify({
          filter: JSON.stringify({ brand: record.name }),
        }),
      }}
      className={classes.link}
    >
      <ProductIcon className={classes.icon} />
      {translate("resources.products.name", { smart_count: 2})}
    </Button>
  ) : null;
};

export const BrandGrid = ({ ...props }) => {
  const { loaded, permissions } = usePermissions();
  const classes = useStyles(props);
  const { data, ids } = useListContext();
  return ids ? (
    loaded ? (
      <Grid container spacing={2} className={classes.root}>
        {ids.map((id) => (
          <Grid key={id} md={6} item>
            <Card>
              <CardMedia image={data[id].logo} className={classes.media} />
              <CardContent className={classes.title}></CardContent>
              <CardActions classes={{ spacing: classes.actionSpacer }}>
                <LinkToRelatedProducts record={data[id]} />
                <EditButton basePath="/brands" record={data[id]} />
                {permissions.includes('manager') || permissions.includes('supervisor') ? <DeleteButton /> : null}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : null
  ) : null;
};

const BrandFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <TextInput source="name" defaultValue="" />
    <TextInput source="categories" defaultValue="" />
  </Filter>
);

export const BrandList = ({ permissions, ...props }) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props} filters={<BrandFilter />} pagination={false}>
      {isSmall ? (
        <SimpleList
          leftAvatar={(record) => <Avatar src={record.logo} />}
          primaryText={(record) => record.name}
          secondaryText={(record) => record.partnerStatus}
          linkType={permissions.includes('manager') ? "edit" : "show"}
        />
      ) : (
        <BrandGrid />
      )}
    </List>
  );
};

export const BrandShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="partnerStatus" />
      <ImageField source="logo" />
    </SimpleShowLayout>
  </Show>
);

const CustomToolbar = (props) => {
  const { loaded, permissions } = usePermissions();
  return loaded ? (
    <>
      <Toolbar {...props}>
        <SaveButton />
        {permissions.includes('manager') ? <DeleteButton style={{marginLeft: "auto"}} /> : null}
      </Toolbar>
    </>
  ) : null;
};


export const BrandEdit = (props) => {
  const payload = {
    filter: {},
    pagination: { page: 1, perPage: 10 },
    sort: { field: "id", order: "ASC" },
  };
  const { data, loading, error } = useQuery({
    type: "getList",
    resource: "categories",
    payload: payload,
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <SelectInput source="partnerStatus" choices={partnerStatus_choices} />
        <BooleanInput source="active" />
        <ImageField source="logo" title="title" />
        <ImageInput source="newlogo" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <CheckboxGroupInput
          source="categories"
          choices={data}
          optionValue="id"
        />
      </SimpleForm>
    </Edit>
  );
};

export const BrandCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" required />
      <SelectInput
        source="partnerStatus"
        choices={partnerStatus_choices}
        defaultValue={partnerStatus_choices[0].name}
      />
      <BooleanInput source="active" defaultValue={false} />
      <ReferenceArrayInput
        source="categories"
        reference="categories"
      >
        <CheckboxGroupInput optionText="name" optionValue="id" />
      </ReferenceArrayInput>
      <ImageInput source="logo" accept="image/*" required>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
