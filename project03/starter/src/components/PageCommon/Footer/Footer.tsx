import Link from "next/link";
import React from "react";
import FooterForm from "./FooterForm";
import UpperFooter from "./UpperFooter";
import BottomFooter from "./BottomFooter";
import CopyRight from "./Copyright";

const Footer = () => {
  return (
    <footer>
      <div className="container ">
        <UpperFooter />
        <div className="hr"></div>
        <BottomFooter />
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;
