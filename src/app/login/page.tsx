import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <section className="flex items-center justify-center md:h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col">
        <div className="w-full rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Sign in to your account</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
