import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./../../Context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  // *======  context  ======! \\
  const { loginUser, token, setToken } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("please enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]/, "password must start with uppercase letter"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      const response = await loginUser(values);
      setIsLoading(false);
      if (response.msg == "done") {
        localStorage.setItem("token", `3b8ny__${response.token}`);
        setToken(response.token);
        navigate("/");
      }
    },
  });

  {
    /* fix 2 login try cause for setToken is async  */
  }

  useEffect(() => {
    token && navigate("/");
  }, [token]);

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
          className="col-md-4 d-flex flex-column justify-content-center px-5"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}

            <button
              type="submit"
              className="btn btn-main"
              disabled={!(formik.isValid && formik.dirty && !isloading)}
            >
              {isloading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <p>
              You don't have account yet ?
              <Link to="/signup" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
