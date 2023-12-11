import BigLogoLayout from "@/components/layouts/bigLogoLayout";
import ErrorMessage from "@/components/layouts/errorMessage";

export default class Page404 extends BigLogoLayout {
  constructor() {
    super({
      content: new ErrorMessage({ errorCode: "404", errorMessage: "it is somewhere else" }),
    });
    // super("404", "it is somewhere else", "errorPage_404");
  }
}
