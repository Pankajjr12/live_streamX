import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaGit,
  FaLinkedin,
} from "react-icons/fa";
import '../footer/style.scss'
import Wrapper from "../wrapper/Wrapper";
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate()
  return (
    <footer className="footer">
    <Wrapper>
        <ul className="menuItems">
           
            <li className="menuItem">About</li>
            <li className="menuItem">Blog</li>
      
        </ul>
        <div className="infoText">
            
        </div>
        <div className="socialIcons">
            <span className="icon">
                <FaFacebookF onClick={()=>navigate("")} />
            </span>
            <span className="icon">
                <FaInstagram />
            </span>
            <span className="icon" >
                <FaGit onClick={()=>navigate("https://github.com/Pankaj-jr-10")}/>
            </span>
            <span className="icon">
                <FaLinkedin />
            </span>
            
        </div>
        <h3>Pankaj Kumar</h3>
    </Wrapper>
</footer>
  )
}

export default Footer
