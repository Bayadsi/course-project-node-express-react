import { API_BASE } from "../constants";
import { User } from "../store/user/types";

const USER_API_BASE = `${API_BASE}/users`;
class UserApi {
  async getAllUsers() {
    const response = await fetch(USER_API_BASE);
    const users = await response.json();
    return users;
  }

  async updateUser(user: User): Promise<User> {
    const response = await fetch(
      USER_API_BASE + '/' + encodeURIComponent(user._id || ''),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      }
    );
    const userUpdated = await response.json();
    if (response.status >= 400) { //error status code
      console.log("Error updating Post:", userUpdated);
      throw (userUpdated.message);
    }
    console.log("User updated successfully", userUpdated);
    return userUpdated;
  }

  async createUser(user: User): Promise<User> {
    try {
      const usersResp = await fetch(
        USER_API_BASE,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        }
      );
      const userCreated = await usersResp.json();
      if (userCreated.code) {
        return userCreated.message;
      }
      return userCreated;
    } catch (e) {
      return e.message;
    }
  }

  async getUser(id: string) {
    const response = await fetch(USER_API_BASE + '/' + encodeURIComponent(id));
    const user = await response.json();
    return user;
  }

  async login(credentials: { username: string, password: string }) {
    const response = await fetch(
      USER_API_BASE + "/login",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(credentials)
      }
    );
    const user = await response.json();
    if (response.status >= 400) {
      return {
        success: false,
        message: user.message
      };
    }
    return {
      success: true,
      user: user,
    }
  }

  async deleteUser(id: string) {
     await fetch(
      USER_API_BASE + '/' + encodeURIComponent(id),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

const UserAPI = new UserApi();
export default UserAPI;