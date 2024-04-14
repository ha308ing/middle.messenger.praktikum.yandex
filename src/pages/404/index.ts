import { BigLogoLayout } from "@/components/layouts/bigLogoLayout";
import { ErrorMessage } from "@/components/layouts/errorMessage";

export class Page404 extends BigLogoLayout {
  constructor() {
    super();

    this.lists.content = [new ErrorMessage({ errorCode: "404", errorMessage: "it is somewhere else" })];

    // super("404", "it is somewhere else", "errorPage_404");
  }
}
