import http from "@/app/core/Http";
import {
  cookieJoinPath,
  generateCookiesNextServer,
} from "@/app/core/Http/http.utils";
import { cookies } from "next/headers";
import React from "react";

const ServerPage = async () => {
  const cookieStore = await cookies();
  const obj = generateCookiesNextServer(cookieStore);
  const res = await http.get("/v1/api/tasks/get-lists", {
    headers: { Cookie: obj },
  });
  
  return <div>ServerPage</div>;
};

export default ServerPage;
