import React from 'react';
import styled, {keyframes} from 'styled-components';
import {Link} from 'react-router-dom';

const floating = keyframes`
  from { transform: translateY(0px); }
  65%  { transform: translateY(15px); }
  to   { transform: translateY(-0px); }
`;

const Container = styled.div`
  height: 100vh;
  margin: 0;
  background-image: url('https://assets.codepen.io/1538474/star.svg'),
    linear-gradient(to bottom, #05007a, #4d007d);
  background-attachment: fixed;
  overflow: hidden;
  position: relative;
`;

const Mars = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  height: 27vmin;
  background: url('https://assets.codepen.io/1538474/mars.svg') no-repeat bottom
    center;
  background-size: cover;
`;

const Logo404 = styled.img`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 16vmin;
  width: 30vmin;

  @media (max-width: 480px) and (min-width: 320px) {
    top: 45vmin;
  }
`;

const Meteor = styled.img`
  position: absolute;
  right: 2vmin;
  top: 16vmin;
`;

const Title = styled.p`
  color: white;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  text-align: center;
  font-size: 5vmin;
  margin-top: 31vmin;

  @media (max-width: 480px) and (min-width: 320px) {
    margin-top: 65vmin;
  }
`;

const Subtitle = styled.p`
  color: white;
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  text-align: center;
  font-size: 3.5vmin;
  margin-top: -1vmin;
  margin-bottom: 9vmin;
`;

const BtnBack = styled.a`
  border: 1px solid white;
  color: white;
  height: 5vmin;
  padding: 12px;
  font-family: 'Nunito', sans-serif;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background: white;
    color: #4d007d;
  }

  @media (max-width: 480px) and (min-width: 320px) {
    font-size: 3.5vmin;
  }
`;

const Astronaut = styled.img`
  position: absolute;
  top: 18vmin;
  left: 10vmin;
  height: 30vmin;
  animation: ${floating} 3s infinite ease-in-out;

  @media (max-width: 480px) and (min-width: 320px) {
    top: 2vmin;
  }
`;

const Spaceship = styled.img`
  position: absolute;
  bottom: 15vmin;
  right: 24vmin;

  @media (max-width: 480px) and (min-width: 320px) {
    width: 45vmin;
    bottom: 18vmin;
  }
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Logo404 src="https://assets.codepen.io/1538474/404.svg" />
      <Meteor src="https://assets.codepen.io/1538474/meteor.svg" />
      <Title>Oh no!!</Title>
      <Subtitle>
        You’re either misspelling the URL <br /> or requesting a page that's no
        longer here.
      </Subtitle>
      <div align="center">
        <Link to={'/'}>
          <BtnBack href="#">Back to Homepage</BtnBack>
        </Link>
      </div>
      <Astronaut src="https://assets.codepen.io/1538474/astronaut.svg" />
      <Spaceship src="https://assets.codepen.io/1538474/spaceship.svg" />
    </Container>
  );
};

export default NotFoundPage;
