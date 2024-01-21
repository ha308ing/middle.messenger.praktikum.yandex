export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
  role: string;
};

export type UserDetails = Omit<User, "avatar">;

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
  last_message: Pick<Thread, "last_message">;
};

export type WSMessage = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};
