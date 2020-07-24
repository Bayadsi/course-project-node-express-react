import { API_BASE } from "../constants";
import { CourseSuggestion } from "../store/course-suggestions/types";

const COURSE_SUGGESTION_BASE = `${API_BASE}/course-suggestions`;

class CourseSuggestionApi {
  async createCourseSuggestion(courseSuggestion: CourseSuggestion) {
    try {
      const courseSuggestionResp = await fetch(
        COURSE_SUGGESTION_BASE,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseSuggestion)
        }
      );
      const suggestionCreated = await courseSuggestionResp.json();
      if (suggestionCreated.status >= 400) {
        return {
          success: false,
          message: suggestionCreated.message
        };
      }
      return {
        success: true,
        user: suggestionCreated,
      }
    } catch (e) {
      return e.message;
    }
  }

  async getAllCourseSuggestions() {
    try {
      const courseSuggestionsResp = await fetch(
        COURSE_SUGGESTION_BASE,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const courseSuggestions = await courseSuggestionsResp.json();
      if (courseSuggestions.status >= 400) {
        return {
          success: false,
          message: courseSuggestions.message
        };
      }
      return {
        success: true,
        courseSuggestions: courseSuggestions,
      }
    } catch (e) {
      return e.message;
    }
  }

  async deleteCourseSuggestion(id: string) {
    await fetch(
     COURSE_SUGGESTION_BASE + '/' + encodeURIComponent(id),
     {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
       },
     }
   );
 }
}

const courseSuggestionApi = new CourseSuggestionApi();
export default courseSuggestionApi;