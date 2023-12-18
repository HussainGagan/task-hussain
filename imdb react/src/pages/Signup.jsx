import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schemas";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "users");

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupSchema,
      onSubmit: async (values, actions) => {
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          console.log(res.user);
          // await addDoc(userCollectionRef, {
          //   uid: res.user.uid,
          //   name: values.name,
          //   email: values.email,
          // });
          await updateProfile(res.user, {
            displayName: values.name,
          });

          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            name: values.name,
            email: values.email,
          });
          actions.resetForm();
          navigate("/");
        } catch (err) {
          console.log(err.message);
        }
      },
    });
  console.log(errors);
  return (
    <main className="mx-auto w-full max-w-md p-4 flex flex-col items-center gap-4">
      <img src="imdb-logo.png" alt="imdb-logo" className="w-32" />
      <div className="w-full border border-[#ddd] rounded-md p-5 ">
        <h1 className="text-3xl mb-5">Create account</h1>
        <form
          action=""
          id="login-form"
          className="space-y-4 mb-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="First and last name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border-2 border-[#949494] rounded-[4px] p-1 text-[15px] ${
              errors.name && touched.name ? "input-error" : ""
            }`}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border-2 border-[#949494] rounded-[4px] p-1 text-[15px] ${
              errors.email && touched.email ? "input-error" : ""
            }`}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border-2 border-[#949494] rounded-[4px] p-1 text-[15px] ${
              errors.password && touched.password ? "input-error" : ""
            }`}
            required
          />
          <input
            type="password"
            placeholder="Re-enter your password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border-2 border-[#949494] rounded-[4px] p-1 text-[15px] ${
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }`}
            required
          />
          <button className="self-start bg-yellow/90 hover:bg-yellow px-4 py-2 w-full text-[15px] rounded-md">
            Create your IMDb account
          </button>
        </form>
        <div className="flex gap-1">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Signup;
