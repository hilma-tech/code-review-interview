import { FormProvider, FormSubmitButton, FormTextInput } from "@hilma/forms";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { HEBREW } from "../hebrew";
import { FormRoomField } from "../components/FormRoomField";

const validationSchema = yup.object({
  name: yup.string().required(HEBREW.requiredField),
  departmentCode: yup.string(),
  rooms: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(HEBREW.requiredField),
        roomCode: yup.string(),
      }),
    )
    .required(),
});

export type DepartmentPageFormValues = yup.InferType<typeof validationSchema>;

const INITIAL_VALUES: DepartmentPageFormValues = {
  name: "",
  rooms: [{ name: "" }],
};

async function postCreateDepartment(values: DepartmentPageFormValues) {
  await axios.post("/api/department", values);
}

export function DepartmentPage() {
  const createDepartmentMutation = useMutation({
    mutationFn: postCreateDepartment,
  });

  return (
    <Box sx={{ p: "1rem" }}>
      <FormProvider
        onSubmit={(values) => createDepartmentMutation.mutate(values)}
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
      >
        <FormTextInput name="name" label={HEBREW.departmentName} />
        <FormTextInput name="departmentCode" label={HEBREW.departmentCode} />

        <FormRoomField name="rooms" />

        <FormSubmitButton
          loading={createDepartmentMutation.isPending}
          sx={{ position: "fixed", bottom: "1rem", insetInlineEnd: "1rem" }}
        >
          {HEBREW.save}
        </FormSubmitButton>
      </FormProvider>
    </Box>
  );
}
