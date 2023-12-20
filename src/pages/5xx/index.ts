import BigLogoLayout from "@/components/layouts/bigLogoLayout";
import ErrorMessage from "@/components/layouts/errorMessage";

export default class Page5xx extends BigLogoLayout {
  constructor() {
    super({
      content: new ErrorMessage({ errorCode: "5xx", errorMessage: "something went wrong" }),
    });
  }
}
