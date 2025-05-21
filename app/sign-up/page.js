"use client";

import Container from "@/components/Container";
import { forwardRef, use, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { prettyJson } from "@/lib/prettyJson";
import { UserRoundPen, User, Lock, BadgeCheck } from "lucide-react";
import InputWrapper from "@/components/InputWrapper";
import ButtonSubmit from "@/components/ButtonSubmit";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Page() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { signUp, signIn, getCurrentUser } = useContext(AuthContext);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return <Loading />;
  // useEffect(() => {
  //   const login = async () => {
  //     const loginData = await signUp(
  //       "Polikarpus Arya",
  //       `polikarpus${Date.now()}@mail.com`,
  //       "parda123",
  //     );
  //     setData(loginData);
  //   };

  //   login();
  // }, []);

  // useEffect(() => {
  //   const user = async () => {
  //     const userData = await signIn(`polikarpus@mail.com`, "parda123");
  //     setData(userData);
  //   };

  //   user();
  // }, []);

  // useEffect(() => {
  //   const current = async () => {
  //     const userData = await getCurrentUser();
  //     setData(userData);
  //   };

  //   current();
  // }, []);

  // if (!data) return <></>;

  return (
    <>
      <div className="relative flex h-full w-full items-center justify-center">
        <Container className="relative flex w-[90%] flex-col items-center justify-center gap-3 rounded-xl border-2 border-[#EFF4FE] bg-white/30 px-[3%] py-20 text-[#213356] md:w-md lg:w-xl xl:w-2xl">
          <h2 className="font-eudoxus-bold text-4xl text-[#213356] sm:text-5xl lg:text-6xl">
            Register
          </h2>
          <div className="mt-6 flex w-full flex-col gap-4">
            <InputWrapper icon={UserRoundPen} placeholder="Name" />
            <InputWrapper icon={User} placeholder="Email" />
            <InputWrapper icon={Lock} placeholder="Password" />
            <InputWrapper icon={BadgeCheck} placeholder="Confirm Password" />
            <ButtonSubmit>Create Account</ButtonSubmit>
          </div>
          <p className="font-eudoxus-bold text-sm text-white lg:mt-3 lg:text-xl">
            Already have an account?{" "}
            <span className="text-[#213356] duration-500 hover:text-[#F5C45E]">
              <Link href="/sign-in">Sign In</Link>
            </span>
          </p>
        </Container>
      </div>
    </>
  );
}
