import React, { Fragment, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Loader,
  Container
} from "semantic-ui-react";

const useFormHandler = initialState => {
  const [values, setValues] = useState(initialState);
  const handleChange = useCallback(
    ({ target: { name, value } }) =>
      setValues(prevState => ({ ...prevState, [name]: value })),
    []
  );

  return {
    handleChange,
    values
  };
};

const Login = props => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormHandler({
    username: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/login';
    const formProps = { ...values };
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.post(url, formProps);
        console.log(result);
        localStorage.setItem("token", result.data.payload);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData().then(() => props.history.push("/bubblepage"));
  };

  return (
    <Container style={{ margin: 20 }}>
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <h1>Welcome to the Bubble App!</h1>
        </Header>
        {isLoading ? (
          <Fragment>
            <Loader active inline className="slow red" />
          </Fragment>
        ) : (
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={values.username}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />

              <Button type="submit" color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
        )}
        <Message>
          New to us? <Link to={"/signup"}>Sign Up</Link>
        </Message>
      </Grid.Column>
      {isError && <div>login error</div>}
    </Grid>
    </Container>
  );
};

export default Login;
