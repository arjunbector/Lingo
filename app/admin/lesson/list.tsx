import { Datagrid, List, NumberField, ReferenceField, TextField } from "react-admin";
import React from "react";

const LessonList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="unitId" reference="units" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};

export default LessonList;
