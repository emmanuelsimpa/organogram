import { handleError } from "@/utils/handle-error";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { env } from "../config/env";

type payLoadProps = {
  question: string;
  options: Array<string>;
};

type DataProps = Array<{
  id: string;
  question: string;
  options: Array<string>;
}>;

export const useEditQuestion = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: DataProps;
}) => {
  const [payload, setPayload] = useState<payLoadProps>({
    question: "",
    options: [],
  });
  const [option, setOption] = useState("");
  const [options, setOptions] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const id = localStorage.getItem("editKey");
  const findData = data?.find((item) => item.id === id);

  const handleInput = (name: string, data: any) => {
    const index = options.indexOf(name);
    if (name === "question") {
      return setPayload((prev) => ({ ...prev, [name]: data.target.value }));
    } else if (index !== -1) {
      return setOptions((prev) => {
        const updatedOptions = [...prev];
        updatedOptions[index] = data.target.value;
        return updatedOptions;
      });
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
        setOptions((prev) => [...prev, option.trim()]);
        setOption("");
      } else {
        toast.error("Maximum options limit reached!");
      }
    }
  };

  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  async function handleSubmit() {
    const updatedPayload = { question: payload.question, options: options };
    const jsonString = JSON.stringify({ ...updatedPayload });
    const token = localStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(`${env.API_URL}questions/${id}`, {
        method: "PUT",
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
      localStorage.removeItem("editKey");
      toast.success("Question successfully updated");
      onClose();
    } catch (error) {
      setIsLoading(false);
      handleError(error);
    }
  }

  useEffect(() => {
    setPayload({
      question: String(findData?.question),
      options: findData?.options as Array<string>,
    });
    setOptions(findData?.options as Array<string>);
  }, [findData]);

  return {
    payload,
    handleInput,
    handleEnter,
    option,
    letters,
    isLoading,
    handleSubmit,
    options,
  };
};
