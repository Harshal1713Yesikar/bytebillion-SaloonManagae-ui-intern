import React from 'react'
import { useDispatch } from 'react-redux';
import ListCourses from './ListCourses';
import CourseCard from './CourseCard';

const Courses = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <ListCourses />
      {/* <CourseCard /> */}
    </div>
  )
}

export default Courses;
