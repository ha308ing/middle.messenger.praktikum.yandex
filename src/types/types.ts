export type PlainObject<T = unknown> = {
  [k in string]: T;
};

export type Indexed<T = unknown> = {
  [k in string]: T;
};
