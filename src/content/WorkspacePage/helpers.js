// import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "../../actions/types";
const axios = require('axios').default;
// const users_service = require("../../config/keys").users;
const creae_user_service = require("../../config/keys").creae_user_service;
const list_courses_service = require("../../config/keys").list_courses_service;
export const courseData = (user, course) => dispatch => {
  const usercourse = { user: user, course: course };
  return new Promise((resolve, reject) => {
    const url = creae_user_service;
    axios.post(url, usercourse).then(response => resolve(response));
  });
};

export const listCourses = (user, course) => dispatch => {
  return new Promise((resolve, reject) => {
    const url =list_courses_service;
    axios.get(url).then(response => resolve(response));
  });
};
