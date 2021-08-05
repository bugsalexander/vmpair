import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import ApiClient from "../common/apiClient";
import {useRouter} from "next/dist/client/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <div>
      login page
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={() => {
        ApiClient.login(email);
        // router.push("/");
      }}>login</Button>
    </div>
  );
}
