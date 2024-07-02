import {
  BooleanInput,
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required
} from "react-admin";

const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Is Correct" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput source="imageSrc"label="Image Url" />
        <TextInput source="audioSrc"label="Audio Url" />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeOptionCreate;
