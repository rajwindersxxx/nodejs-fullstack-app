import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/Input";
import { PrimaryButton } from "./ui/PrimaryButton";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Login } from "../types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>();
  const navigation = useNavigate();
  const { isPending, mutate: signupUser } = useMutation({
    mutationFn: (input: Login) => loginUser(input),
    onSuccess: () => {
      navigation("/post");
      reset()
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const onSubmit: SubmitHandler<Login> = (data) => {
    signupUser(data);
  };
  return (
    <div>
      <h2 className="p-2 text-center text-xl">You need to login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          placeholder="Enter your email "
          type="text"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message as string}
          disabled={isPending}
          required
        />
        <Input
          label="Password"
          placeholder="Enter Your password"
          type="password"
          disabled={isPending}
          error={errors.password?.message as string}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 6 characters",
            },
          })}
          required
        />
        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <PrimaryButton type="submit" disabled={isPending}>
          Sign In
        </PrimaryButton>
      </form>
      <p className="py-4 text-center">
        Don't have Account{" "}
        <Link to="/signup" className="text-blue-600 underline">
          SignUp
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
