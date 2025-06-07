import { Link as RouterLink, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as yup from "yup";
import {
  FormCheckbox,
  FormPassword,
  FormProvider,
  FormSubmitButton,
  FormTextInput,
} from "@hilma/forms";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { withAuth } from "@hilma/auth-client";

import { Page } from "../components/Page";
import { HEBREW } from "../hebrew";

const validationSchema = yup.object({
  username: yup.string().required(HEBREW.requiredField),
  password: yup.string().required(HEBREW.requiredField),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], HEBREW.passwordsShouldMatch),
  ...(import.meta.env.DEV ? { isAdmin: yup.boolean() } : {}),
});

type FormValues = yup.InferType<typeof validationSchema>;

const INITIAL_VALUES: FormValues = {
  username: "",
  password: "",
  ...(import.meta.env.DEV ? { isAdmin: false } : {}),
};

async function postRegister(values: FormValues) {
  const path =
    import.meta.env.DEV && values.isAdmin
      ? "/api/auth/register/admin"
      : "/api/auth/register";

  await axios.post(path, {
    username: values.username,
    password: values.password,
  });
}

export const RegisterPage = withAuth(
  function RegisterPage() {
    const navigate = useNavigate();

    const registerMutation = useMutation({
      mutationFn: postRegister,
      onSuccess() {
        navigate("/");
      },
    });

    return (
      <Page justifyContent="center" alignItems="center">
        <Card sx={{ width: "20rem" }}>
          <CardContent>
            <FormProvider
              onSubmit={(values) => registerMutation.mutate(values)}
              initialValues={INITIAL_VALUES}
              validationSchema={validationSchema}
            >
              <FormTextInput name="username" label={HEBREW.username} />
              <FormPassword name="password" label={HEBREW.password} />
              <FormPassword
                name="confirmPassword"
                label={HEBREW.confirmPassword}
              />
              {import.meta.env.DEV && (
                <FormCheckbox name="isAdmin" label={HEBREW.isAdmin} />
              )}
              <FormSubmitButton
                disabled={registerMutation.isPending}
                sx={{ alignSelf: "end" }}
              >
                {HEBREW.register}
              </FormSubmitButton>
            </FormProvider>
          </CardContent>

          <CardContent>
            <Typography>
              {HEBREW.alreadyRegistered}{" "}
              <Link component={RouterLink} to="/">
                {HEBREW.loginHere}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Page>
    );
  },
  { access: "public-only" },
);
