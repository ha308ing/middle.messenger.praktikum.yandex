import Handlebars from "handlebars";
import avatarTemplateString from "/components/elements/avatar/avatar.hbs?raw";
import "/components/elements/avatar/avatar.scss";
import sweaterImage from "/assets/sweater.png";

const avatarProfileContext = {
  avatarSrc: sweaterImage,
  avatarClass: "avatar_profile",
};

const avatarThreadContext = {
  avatarSrc: sweaterImage,
  avatarClass: "avatar_thread",
};

Handlebars.registerPartial("avatar", avatarTemplateString);
Handlebars.registerPartial(
  "avatarProfile",
  Handlebars.compile(avatarTemplateString)(avatarProfileContext)
);
Handlebars.registerPartial(
  "avatarThread",
  Handlebars.compile(avatarTemplateString)(avatarThreadContext)
);
