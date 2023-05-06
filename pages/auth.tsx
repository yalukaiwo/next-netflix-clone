/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleLogin = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (e) {
      console.error(e);
    }
  }, [email, password]);

  const handleRegister = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });
      handleLogin();
    } catch (e) {
      console.error(e);
    }
  }, [email, username, password, handleLogin]);

  return (
    <main className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black h-full w-full lg:bg-opacity-50 ">
        <div className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </div>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 w-full lg:w-2/5 lg:max-w-md rounded-md">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {isLogin ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {!isLogin && (
                <Input
                  label="Username"
                  onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                    setUsername(e.currentTarget.value);
                  }}
                  id="username"
                  type="username"
                  value={username}
                />
              )}
              <Input
                label="Email"
                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                  setEmail(e.currentTarget.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                  setPassword(e.currentTarget.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={!isLogin ? handleRegister : handleLogin}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => {
                  signIn("google", { callbackUrl: "/profiles" });
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => {
                  signIn("github", { callbackUrl: "/profiles" });
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {isLogin
                ? "First time using Netflix?"
                : "Already have an account?"}{" "}
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
