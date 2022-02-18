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
  EditButton,
  ReferenceArrayInput,
  SimpleForm,
  SimpleList,
  SelectInput,
  TextInput,
  ChipField,
  DeleteButton,
  SimpleShowLayout,
  useQuery,
  Loading,
  Error,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

const CategoryFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <TextInput label="Name" source="name" defaultValue="" />
    <TextInput label="Family" source="family" defaultValue="" />
  </Filter>
);

export const CategoryList = ({ permissions, ...props }) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      {...props}
      filters={<CategoryFilter />}
      bulkActionButtons={permissions === "admin" ? true : false}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.family.name}
          linkType={permissions === "admin" ? "edit" : "show"}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" label="Name" />
          <ChipField source="family.name" label="Family" />
          {permissions === "admin" ? <EditButton /> : null}
          {permissions === "admin" ? <DeleteButton /> : null}
        </Datagrid>
      )}
    </List>
  );
};

export const CategoryShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" label="Category" />
      <TextField source="family.name" label="Family" />
    </SimpleShowLayout>
  </Show>
);

export const CategoryEdit = (props) => {
  const payload = {
    filter: {},
    pagination: { page: 1, perPage: 10 },
    sort: { field: "id", order: "ASC" },
  };
  const { data, loading, error } = useQuery({
    type: "getList",
    resource: "families",
    payload: payload,
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <SelectInput
          source="family.id"
          label="Family"
          optionValue="id"
          choices={data}
        />
      </SimpleForm>
    </Edit>
  );
};

export const CategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceArrayInput label="Family" source="family" reference="families">
        <SelectInput optionText="name" optionValue="id" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
