"use client";

import axiosInstance from "@/lib/axiosInstance";
import { registerUserSchema } from "@/validationSchema/registerCredentialSchema";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      return await axiosInstance.post("/user/register", values);
    },
    onSuccess: (res) => {
      router.push("/login");
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        role: "",
        address: "",
      }}
      validationSchema={registerUserSchema}
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-8 shadow-2xl rounded p-4 min-w-[450px] justify-center items-center"
          >
            <Typography variant="h5" className="text-gray-600">
              Register
            </Typography>

            <FormControl fullWidth>
              <TextField
                label="First Name"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.firstName}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Last Name"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.lastName}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Email" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.email}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.password}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Stack className="w-full justify-center items-center gap-2">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
              >
                submit
              </Button>

              <Link
                className="text-orange-400 hover:text-orange-600"
                href="/login"
              >
                Already a user? Login
              </Link>
            </Stack>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
