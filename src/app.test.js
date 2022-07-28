import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("should be able to type an email", () => {
    const emailInputElement = screen.getByLabelText("Email address");

    userEvent.type(emailInputElement, "mona@gmail.com");
    expect(emailInputElement.value).toEqual("mona@gmail.com");
  });

  test("email should be invalid", () => {
    const emailInputElement = screen.getByLabelText("Email address");

    userEvent.type(emailInputElement, "monagmail.com");
    const submitBtn = screen.getByRole("button", { name: "Submit" });
    userEvent.click(submitBtn);
    expect(
      screen.queryByText("The email you input is invalid.")
    ).toBeInTheDocument();
  });
  test("Enter Password", () => {
    const passwordInputElement = screen.getByLabelText("Password");
    userEvent.type(passwordInputElement, "12345");
    expect(passwordInputElement.value).toEqual("12345");
  });
  test("Password length", () => {
    const emailInputElement = screen.getByLabelText("Email address");
    userEvent.type(emailInputElement, "ragheb@iti.com");
    const passwordInputElement = screen.getByLabelText("Password");
    userEvent.type(passwordInputElement, "7777");
    const submitBtn = screen.getByRole("button", { name: "Submit" });
    userEvent.click(submitBtn);
    expect(
      screen.queryByText(
        "The password you entered should contain 5 or more characters."
      )
    ).toBeInTheDocument();
  });

  test("Confirm password", () => {
    const confirmPasswordInputElement =
      screen.getByLabelText("Confirm Password");
    userEvent.type(confirmPasswordInputElement, "4567");
    expect(confirmPasswordInputElement.value).toEqual("4567");
  });

  test("Password Confirmation Should Match Password", () => {
    const emailInputElement = screen.getByLabelText("Email address");
    userEvent.type(emailInputElement, "ragheb@iti.com");

    const passwordInputElement = screen.getByLabelText("Password");
    userEvent.type(passwordInputElement, "00000");

    const passwordConfirmationInputElement =
      screen.getByLabelText("Confirm Password");
    userEvent.type(passwordConfirmationInputElement, "000");

    const submitBtn = screen.getByRole("button", { name: "Submit" });
    userEvent.click(submitBtn);
    expect(
      screen.queryByText("The passwords don't match. Try again.")
    ).toBeInTheDocument();
  });
});
