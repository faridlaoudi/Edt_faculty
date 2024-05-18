"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import loginImage from "@/app/assets/login-image.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { set } from "date-fns";

// Define the schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 8 characters long" }),
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const handleSubmit = async () => {
    // Use Zod schema to validate the inputs
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      // Extract errors and update state to display them
      const errors = result.error.format();
      setFormErrors({
        email: errors.email?._errors[0] || "",
        password: errors.password?._errors[0] || "",
      });
      return;
    }

    // Clear previous errors
    setFormErrors({ email: "", password: "" });

    // Authentication logic here
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        setAuthError(
          "Failed to sign in. Please check your credentials and try again."
        );
        return;
      }
      setLoading(false);

      // Redirect to the home page
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      // Reset password field only after attempt to sign in
      setLoading(false);
      setPassword("");
    }

    // Clear the form fields after the logic processing, if necessary
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-full my-9">
      <div className="flex w-full flex-col items-center ">
        <div className="lg:h-[552.835px]  lg:rounded-xl rounded-3xl flex flex-col lg:flex-row bg-white gap-[64.165px] lg:pr-[59.495px] p-12 lg:p-0">
          <div className="h-full w-1/2 hidden lg:block">
            <Image
              src={loginImage}
              alt="image"
              className="h-full"
              width={500}
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col py-10 gap-28 text-center lg:text-left">
            <div className="flex flex-col gap-5">
              <h1 className="font-medium text-5xl">Bienvenue</h1>
              <p className="text-[#BDBDBD]">
                Accedez a votre compte pour consulter les emplois du temps.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={handleEmailChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-4 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#00A4D4] focus:outline-none focus:ring-0 focus:border-[#00A4D4] peer h-16"
                  placeholder=""
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                  Email
                </label>
                {formErrors.email && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.email}
                  </p>
                )}
              </div>
              {/* Password input */}
              <div>
                <div className="relative">
                  <input
                    value={password}
                    type="password"
                    name="password"
                    onChange={handlePasswordChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-4 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#00A4D4] focus:outline-none focus:ring-0 focus:border-[#00A4D4] peer h-16"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Password
                  </label>
                  {formErrors.password && (
                    <p className="text-red-500 text-xs italic">
                      {formErrors.password}
                    </p>
                  )}
                </div>
                <p className="mx-4 font-extralight text-sm text-gray-400">
                  Mot de passe doit contenir au moins 4 caracteres
                </p>
              </div>
              {/* Submit button */}
              <div className="my-5">
                <button
                  disabled={isLoading}
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center h-12 text-lg items-center rounded-md bg-[#00A4D4] px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
                >
                  {isLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Se connecter"
                  )}
                </button>
                {authError && !isLoading && (
                  <div className="text-center my-4 text-sm text-red-500">
                    {authError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-gray-500 text-sm">Copyright &#169; 2024</p>
      </div>
    </div>
  );
};

export default LoginPage;
