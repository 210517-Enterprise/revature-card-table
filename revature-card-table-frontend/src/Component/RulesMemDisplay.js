import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import "../CSS/Home.css";
import Welcome1 from "../Images/RulesMem/Rmem (1).png";
import Welcome2 from "../Images/RulesMem/Rmem (2).png";
import Welcome3 from "../Images/RulesMem/Rmem (3).png";
import Welcome4 from "../Images/RulesMem/Rmem (4).png";
import Welcome5 from "../Images/RulesMem/Rmem (5).png";
import Welcome6 from "../Images/RulesMem/Rmem (6).png";
import Welcome7 from "../Images/RulesMem/Rmem (7).png";
import Welcome8 from "../Images/RulesMem/Rmem (8).png";
import Welcome9 from "../Images/RulesMem/Rmem (9).png";
import Welcome10 from "../Images/RulesMem/Rmem (10).png";
import Welcome11 from "../Images/RulesMem/Rmem (11).png";
import Welcome12 from "../Images/RulesMem/Rmem (12).png";
import CardBack from "../Images/cardBack.png";

export default function RulesMemDisplay() {
  const fadeDir = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  const fadeIn = {
    hidden: { opacity: 0},
    visible: { opacity: 1},
  };
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const [isFlipped2, setIsFlipped2] = useState(false);
  const handleFlip2 = () => {
    setIsFlipped2(!isFlipped2);
  };
  const [isFlipped3, setIsFlipped3] = useState(false);
  const handleFlip3 = () => {
    setIsFlipped3(!isFlipped3);
  };
  const [isFlipped4, setIsFlipped4] = useState(false);
  const handleFlip4 = () => {
    setIsFlipped4(!isFlipped4);
  };
  const [isFlipped5, setIsFlipped5] = useState(false);
  const handleFlip5 = () => {
    setIsFlipped5(!isFlipped5);
  };
  const [isFlipped6, setIsFlipped6] = useState(false);
  const handleFlip6 = () => {
    setIsFlipped6(!isFlipped6);
  };
  const [isFlipped7, setIsFlipped7] = useState(false);
  const handleFlip7 = () => {
    setIsFlipped7(!isFlipped7);
  };
  const [isFlipped8, setIsFlipped8] = useState(false);
  const handleFlip8 = () => {
    setIsFlipped8(!isFlipped8);
  };
  const [isFlipped9, setIsFlipped9] = useState(false);
  const handleFlip9 = () => {
    setIsFlipped9(!isFlipped9);
  };
  const [isFlipped10, setIsFlipped10] = useState(false);
  const handleFlip10 = () => {
    setIsFlipped10(!isFlipped10);
  };
  const [isFlipped11, setIsFlipped11] = useState(false);
  const handleFlip11 = () => {
    setIsFlipped11(!isFlipped11);
  };
  const [isFlipped12, setIsFlipped12] = useState(false);
  const handleFlip12 = () => {
    setIsFlipped12(!isFlipped12);
  };
  const handleAllFlip = () => {
    setIsFlipped(false);
    setIsFlipped2(false);
    setIsFlipped3(false);
    setIsFlipped4(false);
    setIsFlipped5(false);
    setIsFlipped6(false);
    setIsFlipped7(false);
    setIsFlipped8(false);
    setIsFlipped9(false);
    setIsFlipped10(false);
    setIsFlipped11(false);
    setIsFlipped12(false);
  };
  return (
    <>
      <table id="card-table" cellPadding="0" cell padding="0" margin="auto">
        <tr>
          <td>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <motion.img
                src={Welcome1}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
   
                onClick={handleAllFlip}
              ></motion.img>
              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
   
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip isFlipped={isFlipped2} flipDirection="horizontal">
              <motion.img
                src={Welcome2}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}

                onClick={handleAllFlip}
              ></motion.img>

              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
           
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip isFlipped={isFlipped3} flipDirection="horizontal">
              <motion.img
                src={Welcome3}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
        
                onClick={handleAllFlip}
              ></motion.img>
              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
             
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip isFlipped={isFlipped4} flipDirection="horizontal">
              <motion.img
                src={Welcome4}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip4}
                onClick={handleAllFlip}
              ></motion.img>
              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip4}
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip isFlipped={isFlipped5} flipDirection="horizontal">
              <motion.img
                src={Welcome5}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip5}
                onClick={handleAllFlip}
              ></motion.img>

              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip5}
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip
              isFlipped={isFlipped6}
              flipDirection="horizontal"
              // containerStyle={{ width: "226px", height: "314", margin: "0" }}
            >
              <motion.img
                src={Welcome6}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip6}
                onClick={handleAllFlip}
              ></motion.img>
              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip6}
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
        </tr>
        <tr>
          <td>
            <ReactCardFlip isFlipped={isFlipped7} flipDirection="horizontal">
              <motion.img
                src={Welcome7}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip7}
                onClick={handleAllFlip}
              ></motion.img>
              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip7}
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip isFlipped={isFlipped8} flipDirection="horizontal">
              <motion.img
                src={Welcome8}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip8}
                onClick={handleAllFlip}
              ></motion.img>

              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip8}
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip isFlipped={isFlipped9} flipDirection="horizontal">
              <motion.img
                src={Welcome9}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip9}
                onClick={handleAllFlip}
              ></motion.img>
              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                onHoverStart={handleFlip9}
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip isFlipped={isFlipped10} flipDirection="horizontal">
              <motion.img
                src={Welcome10}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
          
                onClick={handleAllFlip}
              ></motion.img>
              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
            
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip isFlipped={isFlipped11} flipDirection="horizontal">
              <motion.img
                src={Welcome11}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
               
                onClick={handleAllFlip}
              ></motion.img>

              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
            
                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
          <td>
            <ReactCardFlip
              isFlipped={isFlipped12}
              flipDirection="horizontal"
              // containerStyle={{ width: "226px", height: "314", margin: "0" }}
            >
              <motion.img
                src={Welcome12}
                variants={fadeDir}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
            
                onClick={handleAllFlip}
              ></motion.img>
              <motion.img
                src={CardBack}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}

                onClick={handleAllFlip}
              ></motion.img>
            </ReactCardFlip>
          </td>
        </tr>
      </table>
    </>
  );
}
