import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { UserContext } from "./../../Context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  // *======  context  ======! \\
  const { sendDataToSignUp } = useContext(UserContext);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("username is required")
      .min(3, "username must be more than 3 characters")
      .max(8, "username must be less than 8 characters"),

    email: Yup.string()
      .required("email is required")
      .email("please enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]/, "password must start with uppercase letter"),
    age: Yup.number()
      .required("age is required")
      .min(18, "Yopu must be at leat 18 Years old")
      .max(60, "You can't be more than 60"),
    phone: Yup.string()
      .required("phone number is required")
      .matches(/^01[0125][0-9]{8}/, "please enter a valid egyptian number"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: 24,
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await sendDataToSignUp(values);
      if (response.msg == "done") {
        navigate("/login");
      }
    },
  });

  // !======  Api Func. ======! \\

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
          className="col-md-4 d-flex flex-column justify-content-center px-5"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger">{formik.errors.name}</div>
            ) : (
              ""
            )}

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

            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.age && formik.touched.age ? (
              <div className="alert alert-danger">{formik.errors.age}</div>
            ) : (
              ""
            )}

            <input
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="phone"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger">{formik.errors.phone}</div>
            ) : (
              ""
            )}

            <button type="submit" className="btn btn-main">
              Create account
            </button>
            <p>
              Already have account ?
              <Link to="/login" className="text-decoration-underline ms-1">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
