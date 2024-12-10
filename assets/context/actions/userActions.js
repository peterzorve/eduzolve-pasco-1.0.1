export const SET_USER = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const SET_USER_NULL = () => {
  return {
    type: "SET_USER_NULL",
  };
};



export const SET_SUBSCRIPTION_STATUS = (status) => ({
  type: "SET_SUBSCRIPTION_STATUS",
  status,
});

export const RESET_SUBSCRIPTION_STATUS = () => ({
  type: "RESET_SUBSCRIPTION_STATUS",
});
