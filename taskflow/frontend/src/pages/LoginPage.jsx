import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
    const { loginUser } = useAuth();
  
  const onSubmit = (data) => {
    loginUser(data)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-white">Welcome Back</h1>
          <p className="text-sm text-slate-400">
            Enter your credentials to continue
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 transition"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 transition"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-xs text-center text-slate-500">
          Not registered
          <span className="text-indigo-400 hover:underline cursor-pointer" onClick={() => navigate('/register')}>
            Sign Up
          </span>
          .
        </p>

      </div>
    </div>
  );
}

export default LoginPage;
