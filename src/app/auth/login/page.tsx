"use client";
import { Logo } from "@/common/component/logo";
import Image from "next/image";
import React from "react";
import LogoImg from "@/assets/imgs/login-bg.jpg";
import { useLogin } from "@/common/hooks/login-hook";
import { Button } from "@/common/component/button";

export default function Login() {
  const { email, handleInput, handleLogin, isLoading } = useLogin();
  return (
    <div className="min-h-screen w-full h-full flex relative">
      <div className="hidden md:flex absolute bg-green-500 h-full w-3/6 xl:w-4/6 clip-one">
        <div className="h-full w-full">
          <Image
            src={LogoImg}
            alt="login"
            className="object-cover h-full w-[99%] clip-one grayscale"
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="h-auto w-full" />
        <div className="h-auto w-full">
          <div className="flex w-full h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-5">
              <div className="flex place-content-center w-full">
                <Logo />
              </div>
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <div className="mt-10 w-full md:max-w-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      value={email}
                      onChange={handleInput}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-green-950 shadow-sm ring-1 ring-inset ring-green-950 placeholder:text-stone-950 focus:ring-2 focus:ring-inset focus:ring-green-950 text-sm md:text-base sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <Button
                    text="Sign in"
                    loading={isLoading}
                    onClick={handleLogin}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
