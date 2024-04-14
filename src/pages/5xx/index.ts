import { BigLogoLayout } from "@/components/layouts/bigLogoLayout";
import { ErrorMessage } from "@/components/layouts/errorMessage";

export class Page5xx extends BigLogoLayout {
  constructor() {
    super();
    this.lists.content = [new ErrorMessage({ errorCode: "5xx", errorMessage: "something went wrong" })];
  }
}
