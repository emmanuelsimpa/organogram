import { useEffect, useState } from "react";
import { env } from "../config/env";
import { toast } from "react-toastify";
import { handleError } from "@/utils/handle-error";
import { useDisclosure } from "./useDisclosure-hook";
import { useRouter } from "next/navigation";
import { DataProps } from "../types/data";

export const useDashboard = () => {
  const router = useRouter();
  const [data, setData] = useState<DataProps>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const editDisclosure = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);

  const handleRequest = async () => {
    const token = localStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(`${env.API_URL}questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: token || "",
        },
      });

      setLoad(false);
      if (!response.ok) {
        const data = await response.json();
        setIsLoading(false);
        return toast.error(data.message);
      }
      const data = await response.json();
      const dataArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            question: data[key].question,
            options: data[key].options,
          }))
        : [];
      setData(dataArray);
      setIsLoading(false);
    } catch (error) {
      setLoad(false);
      setIsLoading(false);
      handleError(error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`${env.API_URL}questions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Token: token || "",
        },
      });

      if (!response.ok) {
        return toast.error("Unexpected error");
      }
      toast.success("Question successfully deleted");
      await handleRequest();
    } catch (error) {
      handleError(error);
    }
  };

  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  const handleOpenEditModal = (id: string) => {
    editDisclosure.onOpen();
    localStorage.setItem("editKey", id);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      handleRequest();
    }
  }, [isOpen, editDisclosure.isOpen]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("auth/login");
    }
  }, [router]);

  return {
    data,
    isLoading,
    isOpen,
    onClose,
    onOpen,
    letters,
    handleDelete,
    editDisclosure,
    handleOpenEditModal,
    load,
  };
};
