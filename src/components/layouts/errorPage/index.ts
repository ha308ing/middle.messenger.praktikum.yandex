import Component from "@/system/Component";
import Button from "@/components/elements/button";
import DefaultLogo from "@/components/elements/logo";
import errorPageTemplateString from "./errorPage.hbs?raw";
import "./errorPage.scss";

export default class ErrorPageLayout_ extends Component {
  protected _setTemplate(): string {
    return errorPageTemplateString.trim();
  }
}

const Logo = new DefaultLogo();

const ButtonErrorBack = new Button("button", { buttonText: "Go Back" }, "button errorPage_message_button");

export function createErrorPage(errorCode: number | string, errorMessage: string) {
  return new ErrorPageLayout_(
    "div",
    { Logo, errorCode, errorMessage, ButtonErrorBack },
    "page errorPage errorPage_404 bigLogoLayout"
  );
}
