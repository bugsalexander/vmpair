import { Button, Checkbox, Input, Select, Switch } from "antd";
import { Header } from "../components/Header";
import { Subheader } from "../components/Subheader";
import { LoginButton } from "../components/LoginButton";
import { LoginFields } from "../components/LoginFields";
import { useState } from "react";
import ApiClient from "../common/apiClient";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export default function Login() {
  // form state
  const [email, setEmail] = useState("");
  const router = useRouter();
  return (
    <>
      <div style={{
        marginTop:70,
        display: "flex",
        flexDirection: 'column',
        alignItems:"center",
      }}>
        <div style={{
          width: 500,
          display: "flex",
          flexDirection: 'column',
          alignItems:"center"
        }}>
          <Subheader text='Welcome to VMpair' />
          <div className="login__text">
            Meet new coworkers over lunch!
          </div>
          <LoginFields onChange={setEmail} />
          <LoginButton onClick={() => {
            ApiClient.login(email);
            router.push("/");
          }}>Login</LoginButton>
          <Link href="/login" passHref>
              <div className="login__forgot_password">Forgot password?</div>
          </Link>
          <hr
              style={{
                  borderTopColor : '#000000',
                  width: 350
              }}
          />
          <Link href="/login" passHref>
              <div className="login__create_account">Create new account</div>
          </Link>
        </div>
      </div>
    </>
  );
}
