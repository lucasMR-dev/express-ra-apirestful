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
  usePermissions,
  Toolbar,
  SaveButton
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

const CategoryFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <TextInput label="Name" source="name" defaultValue="" />
    <TextInput label="Family" source="family" defaultValue="" />
  </Filter>
);

export const CategoryList = ({...props }) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { loaded, permissions } = usePermissions();
  return loaded ? (
    <List
      {...props}
      filters={<CategoryFilter />}
      bulkActionButtons={permissions === "admin" ? true : false}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.family.name}
          linkType={permissions.includes('manager') ? "edit" : "show"}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" label="Name" />
          <ChipField source="family.name" label="Family" />
          <EditButton />
          {permissions.includes('manager') || permissions.includes('supervisor') ? <DeleteButton /> : null}
        </Datagrid>
      )}
    </List>
  ) : null;
};

export const CategoryShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" label="Category" />
      <TextField source="family.name" label="Family" />
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
    <Edit {...props} actions={false}>
      <SimpleForm toolbar={<CustomToolbar />}>
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
