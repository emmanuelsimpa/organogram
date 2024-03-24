import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error:any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // outside the range of 2xx
    toast.error(error.response.data.message);
  } else if (error.request) {
    // The request was made but no response was received
    toast.error("No response from server.");
  } else {
    // Something happened in setting up the request that triggered an Error
    toast.error("An unexpected error occurred.");
  }
};
