import Form from "../ui/Form";

function Login() {
  return (
    <>
      <div className="h-screen bg-[radial-gradient(circle,#ffe680_0%,#ffcc3397_50%,#ffb300a4_100%)]">
        <div className="absolute inset-7 bg-slate-200 opacity-70 "></div>
        <div className="flex h-[80vh] items-center justify-center relative z-10 ">
          <Form schemaType="login">
            <Form.Login />
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
