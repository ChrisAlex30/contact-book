"use client";

import { useEffect, useState } from "react";

import {
  fetchUserAttributes,
} from "aws-amplify/auth";

export default function useCurrentUser() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const attributes =
          await fetchUserAttributes();

        setName(attributes.name ?? "");
        setEmail(attributes.email ?? "");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return {
    name,
    email,
    loading,
  };
}