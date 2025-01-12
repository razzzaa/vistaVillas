import Form from "../ui/Form";

Form;
function Login() {
  return (
    <>
      <div className="h-screen bg-[url('/background/openart-6119cc972d0e4c0c8442523d06a531eb_raw.jpg')]">
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
