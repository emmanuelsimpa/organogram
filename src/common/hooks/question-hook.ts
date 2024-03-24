import { handleError } from "@/utils/handle-error";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { env } from "../config/env";

type payLoadProps = {
  question: string;
  options: Array<string>;
};

export const useQuestion = ({ onClose }: { onClose: () => void }) => {
  const [payload, setPayload] = useState<payLoadProps>({
    question: "",
    options: [],
  });
  const [option, setOption] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (name: string, data: any) => {
    if (name === "question") {
      return setPayload((prev) => ({ ...prev, [name]: data.target.value }));
    } else {
      return setOption(data.target.value);
    }
  };

  const handleEnter = () => {
    if (option.trim() !== "") {
      if (payload.options.length < 5) {
        setPayload((prev) => ({
          ...prev,
          options: [...prev.options, option.trim()],
        }));
        setOption("");
      } else {
        toast.error("Maximum options limit reached!");
      }
    }
  };

  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  async function handleSubmit() {
    const jsonString = JSON.stringify({ ...payload });
    const token = localStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(`${env.API_URL}questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: token || "",
        },
        body: jsonString,
      });

      if (!response.ok) {
        const data = await response.json();
        setIsLoading(false);
        return toast.error(data.error);
      }

      setIsLoading(false);
      onClose();
      toast.success("Question successfully added");
    } catch (error) {
      setIsLoading(false);
      handleError(error);
    }
  }

  useEffect(() => {
    if (payload.question.length > 5) {
      return setShowOptions(true);
    } else if (payload.question.length < 5) {
      return setShowOptions(false);
    }
  }, [payload]);

  return {
    payload,
    handleInput,
    handleEnter,
    showOptions,
    option,
    letters,
    isLoading,
    handleSubmit,
  };
};
