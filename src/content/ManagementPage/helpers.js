import { GET_ERRORS } from "../../actions/types";
const axios = require('axios').default;
const list_clusters_service = require("../../config/keys").list_clusters_service;
const register_course_service = require("../../config/keys").register_course_service;
const list_courses_management_service = require("../../config/keys").list_courses_management_service;

export const listClusters = (user, course) => dispatch => {
  return new Promise((resolve, reject) => {
    const url =list_clusters_service;
    axios.get(url)
    .then(response => resolve(response))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  });
};

export const registerCourse = (courseData, history) => dispatch => {
  console.log(courseData);
  return new Promise((resolve, reject) => {
  axios
    .post(register_course_service, courseData)
    // .then(res => history.push("/management"))
    .then(response => resolve(response))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
    });
};

export const  data = () => dispatch => {
  return new Promise((resolve, reject) => {
    const url = list_courses_management_service;
    axios.get(url)
    .then(response => resolve(response))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  });
};