import { notification } from "ant-design-vue";

export function useAuthentication() {
  const router = useRouter();

  // const { getLoggedInUser } = useUsers();

  const userId = useCookie<string | number>("user_id");

  const accessToken = useCookie("access_token");

  const userRole = useCookie('user_role')

  const userName = useCookie('user_name')

  const userEmail = useCookie('user_email')

  const userPhone = useCookie('user_phone')

  const route = useRoute();

  const loginFormState = useState<ILoginRequest>("login-form-state", () => ({
    email: "",
    password: "",
  }));

  const registerFormState = useState<IRegister>("register-form-state", () => ({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "customer",
  }));

  /**
   * ---------------------------------------------------
   * Login
   * ---------------------------------------------------
   *
   */
  const login = async () => {
    try {
      const response = await Authentication<ILoginResponse>("/auth/login", {
        method: "POST",
        data: loginFormState.value satisfies ILoginRequest,
      });

      if (response?.data.success) {
        notification.open({
          message: response.data.message,
          placement: "bottomRight",
        });

        console.log("user from login-----------------", response?.data?.data?.user);

        userId.value = response?.data?.data?.user?.id;

        accessToken.value = response?.data?.data?.token?.token;

        userRole.value = response?.data?.data?.user?.role;

        userName.value = response?.data?.data?.user?.firstName + " " + response?.data?.data?.user?.lastName;

        userEmail.value = response?.data?.data?.user?.email;

        userPhone.value = response?.data?.data?.user?.phoneNumber;

        router.push("/products");
      } else if (
        response?.data?.message ===
        "E_INVALID_AUTH_PASSWORD: Password mis-match"
      ) {
        notification.open({
          message: "Incorrect Password",
          description:
            "The password you have used is not correct, please try again!",
          placement: "bottomRight",
        });
      } else {
        notification.open({
          message: "User not found!",
          placement: "bottomRight",
        });
      }

      return response;
    } catch (error) {
      console.error("Error from login:", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Normal user registration
   * ---------------------------------------------------
   *
   */
  const register = async () => {
    try {
      const response = await Authentication("/auth/register", {
        method: "POST",
        data: registerFormState.value,
      });

      console.log("response from register-----------------", response?.data);

      if (response?.data?.success) {
        notification.open({
          message: "Your account has been created successfully",
          description:
            "You have created your account! You can now login to your dashboard to start managing events!",
          placement: "bottomRight",
        });
        router.push("/login");
      } else {
        notification.open({
          message: "Failed to create account",
          description: "Please try again",
          placement: "bottomRight",
        });
      }

      return response?.data;
    } catch (error) {
      console.log("Error from register", error);
    }
  };

    /**
   * ---------------------------------------------------
   * Logout
   * ---------------------------------------------------
   *
   */
    const logout = async () => {
      try {
        userEmail.value = null
        userRole.value = null
        userName.value = null
        userPhone.value = null
        userId.value = null
        accessToken.value = null
        router.push("/login");
      } catch (error) {
        console.log("Error from register", error);
      }
    };


  return {
    loginFormState,
    registerFormState,
    login,
    register,
  };
}
