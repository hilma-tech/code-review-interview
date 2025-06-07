import {
  ErrorMsg,
  FormPassword,
  FormProvider,
  FormSubmitButton,
  FormTextInput,
} from "@hilma/forms";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as yup from "yup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useAccessTokenQuery, withAuth } from "@hilma/auth-client";

import { HEBREW } from "../hebrew";
import { Page } from "../components/Page";

const validationSchema = yup.object({
  username: yup.string().required(HEBREW.requiredField),
  password: yup.string().required(HEBREW.requiredField),
});

type FormValues = yup.InferType<typeof validationSchema>;

const INITIAL_VALUES: FormValues = { username: "", password: "" };

async function postLogin(values: FormValues) {
  await axios.post("/api/auth/login", {
    username: values.username,
    password: values.password,
  });
}

export const LoginPage = withAuth(
  function LoginPage() {
    const accessTokenQuery = useAccessTokenQuery();

    const loginMutation = useMutation({
      mutationFn: postLogin,
      async onSuccess() {
        await accessTokenQuery.refetch();
      },
    });

    return (
      <Page justifyContent="center" alignItems="center">
        <Card sx={{ width: "20rem" }}>
          <CardContent>
            <FormProvider
              onSubmit={(values) => loginMutation.mutate(values)}
              initialValues={INITIAL_VALUES}
              validationSchema={validationSchema}
            >
              <FormTextInput name="username" label={HEBREW.username} />
              <FormPassword name="password" label={HEBREW.password} />

              {loginMutation.isError && <ErrorMsg error={HEBREW.loginError} />}

              <FormSubmitButton
                disabled={loginMutation.isPending}
                sx={{ alignSelf: "end" }}
              >
                {HEBREW.login}
              </FormSubmitButton>
            </FormProvider>
          </CardContent>

          <CardContent>
            <Typography textAlign="start">
              {HEBREW.notRegistered}{" "}
              <Link component={RouterLink} to="/register">
                {HEBREW.signUpHere}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Page>
    );
  },
  { access: "public-only" },
);
