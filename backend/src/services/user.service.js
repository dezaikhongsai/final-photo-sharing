import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const createUser = async (userData) => {
  const {
    username,
    password,
    first_name,
    last_name,
    location,
    description,
    occupation,
  } = userData;
  const isExsitUser = await User.findOne({ username: username });
  if (isExsitUser) {
    throw new Error("User is exsited !");
  }
  const newUser = await User.create({
    username,
    password,
    first_name,
    last_name,
    location,
    description,
    occupation,
  });
  return newUser;
};

export const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    throw new Error("User not found !");
  }
  if (password !== user.password) {
    throw new Error("Invalid password !");
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user,
    token,
  };
};

export const getAllUser = async () => {
  const users = await User.find();
  if (!users) {
    throw new Error("Users not found");
  }
  return users;
};

export const getUserId = async (uId) => {
  const user = await User.findById(uId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
