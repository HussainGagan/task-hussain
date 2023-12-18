import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// import { } from "../schemas";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      // const user = {
      // name: result.user.displayName,
      // email: result.user.email,
      // };
      const res2 = await getDoc(doc(db, "users", res.user.uid));
      if (!res2.exists()) {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
        });
      }
      navigate("/");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        actions.resetForm();
        // setUser(user.user);
        navigate("/");
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  return (
    <main className="mx-auto w-full max-w-md p-4 flex flex-col items-center gap-4">
      <img src="imdb-logo.png" alt="imdb-logo" className="w-32" />
      <div className="w-full border border-[#ddd] rounded-md p-5 ">
        <h1 className="text-3xl mb-5">Sign in</h1>
        <form
          action=""
          id="login-form"
          className="space-y-4 mb-6"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border-2 border-[#949494] rounded-[4px] p-1 text-[15px]`}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border-2 border-[#949494] rounded-[4px] p-1 text-[15px]`}
            required
          />
          <button className="self-start bg-yellow/90 hover:bg-yellow px-4 py-2 w-full text-[15px] rounded-md">
            Log in
          </button>
        </form>
        <hr className="my-6 border-t border-gray-300" />
        <button
          onClick={signInWithGoogle}
          className="bg-white text-gray-800 py-2 px-4 border border-gray-300 rounded-md flex items-center gap-3 w-full mb-6 hover:bg-gray-100 "
        >
          <img src="google-color-icon.svg" alt="google icon" className="w-6" />
          <p className="font-bold text-base">Sign In with Google</p>
        </button>

        <div className="flex gap-1 items-center">
          <p>New to IMDb?</p>
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
