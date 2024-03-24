import { useState } from "react";
import { env } from "../config/env";
import { toast } from "react-toastify";
import { handleError } from "@/utils/handle-error";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (e: { target: { value: string } }) => {
    setEmail(e.target.value);
  };

  const handleLogin = async () => {
    const jsonString = JSON.stringify({ email: email });
    setIsLoading(true);
    try {
      const response = await fetch(`${env.API_URL}token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });

      if (!response.ok) {
        const data = await response.json();
        setIsLoading(false);
        return toast.error(data.error);
      }

      setIsLoading(false);
      const data = await response.json();
      localStorage.setItem("jwtToken", data.token);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      handleError(error);
    }
  };
  return { email, isLoading, handleInput, handleLogin };
};
