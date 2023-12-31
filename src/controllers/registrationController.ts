import RegistrationAPI from "@/api/registrationAPI";
import { type SignupObject } from "@/types/types.api";

class RegistrationController {
  public async register(registrationInput: SignupObject) {
    const response = await RegistrationAPI.register(registrationInput);

    return response;
  }
}

export default new RegistrationController();
