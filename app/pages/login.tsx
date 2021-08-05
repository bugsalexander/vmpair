import { Button, Checkbox, Input, Select, Switch } from "antd";
import { Header } from "../components/Header";
import { Subheader } from "../components/Subheader";
import { NumberStat } from "../components/NumberStat";
import { LoginButton } from "../components/LoginButton";
import { usePreferences } from "../hooks/usePreferences";
import { LoginFields } from "../components/LoginFields";
import { SelectField } from "../components/SelectField";
import { useEffect, useReducer, useState } from "react";
import ApiClient from "../common/apiClient";
import { PreferencesApiResponse } from "../common/types";
import Link from "next/link";

export default function Login() {
  // form state
  const [email, setEmail] = useState("");

  useEffect(() => {
    ApiClient.getPreferences().then((data) => {
      if (!data.data) return;
      const prefs = data.data;
      setEmail(prefs.email);
    });
  }, []);
  return (
    <>
      <Header page="preferences" text={`Login`} />
      <div style={{
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
          <LoginButton>Login</LoginButton>
          <Link href="/" passHref>
              <div className="login__button">Login</div>
          </Link>
          <Link href="/login" passHref>
              <div className="index__link">Forgot password?</div>
          </Link>
          <hr
              style={{
                  borderTopColor : '#000000',
                  width: 400
              }}
          />
          <Link href="/login" passHref>
              <div className="index__link">Create new account</div>
          </Link>
        </div>
      </div>
    </>
  );
}
