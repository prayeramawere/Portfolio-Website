import React from "react";
import { useState, useEffect } from "react";
import type { PrivateAdminData, AdminRes } from "../../lib/types";
import { useActionState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Admin() {
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
  console.log(token);

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
    console.log(data);
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const session = adminInfo;
  console.log(adminInfo);
  const adminData = adminInfo?.data;

  if (!adminInfo) {
    return (
      <>
        <div className="w-full flex justify-center items-center">
          <div className="flex w-100 bg-secondary justify-center items-center mt-[40%] md:mt-4 p-5">
            <form
              action={formAction}
              className="flex justify-center items-center flex-wrap gap-4"
            >
              <input
                type="text"
                name="unique_code1"
                id="unique_code"
                placeholder="unique_code"
                className="w-[80%] border-white border-2px rounded-md text-white  bg-background p-3"
              />

              <input
                type="text"
                name="unique_code2"
                id="unique_code2"
                placeholder="unique_code2"
                className="w-[80%] border-white border-2px rounded-md bg-background text-white p-3"
              />
              <button
                type="submit"
                className=" border-white border-2px rounded-md bg-background px-4 text-white py-3  "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
  if (session?.success == false) {
    return <h1 className="text-red-400"> {JSON.stringify(session.data)}</h1>;
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center flex-wrap gap-8">
          <div
            className="size-[300px] rounded-full bg-secondary mt-3 bg-cover bg-center"
            style={{ backgroundImage: `url(${adminData?.image})` }}
          ></div>
          <div>
            <header className="flex justify-center items-center flex-wrap w-[500px]">
              <h1 className="text-2xl font-bold text-secondary flex justify-center items-center w-full ">
                {adminData?.name}
              </h1>
              <span className="text-white-faint text-white">
                {adminData?.role}
              </span>
              <p className="p-3 m-2 text-white">{adminData?.bio}</p>
            </header>
          </div>
        </div>
        <section className="flex justify-center items-center text-white">
          <ul className=" grid grid-cols-1 gap-3 ">
            <Link to="/admin/blogs/edit">
              <li className="category-card">Blogs and Articles</li>
            </Link>
            <Link to="/admin/user/edit">
              <li className="category-card">User</li>
            </Link>
          </ul>
        </section>
      </div>
    </>
  );
}

export default Admin;
