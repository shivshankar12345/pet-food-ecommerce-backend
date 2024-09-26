export const checkRequiredValidation = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    let message: string = "";

    for (const item of data) {
      message = "";
      switch (item.type) {
        case "Empty":
          if (!item.value) {
            message = `${item.field} is required.`;
          }
          break;

        case "Length":
          if (
            typeof item.value === "string" &&
            (item.value.length < 8 || item.value.length > 255)
          ) {
            message = `${item.field} must be at least 8 characters and a maximum of 255 characters long.`;
          }
          break;

        case "Length maximum 255 characters":
          if (typeof item.value === "string" && item.value.length > 255) {
            message = `${item.field} length must be a maximum of 255 characters long.`;
          }
          break;

        case "Confirm Password":
          const passwordIndex = data.findIndex(
            (item1: any) => item1.field === "Password"
          );
          const confirmPasswordIndex = data.findIndex(
            (item1: any) => item1.field === "Confirm password"
          );
          if (passwordIndex !== -1 && confirmPasswordIndex !== -1) {
            const password: string = data[passwordIndex].value;
            const confirmPassword: string = data[confirmPasswordIndex].value;
            if (password !== confirmPassword) {
              message = `${item.field} does not match.`;
            }
          }
          break;
      }

      if (message !== "") {
        resolve({
          status: false,
          message: message,
        });
        return;
      }
    }

    resolve({
      status: true,
    });
  });
};

export default {
  checkRequiredValidation,
};
