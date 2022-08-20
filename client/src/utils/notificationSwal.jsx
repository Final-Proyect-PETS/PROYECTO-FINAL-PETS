import Swal from "sweetalert2";

export const notificationSwal = (titleText, text, icon, confirmButtonText) => {
  Swal.fire({
    titleText: titleText,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  });
};
