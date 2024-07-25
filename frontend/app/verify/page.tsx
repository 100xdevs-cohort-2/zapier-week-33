"use client";
import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/Context";

export default function () {
  const { token } = useAuth();

  console.log("token", token);
  const [activationCode, setActivationCode] = useState("");
  const router = useRouter();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
          <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded w-96 h-80">
            <h1 className="font-semibold text-2xl text-center ">
              Verify your Account
            </h1>
            <div className="pt-8"></div>
            <Input
              onChange={(e) => {
                setActivationCode(e.target.value);
              }}
              label={""}
              type="password"
              placeholder="code"
            ></Input>

            <div className="pt-10">
              <PrimaryButton
                onClick={async () => {
                  const res = await axios.post(
                    `${BACKEND_URL}/api/v1/user/verify-user`,
                    {
                      token: token,
                      activationCode: activationCode,
                    }
                  );
                  router.push("/login");
                }}
                size="big"
              >
                Verify
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
