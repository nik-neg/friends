import {
  AuthContainer,
  AuthForm,
  AuthFormWrapper,
  Input,
  SLink,
  SWarningSpan,
} from "./Welcome.styles.ts";
import { useState } from "react";
import { Spacer } from "../common/Spacer/Spacer.styles.ts";
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IWelcome } from "./types.ts";
import { loginSchema, registerSchema } from "./validation/schema.ts";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context";
import { HttpStatusCode } from "axios";

export const Welcome = () => {
  const { handleAuthenticated, updateUser } = useUser();

  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  const defaultValues: IWelcome = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(isRegistered ? loginSchema : registerSchema),
  });

  const handleLogin = async () => {
    if (isValid) {
      try {
        let url;
        if (isRegistered) {
          url = import.meta.env.VITE_SERVER_URL_LOGIN;
        } else {
          url = import.meta.env.VITE_SERVER_URL_REGISTER;
        }

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(getValues()),
        });

        if (
          res.status === HttpStatusCode.Created ||
          res.status === HttpStatusCode.Ok
        ) {
          const data = await res.json();
          updateUser(data);
          localStorage.setItem("userData", JSON.stringify(data));
          if (data?.access_token) {
            handleAuthenticated(true);
            navigate("/friends");
          }
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };
  return (
    <AuthContainer>
      <h1>Welcome</h1>
      <AuthFormWrapper>
        <AuthForm onSubmit={handleSubmit(handleLogin)}>
          {!isRegistered && (
            <>
              <Input
                type="text"
                placeholder="FirstName"
                id={"first_name"}
                {...register("first_name")}
              />
              {errors.first_name && (
                <SWarningSpan>{errors.first_name.message}</SWarningSpan>
              )}
              <Input
                type="text"
                placeholder="LastName"
                id={"last_name"}
                {...register("last_name")}
              />
              {errors.last_name && (
                <SWarningSpan>{errors.last_name.message}</SWarningSpan>
              )}
            </>
          )}
          <Input
            type="email"
            placeholder="Email"
            id={"email"}
            {...register("email")}
          />
          {errors.email && <SWarningSpan>{errors.email.message}</SWarningSpan>}
          <Input
            type="password"
            placeholder="Password"
            id={"password"}
            {...register("password")}
          />
          {errors.password && (
            <SWarningSpan>{errors.password.message}</SWarningSpan>
          )}
          <Input
            type="submit"
            value={isRegistered ? "Login" : "Register"}
            name={"submit"}
            id={"submit"}
            isSubmit
          />
        </AuthForm>
      </AuthFormWrapper>
      <Spacer height={1} />
      <SLink onClick={() => setIsRegistered(!isRegistered)}>
        {!isRegistered
          ? "Already user? Login here..."
          : "Not user yet? Register!"}
      </SLink>
      <Spacer height={1} />
    </AuthContainer>
  );
};
