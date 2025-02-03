import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import arrow from "../../../assets/sideArrow.svg";
import { IoIosArrowDown } from "react-icons/io";
import { FAQs, JoinCommunity } from "./details";
import logo from "../../../assets/daoit.svg";
import help from "../../../assets/help.svg";
import more from "../../../assets/more.svg";
import user from "../../../assets/user.svg";

const Community = () => {
  const navigationLinks = [
    { to: "/resource-centre", icon: more, label: "Resource Centre" },
    { to: "/community", icon: user, label: "Join Community on socials" },
    { to: "/get-started", icon: logo, label: "Get started with DAOit" },
    { to: "/help-support", icon: help, label: "Help and support" },
  ];

  const infoCards = [
    {
      title: "Smart Contract Integration",
      description:
        "Discover an automated governance, proposal creation, voting contract, and decision-making processes via blockchain smart contracts.",
      linkTo: "/smart-contract-integration",
      linkLabel: "Learn more",
    },
    {
      title: "DAOit Impact on Sustainable Environmental Practices",
      description:
        "Blockchain-based climate management tools for tracking carbon emissions, Carbon Credits Trading, and educating users on sustainability practices.",
      linkTo: "/sustainable-practices",
      linkLabel: "Learn more",
    },
    {
      title: "DAOit Impact on Sustainable Environmental Practices",
      description:
        "Blockchain-based climate management tools for tracking carbon emissions, Carbon Credits Trading, and educating users on sustainability practices.",
      linkTo: "/sustainable-practices",
      linkLabel: "Learn more",
    }
  ];
  return (
    <div className=" flex flex-col items-center pt-8">
      <section className="flex justify-center py-10 items-center text-center flex-col w-[1180px]">
        <h1 className="text-2xl md:text-5xl font-bold text-[#102325]">
          Building Together
        </h1>
        <p className="mt-4 text-lg">
          Join the Movement for Transparent and Collaborative Education. <br />
          "Shape the future of learning through innovation and collective decision-making”.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/home">
            <button className="bg-gradient-to-r from-[#F8B51C] to-[#FEE539] hover:bg-yellow-600 text-black text-md py-3 rounded shadow-md shadow-[#F8B51C33] w-[200px] h-[54px]">
              Launch App
            </button>
          </Link>

          <button className="flex rounded-[8px] justify-center items-center w-[200px] h-[54px] bg-gradient-to-br from-[#3E4141] to-[#F8B91E] p-[1px]">
            <div className="flex items-center gap-4 justify-center bg-white h-full w-full rounded-[5px]">
              <p className="text-black">Explore Proposal</p>
              <ReactSVG src={arrow} />
            </div>
          </button>
        </div>
        <div className="mt-8">
          {/* <img
            src="/path/to/blockchain-image.png"
            alt="Blockchain graphic"
            className="mx-auto max-w-full"
          /> */}
        </div>
      </section>

      <JoinCommunity />

      <div className="max-w-screen-2xl w-full mx-auto flex flex-col items-center py-20 px-10 justify-center">
        <div className="flex flex-wrap gap-4 mb-10">
          {navigationLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between w-[48%] p-4 text-lg font-semibold bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100"
            >
              <div className=" flex items-center gap-2">
                <ReactSVG src={icon} width={100} height={100} /> {label}
              </div>
              <IoIosArrowDown />
            </Link>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center text-center gap-6 w-[460px]">
          {infoCards.map(({ title, description, linkTo, linkLabel }) => (
            <div key={title} className="flex flex-col w-full p-6 items-center">
              <h2 className="text-xl font-bold mb-4 w-[410px]">{title}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <Link
                to={linkTo}
                className="text-yellow-600 font-semibold border-b-[1px] w-fit border-[#F8B51C]"
              >
                {linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <FAQs />
    </div>
  );
};

export default Community;
