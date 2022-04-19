/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import {
  Show,
  List,
  Edit,
  Create,
  Datagrid,
  SearchInput,
  Filter,
  TextField,
  ReferenceArrayInput,
  CheckboxGroupInput,
  BooleanField,
  ImageField,
  EditButton,
  SimpleForm,
  TextInput,
  NumberField,
  NumberInput,
  ChipField,
  DeleteButton,
  ImageInput,
  BooleanInput,
  RichTextField,
  ArrayInput,
  SimpleFormIterator,
  SimpleList,
  SimpleShowLayout,
  SelectInput,
  useQuery,
  Loading,
  Error,
  TabbedForm,
  FormTab,
  ReferenceInput,
  Toolbar,
  SaveButton,
  usePermissions,
  ReferenceField
} from "react-admin";
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from "ra-input-rich-text";
import { useMediaQuery, Avatar, Box } from "@material-ui/core";
import Aside from '../Components/products/aside';

const customStyles = makeStyles(theme => ({
  image: {
    width: 200,
    height: 200,
  },
  inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
}));

const ProductFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="sku" alwaysOn />
    <TextInput label="Name" source="name" defaultValue="" />
    <TextInput label="Tags" source="tags" defaultValue="" />
  </Filter>
);

export const ProductList = ({ ...props }) => {
  const { loaded, permissions } = usePermissions();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return loaded ? (
    <List {...props} filters={<ProductFilter />}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.brand.name}
          rightAvatar={(record) => (
            <Avatar variant="rounded" src={record.pictures[0].small} />
          )}
          linkType={permissions === "admin" ? "edit" : "show"}
        />
      ) : (
        <React.Fragment>
          <Box display="flex">
            <Aside />
            <Datagrid expand={ProductShow} style={{ width: "auto" }}>
              <TextField source="name" />
              <RichTextField source="shortDetails" />
              <TextField source="stock" />
              <BooleanField source="sale" />
              <NumberField
                source="discount"
                options={{ style: "percent" }}
              />
              <NumberField
                source="salePrice"
                options={{ style: "currency", currency: "CPL" }}
              />
              <ChipField source="colorAvailable" />
              <ImageField source="pictures[0].small" label="Pictures" />
              <EditButton />
              {permissions.includes("manager") || permissions.includes("supervisor") ? <DeleteButton /> : null}
            </Datagrid>
          </Box>
        </React.Fragment>
      )}
    </List>
  ) : null;
};

export const ProductShow = ({ permissions, ...props }) => {
  const classes = customStyles();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Show {...props}>
      {isSmall ? (
        <SimpleShowLayout>
          <TextField source="sku" />
          <TextField source="name" />
          <ReferenceField source="brand" reference="brands" link="show">
            <TextField source="name" />
          </ReferenceField>
          <ImageField source="pictures[0].small" label="Pictures" />
          <ChipField source="colorAvailable" />
        </SimpleShowLayout>
      ) : (
        <SimpleShowLayout>
          <TextField source="sku" />
          <ReferenceField source="brand" reference="brands" link="show">
            <TextField source="name" />
          </ReferenceField>
          <div className={classes.inlineBlock}>
            <ImageField source="pictures[0].small" label="Pictures" />
            <ImageField source="pictures[0].big" label="" />
          </div>
          <RichTextField source="description" />
        </SimpleShowLayout>
      )}
    </Show>
  )
};

const CustomToolbar = (props) => {
  const { loaded, permissions } = usePermissions();
  return loaded ? (
    <>
      <Toolbar {...props}>
        <SaveButton />
        {permissions.includes('manager') ? <DeleteButton style={{ marginLeft: "auto" }} /> : null}
      </Toolbar>
    </>
  ) : null;
};

export const ProductEdit = ({ ...props }) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = customStyles();
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
      {isSmall ? (
        <SimpleForm>
          <TextInput disabled source="id" />
          <TextInput disabled source="sku" />
          <ReferenceInput
            source="brand"
            reference="brands"
            link="false"
          >
            <SelectInput optionText="name" optionValue="id" />
          </ReferenceInput>
          <CheckboxGroupInput
            source="categories"
            choices={data}
            optionValue="id"
          />
          <BooleanInput source="newPro" />
          <BooleanInput source="sale" />
          <NumberInput source="price" />
          <NumberInput source="salePrice" />
          <NumberInput source="discount" />
          <NumberInput source="stock" />
          <RichTextInput source="shortDetails" />
          <RichTextInput source="description" />
          <div className={classes.inlineBlock}>
            <ImageField source="pictures[0].small" label="First" alt="small" />
            <ImageField source="pictures[0].big" label="Last" alt="big" />
          </div>
          <ImageInput
            source="new_pictures"
            label="Pictures"
            accept="image/*"
            multiple={true}
          >
            <ImageField source="src" title="title" />
          </ImageInput>
          <ArrayInput source="tags">
            <SimpleFormIterator>
              <TextInput />
            </SimpleFormIterator>
          </ArrayInput>
          <TextInput source="colorAvailable" />
        </SimpleForm>
      ) : (
        <TabbedForm toolbar={<CustomToolbar />}>
          <FormTab label="Info">
            <TextInput disabled source="id" />
            <TextInput disabled source="sku" />
            <ReferenceInput
              source="brand"
              reference="brands"
              link="false"
            >
              <SelectInput optionText="name" optionValue="id" />
            </ReferenceInput>
            <CheckboxGroupInput
              source="categories"
              choices={data}
              optionValue="id"
            />
          </FormTab>
          <FormTab label="Inventory">
            <BooleanInput source="newPro" />
            <BooleanInput source="sale" />
            <NumberInput source="price" />
            <NumberInput source="salePrice" />
            <NumberInput source="discount" />
            <NumberInput source="stock" />
          </FormTab>
          <FormTab label="Text">
            <RichTextInput source="shortDetails" />
            <RichTextInput source="description" />
          </FormTab>
          <FormTab label="Images" path="/product_pictures">
            <div className="row">
              <ImageField source="pictures[0].small" label="First" alt="small" />
              <ImageField source="pictures[0].big" label="Last" alt="big" />
            </div>
            <ImageInput
              source="new_pictures"
              label="Pictures"
              accept="image/*"
              multiple={true}
            >
              <ImageField source="src" title="title" />
            </ImageInput>
          </FormTab>
          <FormTab label="Others">
            <ArrayInput source="tags">
              <SimpleFormIterator>
                <TextInput />
              </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="colorAvailable" />
          </FormTab>
        </TabbedForm>
      )}
    </Edit>
  );
};

export const ProductCreate = ({ permissions, ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="sku" required />
      <ReferenceArrayInput label="Brands" source="brand" reference="brands">
        <SelectInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Categories"
        source="categories"
        reference="categories"
      >
        <CheckboxGroupInput optionText="name" optionValue="id" />
      </ReferenceArrayInput>
      <BooleanInput source="newPro" defaultValue={false} />
      <BooleanInput source="sale" defaultValue={false} />
      <NumberInput source="price" />
      <NumberInput source="salePrice" />
      <NumberInput source="discount" />
      <NumberInput source="stock" />
      <RichTextInput source="shortDetails" />
      <RichTextInput source="description" />
      <ImageInput
        source="pictures"
        label="Pictures"
        accept="image/*"
        multiple={true}
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      <ArrayInput source="tags">
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="colorAvailable" />
    </SimpleForm>
  </Create>
);
