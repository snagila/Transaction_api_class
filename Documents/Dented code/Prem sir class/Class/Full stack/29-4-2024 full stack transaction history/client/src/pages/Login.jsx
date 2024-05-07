import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Footer } from "../components/Footer";
import { TopNav } from "../components/TopNav";
import { CustomInpute } from "../components/CustomInpute";
import { userLogin } from "../helpers/axiosHelper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedInUser, loggedInUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [resp, setResp] = useState({});

  useEffect(() => {
    loggedInUser?._id && navigate("/dashboard");
  }, [loggedInUser]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handOnSubmit = async (e) => {
    e.preventDefault();

    const result = await userLogin(user);
    setResp({ status: result?.status, message: result?.message });

    if (result?.status === "success") {
      setLoggedInUser(result.user);

      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/dashboard");
    }
  };

  const inputes = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
    },
  ];

  return (
    <div>
      <TopNav />
      <Container className="" fluid>
        <Row className="main">
          <Col
            md={6}
            className="bg-primary    p-5 d-flex justify-content-center align-items-center 
             "
          >
            <div className="shadow-lg rounded p-3 text-white">
              <h1>Welcome Back</h1>
              <p className="text-blue">
                Login to your account and take controll of your finance.
              </p>
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="shadow-lg p-5 rounded border w-75 mt-5 mb-5">
              <h2>Login now</h2>
              <hr />
              {resp?.message && (
                <Alert
                  variant={resp?.status === "success" ? "success" : "danger"}
                >
                  {resp.message}
                </Alert>
              )}

              <Form onSubmit={handOnSubmit}>
                {inputes.map((item, i) => (
                  <CustomInpute key={i} {...item} onChange={handleOnChange} />
                ))}

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login Now
                  </Button>
                </div>
              </Form>

              <p className="text-end mt-3">
                Are you new? <a href="/signup">Signup</a> Now
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Login;
