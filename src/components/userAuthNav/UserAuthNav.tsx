"use client"
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { signOut } from "next-auth/react";

const UserAuthNav = () => {
  return (
    <div>
        <button onClick={()=> signOut()} className={buttonVariants()}> Sign Out</button>
   
    </div>
  );
};

export default UserAuthNav;
