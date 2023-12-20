import Button from "@/components/elements/button";
import errorMessageTemplateString from "./ErrorMessage.hbs?raw";
import Component from "@/system/component";
import "./ErrorMessage.scss";
import Router from "@/system/router";

type ErrorMessageComponentProps = {
  errorCode: number | string;
  errorMessage: string;
  ButtonErrorBack: Button;
};

type ErrorMessageProps = {
  errorCode: number | string;
  errorMessage: string;
};

export default class ErrorMessage extends Component<ErrorMessageComponentProps> {
  constructor(props: ErrorMessageProps) {
    super(
      "section",
      {
        errorCode: props.errorCode,
        errorMessage: props.errorMessage,
        ButtonErrorBack: new Button(
          {
            buttonText: "Go Home",
            click: (event: Event) => {
              event.preventDefault();
              Router.go("/sign-in");
            },
          },
          "button errorPage_message_button"
        ),
      },
      "errorPage_message"
    );
  }

  protected _setTemplate(): string | null {
    return errorMessageTemplateString.trim();
  }
}
