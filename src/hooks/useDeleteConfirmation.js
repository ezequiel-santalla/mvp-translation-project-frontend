import Swal from "sweetalert2";

export const useDeleteConfirmation = (onDelete) => {
  const handleDelete = (itemEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(itemEmail);
        Swal.fire("Deleted!", "The item has been deleted.", "success");
      }
    });
  };

  return { handleDelete };
};
