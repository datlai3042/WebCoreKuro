import { OK } from "~/core/http"
import AuthService from "~/services/authentication"

class AuthController {
  static async register() {
    return new OK({ metadata: await AuthService.register() })
  }

  static async login() {
    return new OK({ metadata: await AuthService.login() })
  }

  static async logout() {
    return new OK({ metadata: await AuthService.logout() })
  }

  static async refreshToken() {
    return new OK({ metadata: await AuthService.refreshToken() })
  }
}



export default AuthController