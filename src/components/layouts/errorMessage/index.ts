import { Button } from "@/components/elements/button";
import errorMessageTemplateString from "./errorMessage.hbs?raw";
import "./errorMessage.scss";
import router from "@/system/router";
import { Block } from "@/system/block";

type ErrorMessageComponentProps = {
  errorCode: number | string;
  errorMessage: string;
  ButtonErrorBack: Button;
};

type ErrorMessageProps = {
  errorCode: number | string;
  errorMessage: string;
};

export class ErrorMessage extends Block<ErrorMessageComponentProps> {
  constructor(props: ErrorMessageProps) {
    super("section", {
      errorCode: props.errorCode,
      errorMessage: props.errorMessage,
      class: "errorPage_message",
    });

    this.children.ButtonErrorBack = new Button({
      buttonText: "Go Home",
      class: "button errorPage_message_button",
      click: (event: Event) => {
        event.preventDefault();
        router.go("/");
      },
    });
  }

  render() {
    return this.compile(errorMessageTemplateString, { ...this.props, ButtonErrorBack: this.children.ButtonErrorBack });
  }
}
