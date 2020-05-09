export default class Storage {
  static setItem(key: string) {}
}
export const LOGIN_TOKEN_KEY = 'token';
const USER_NAME_KEY = 'name';
const USER_COURSES_KEY = 'courses';

export const setUserNameInStorage = function(name: string) {
  return localStorage.setItem(USER_NAME_KEY, name);
};

export const getUserNameFromStorage = function() {
  return localStorage.getItem(USER_NAME_KEY);
};

export const setUsersCoursesInStorage = function(courseIds: string) {
  return localStorage.setItem(USER_COURSES_KEY, courseIds);
};

export const getUsersCoursesFromStorage = function() {
  const courses = localStorage.getItem(USER_COURSES_KEY);
  if (courses) {
    return JSON.parse(courses);
  }
  return [];
};

export const isLogin = function() {
  const token = localStorage.getItem(LOGIN_TOKEN_KEY);
  return !!token;
};

export const logout = function() {
  localStorage.removeItem(LOGIN_TOKEN_KEY);
};

export const getCourseNameById = function(courseId: string) {
  try {
    const courses = getUsersCoursesFromStorage();
    const course: any = courses.find((course: any) => course._id === courseId);
    return course.name.split('-')[0].trim();
  } catch (err) {
    console.error(err);
  }
  return '';
};
