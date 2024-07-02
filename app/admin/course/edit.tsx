import {
    Create,
    Edit,
    SimpleForm,
    TextInput,
    required
} from "react-admin";

const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Title"/>
        <TextInput source="title" validate={[required()]} label="Title"/>
        <TextInput source="imageSrc" validate={[required()]} label="Image"/>
      </SimpleForm>
    </Edit>
  );
};

export default CourseEdit;
