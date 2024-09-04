import api from "../../../shared/api";
import { UserProps } from "../types/types";

export const getUserData = () => {
  return api.get(`/api/users`);
};

export const addUserData = (data: UserProps) => {
  return api.post(`/api/users`, data);
};

export const editUsers = (data: UserProps) => {
  return api.patch(`/api/users/${data?.id}`, data);
};

export const deleteUsers = (data: UserProps) => {
  return api.delete(`/api/users/${data}`);
};
