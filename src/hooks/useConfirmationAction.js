import Swal from "sweetalert2";

export const useConfirmationAction = (onConfirm, actionType = "delete") => {
  const handleAction = async (itemEmail) => {
    let config = {
      delete: {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        confirmButtonText: "Yes, delete it!",
        successMessage: "The item has been deleted.",
      },
      finish: {
        title: "Mark as finished?",
        text: "This project will be marked as completed.",
        icon: "info",
        confirmButtonText: "Yes, finish it!",
        successMessage: "The project has been marked as finished.",
      },
    };

    const { title, text, icon, confirmButtonText, successMessage } =
      config[actionType] || config.delete;

    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(itemEmail);
        Swal.fire("Success!", successMessage, "success");
      }
    });
  };

  return { handleAction };
};
