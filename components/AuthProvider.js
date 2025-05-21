"use client";

import PropTypes from "prop-types";
import { createContext } from "react";
import { createClient } from "@/utils/supabase/client";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const supabase = createClient();
  const error = null;

  // create a new user
  const signUp = async (name, username, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password: password,
    });

    if (error) {
      console.log("error", error);
      return error;
    }

    console.log("data", data);
    const userData = {
      userid: data.user.id,
      nama: name,
      username: username,
      password: password,
    };
    // insert data to user table
    if (data.user) {
      const { error } = await supabase.from("users").insert([userData]);
      if (error) {
        console.log("Insert error:", error.message);
      }

      const { data: usersData } = await supabase.from("users").select("*");
      console.log("response", usersData);
    }

    return { status: "success", username: username };
  };

  const signIn = async (username, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) return { status: "error", error: error.message };
    return {
      status: "success",
      userid: data.user.id,
      username: username,
    };
  };

  const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) return { status: "error", error: error.message };
    if (!data.user) return { status: "error", error: "User not found" };
    return {
      status: "success",
      userid: data.user.id,
      username: data.user.email,
    };
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
