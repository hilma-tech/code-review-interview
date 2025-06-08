import type { DepartmentResponse } from "@internal/types";
import { FormProvider, FormSubmitButton, FormTextInput } from "@hilma/forms";
import Box from "@mui/material/Box";
import * as yup from "yup";
import {
  type QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  departmentCode: "",
  rooms: [{ name: "" }],
};

async function postDepartment(values: DepartmentPageFormValues) {
  await axios.post("/api/department", values);
}

async function putDepartment({
  departmentId,
  ...values
}: DepartmentPageFormValues & { departmentId: number }) {
  await axios.put(`/api/department/${departmentId}`, values);
}

function departmentDetailsQueryKey(departmentId: string | undefined) {
  return [
    "department-details",
    departmentId ? Number(departmentId) : undefined,
  ] as const;
}

async function getDepartmentDetails({
  queryKey: [, departmentId],
  signal,
}: QueryFunctionContext<
  ReturnType<typeof departmentDetailsQueryKey>
>): Promise<DepartmentPageFormValues> {
  const { data } = await axios.get<DepartmentResponse.DepartmentDetails>(
    `/api/department/details/${departmentId}`,
    { signal },
  );
  return {
    ...data,
    departmentCode: data.departmentCode ?? "",
    rooms: data.rooms.map((room) => ({
      ...room,
      roomCode: room.roomCode ?? undefined,
    })),
  };
}

export function DepartmentPage() {
  const { departmentId } = useParams<{ departmentId?: string }>();
  const navigate = useNavigate();

  const createDepartmentMutation = useMutation({
    mutationFn: postDepartment,
    onSuccess() {
      navigate("/departments");
    },
  });

  const editDepartmentMutation = useMutation({
    mutationFn: putDepartment,
    async onSuccess() {
      navigate("/departments");
      await departmentDetailsQuery.refetch();
    },
  });

  const departmentDetailsQuery = useQuery({
    queryKey: departmentDetailsQueryKey(departmentId),
    queryFn: getDepartmentDetails,
  });

  const isLoading = !!departmentId && departmentDetailsQuery.isPending;

  function handleSubmit(values: DepartmentPageFormValues) {
    if (departmentId) {
      editDepartmentMutation.mutate({
        ...values,
        departmentId: Number(departmentId),
      });
    } else {
      createDepartmentMutation.mutate(values);
    }
  }

  return (
    <Box sx={{ p: "1rem" }}>
      <FormProvider
        onSubmit={handleSubmit}
        initialValues={departmentDetailsQuery.data ?? INITIAL_VALUES}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <FormTextInput
          isLoading={isLoading}
          name="name"
          label={HEBREW.departmentName}
        />
        <FormTextInput
          isLoading={isLoading}
          name="departmentCode"
          label={HEBREW.departmentCode}
        />

        <FormRoomField name="rooms" />

        <FormSubmitButton
          loading={
            editDepartmentMutation.isPending ||
            createDepartmentMutation.isPending
          }
          sx={{ position: "fixed", bottom: "1rem", insetInlineEnd: "1rem" }}
        >
          {HEBREW.save}
        </FormSubmitButton>
      </FormProvider>
    </Box>
  );
}
