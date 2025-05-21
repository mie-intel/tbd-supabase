"use client";

import Container from "@/components/Container";
import { forwardRef, use, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { prettyJson } from "@/lib/prettyJson";
import { User, Lock } from "lucide-react";
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
          <h2 className="font-eudoxus-bold text-4xl text-white sm:text-5xl lg:text-6xl">Log In</h2>
          <div className="mt-6 flex w-full flex-col gap-4">
            <InputWrapper icon={User} placeholder="Email" />
            <InputWrapper icon={Lock} placeholder="password" />
            <ButtonSubmit>Sign In</ButtonSubmit>
          </div>
          <p className="font-eudoxus-bold text-sm text-white lg:mt-3 lg:text-xl">
            New Here?{" "}
            <span className="text-[#213356] duration-500 hover:text-[#EFF4FE]">
              <Link href="/sign-up">Create Account</Link>
            </span>
          </p>
        </Container>
      </div>
    </>
  );
}
