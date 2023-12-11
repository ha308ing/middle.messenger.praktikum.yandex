export type UserInfo = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type UserDetails = Omit<UserInfo, "avatar">;

export type Thread = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type SigninObject = {
  login: string;
  password: string;
};

export type SignupObject = {
  login: string;
  password: string;
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
};

export type Message = {
  id: number;
  user_id: number;
  content: string;
  time: string;
  last_message: Record<string, any>;
};
