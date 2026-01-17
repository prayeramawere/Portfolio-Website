import React from "react";
import { useState, useEffect } from "react";
import type { PrivateAdminData, AdminRes } from "../../lib/types";
import { useActionState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminEdit() {
  const navigate = useNavigate();
  const [adminInfo, setAdmin] = useState<AdminRes | null>(null);
  const [resData, setData] = useState<postRes | null>();
  type postRes = {
    success: boolean;
    msg?: string;
    token?: string | any;
  };
  type formvalues = {
    unique_code1: string;
    unique_code2: string;
  };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    const formValues = {
      unique_code1: formData.get("unique_code1") as string,
      unique_code2: formData.get("unique_code2") as string,
    };
    try {
      const res = await fetch("http://localhost:5000/secure/12ew/admin/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      if (data.success == true) {
        navigate("/admin");
      }
      setData(data as postRes);
      localStorage.setItem("token", resData?.token);
    } catch (error) {
      console.log(error);
    }

    return { success: true, message: "", data: [] };
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    success: false,
    message: "unauthorised",
    data: [],
  });

  const token = localStorage.getItem("token");

  const updateAdmin = async (prev: any, formData: FormData) => {
    const formValues = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      bio: formData.get("bio") as string,
      story: formData.get("story") as string,
      skills: formData.get("skills") as string,
      image: formData.get("image") as string,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/secure/12ew/admin/update",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      console.log(await response.json());

      navigate("/admin/user/edit");
      return {
        success: true,
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        error: "error occured while",
      };
    }
  };

  const [appState, updateAction, updating] = useActionState(updateAdmin, {
    success: false,
    error: "",
  });

  const fetchAdmin = async () => {
    const response = await fetch("http://localhost:5000/secure/12ew/admin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(`problem while logging in ${response.status}`);
    const data = await response.json();
    setAdmin(data as AdminRes);
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const session = adminInfo;
  const adminData = adminInfo?.data;
  return (
    <>
      <div className="flex justify-center text-black items-center w-full">
        <div className="w-[95%] bg-element rounded-2xl h-[90vh] mt-10 flex r overflow-y-scroll no-scrollbar justify-center">
          <div className="w-[60%]">
            <form action={updateAction} className="w-full">
              <textarea
                name="name"
                defaultValue={adminData?.name}
                className="text-3xl text-black font-bold w-fit outline-none"
              ></textarea>
              <br />
              <textarea
                name="role"
                defaultValue={adminData?.role}
                className="text-lg text-black-faint font-bold w-fit outline-none"
              ></textarea>
              <br />
              <textarea
                name="bio"
                defaultValue={adminData?.bio}
                className="w-full p-4 outline-none"
              ></textarea>
              <br />
              <textarea
                name="story"
                defaultValue={adminData?.story}
                className="w-full h-fit outline-none"
              ></textarea>
              <br />
              <textarea
                name="image"
                defaultValue={adminData?.image}
                className="w-full h-fit outline-none"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                {updating ? "updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEdit;
