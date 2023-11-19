import NextAuth from "next-auth"

declare module "next-auth" {
  interface User{
    userName: String
  }
  interface Session {
    user: User &{
        userName: String
    }
    token:{
        userName:String
    }
  }
}