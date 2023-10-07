import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
export default function Footer() {
  return (
    <div className="footer" style={{marginTop:'10px'}}>
      <Section>
        <div className="brand container">
          <img src={logo} alt="logo" />
          <p>
          Welcome to The Fusion, where the vibrancy of Thai cuisine and the boldness of flame-grilled delights meet to create a mesmerizing culinary journey! Rooted in the rich traditions of Thai cooking and fused with the smoky, charred nuances of flame-grilled specialties
          </p>
          <ul>
            <li>
              <AiFillInstagram />
            </li>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <GrLinkedinOption />
            </li>
            <li>
              <BsTwitter />
            </li>
          </ul>
        </div>
        <div className="about container">
          <div className="title">
            <h3>About Us</h3>
          </div>
          <p>
          Our restaurant curates an enchanting blend of flavors and aromas that invite your senses to explore the unprecedented.
          </p>
        </div>
        <div className="contact container">
          <div className="title">
            <h3>Contact Us</h3>
          </div>
          <p>020 8301 3888</p>
          <p>info@thefusion-bexley.co.uk</p>
          <p>135 Blendon Rd, Bexley DA5 1BT</p>
          <p></p>
        </div>
      </Section>
      <LowerFooter className="lower__footer">
        <h6>
          Copyright &copy; 2023 <span>The Fusion</span>
        </h6>
      </LowerFooter>
    </div>
  );
}

const Section = styled.footer`
  margin: 0;
  background: linear-gradient(to right, #fc4958, #e85d04);
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10vw;
  padding: 4vw;
  p {
    font-size: 1rem;
    text-align:justify;
    line-height: 1rem;
    letter-spacing: 0rem;
  }
  ul {
    display: flex;
    list-style-type: none;
    gap: 4vw;
    margin-top: 2vw;
    li {
      padding: 0.8rem;
      border-radius: 2rem;
      background-color: white;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: black;
        svg {
          transform: scale(1.2);
        }
      }
      svg {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fc4958;
        font-size: 1.6rem;
        transition: 0.3s ease-in-out;
        &:hover {
        }
      }
    }
  }
  img {
    filter: brightness(0) invert(1);
    width: 10vw;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h3 {
      font-size: 2rem;
    }
  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    grid-template-columns: 1fr;
    .container {
      img {
        height: 4rem;
        width: 10rem;
      }
    }
  }
`;

const LowerFooter = styled.div`
  margin: 0;
  text-align: center;
  background-color: black;
  color: white;
  padding: 1rem;
  h6 {
    span {
      color: #fc4958;
      text-transform: uppercase;
    }
  }
  @media screen and (min-width: 260px) and (max-width: 450px) {
    h6 {
      span {
        display: block;
      }
    }
  }
`;
