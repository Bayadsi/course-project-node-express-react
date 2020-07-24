import { API_BASE } from "../constants";
import { Course, Review, Votes } from "../store/course/types";

const COURSE_BASE = `${API_BASE}/courses`;

class CoursesApi {
  async createCourse(course: Course) {
    try {
      const courseResp = await fetch(
        COURSE_BASE,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(course)
        }
      );
      const courseCreated = await courseResp.json();
      if (courseCreated.status >= 400) {
        return {
          success: false,
          message: courseCreated.message
        };
      }
      return {
        success: true,
        course: courseCreated,
      }
    } catch (e) {
      return e.message;
    }
  }

  async getAllCourses() {
    try {
      const coursesResp = await fetch(
        COURSE_BASE,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const courses = await coursesResp.json();
      if (courses.status >= 400) {
        return {
          success: false,
          message: courses.message
        };
      }
      return {
        success: true,
        courses: courses,
      }
    } catch (e) {
      return e.message;
    }
  }

  async deleteCourse(id: string) {
    await fetch(
      COURSE_BASE + '/' + encodeURIComponent(id),
     {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
       },
     }
   );
  }
  
  async getCourse(id: string) {
    try {
      const courseResp = await fetch(
        COURSE_BASE + '/' + encodeURIComponent(id),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const course = await courseResp.json();
      if (course.status >= 400) {
        return {
          success: false,
          message: course.message
        };
      }
      return {
        success: true,
        course,
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }
  async addReviewToCourse(courseId: string, review: Review) {
    try {
      const courseResp = await fetch(
        COURSE_BASE + '/' + encodeURIComponent(courseId) + '/reviews',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(review)
        }
      );

      const course = await courseResp.json();
      if (course.status >= 400) {
        return {
          success: false,
          message: course.message
        };
      }
      return {
        success: true,
        course,
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  async addReviewVote(courseId: string, reviewId: string, userId: string, vote: Votes) {
    try {
      const voteResp = await fetch(
        COURSE_BASE + '/' + encodeURIComponent(courseId) + '/reviews/' + encodeURIComponent(reviewId) + '/votes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vote,
            userId,
          }),
        }
      );

      const voteJSON = await voteResp.json();
      if (voteJSON.status >= 400) {
        return {
          success: false,
          message: voteJSON.message
        };
      }
      return {
        success: true,
        course: voteJSON
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  
  async subscribeToCourse(courseId: string, userId: string) {
    try {
      const courseResp = await fetch(
        COURSE_BASE + '/' + encodeURIComponent(courseId) + '/subscriptions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      const course = await courseResp.json();
      if (course.status >= 400) {
        return {
          success: false,
          message: course.message
        };
      }
      return {
        success: true,
        course: course
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }
}

const coursesApi = new CoursesApi();
export default coursesApi;