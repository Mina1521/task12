import { motion } from "framer-motion";
import { React, useEffect, useState } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

import "../App.css";

import femaleIdle from "../assets/img/female_idle.svg";
import female_paper from "../assets/img/female_paper.svg";
import female_rock from "../assets/img/female_rock.svg";
import female_scissors from "../assets/img/female_scissors.svg";
import male_paper from "../assets/img/male_paper.svg";
import male_rock from "../assets/img/male_rock.svg";
import male_scissors from "../assets/img/male_scissors.svg";
import maleIdle from "../assets/img/male_idle.svg";
import rock_icon from "../assets/img/rock_icon.svg";
import paper_icon from "../assets/img/paper_icon.svg";
import scissors_icon from "../assets/img/scissors_icon.svg";
import random_icon from "../assets/img/random_icon.svg";
import restart from "../assets/img/restart.svg";
import result_cpu from "../assets/img/result_cpu.svg";
import result_user from "../assets/img/result_user.svg";
import user_hp_avatar from "../assets/img/user_hp_avatar.svg";
import cpu_hp_avatar from "../assets/img/cpu_hp_avatar.svg";
import rock_sound from "../assets/sound/rock.mp3";
import paper_sound from "../assets/sound/slap.mp3";
import scissors_sound from "../assets/sound/scissors.mp3";
import start_sound from "../assets/sound/start.mp3";
import confetti_sound from "../assets/sound/confetti.mp3";
import lose_sound from "../assets/sound/lose.mp3";

// Declare Game function as const which determines app choices vs user choices and tracks points via state and returns game layout 
const Game = () => {
  const [userChoice, setUserChoice] = useState(maleIdle); // Set default image for user choice 
  const [computerChoice, setComputerChoice] = useState(femaleIdle); // Set default image for app choice
  const [userPoints, setUserPoints] = useState(0); // set start points for user as 0
  const [computerPoints, setComputerPoints] = useState(0); // set start points for app as 0
  const [maleImg, setMaleImg] = useState(maleIdle); // Set default image for user  
  const [femaleImg, setFemaleImg] = useState(femaleIdle); // Set default image for app

  const [result, setResult] = useState("Let's see who wins"); // Set default result 
  const [gameOver, setGameOver] = useState(false); // Set default end of game flag
  const [splash, setSplash] = useState(false); // Set default state of splash screen

  const choices = ["rock", "paper", "scissors"]; // Choices array storing possible choices

  /*
    Create audio elements for game sound effects
  */
  let rock_sfx = new Audio(rock_sound);
  let paper_sfx = new Audio(paper_sound);
  let scissors_sfx = new Audio(scissors_sound);
  let start_sfx = new Audio(start_sound);
  let confetti_sfx = new Audio(confetti_sound);
  let lose_sfx = new Audio(lose_sound);

  /*
    Handle click events when user selects specific options (ie. rock, paper, scissors)
  */
  const handleClick = (value) => {
    setUserChoice(value); // Set user choice state
    generateComputerChoice(); // Call generateComputerChoice to randomly choose one of the three options (ie. rock, paper, scissors). Returns "randomChoice"

    // If user has chosen "scissors"
    if (value === "scissors") {
      setMaleImg(male_scissors); // Set image to male_scissors
      // If cpu has chosen "rock"
      if (randomChoice === "rock") {
        rock_sfx.play(); // play rock sound effect
      } else if (randomChoice === "paper") { // If cpu has chosen "paper"
        scissors_sfx.play(); // play scissors sound effect
      }
      // If user has chosen "rock"
    } else if (value === "rock") {
      setMaleImg(male_rock); // Set image to male_rock
      // If cpu has chosen "paper"
      if (randomChoice === "paper") {
        paper_sfx.play(); // play paper sound effect
      } else if (randomChoice === "scissors") { // If cpu has chosen "scissors"
        rock_sfx.play(); // play rock sound effect
      }
    } else { // If user has chosen "paper"
      setMaleImg(male_paper); // Set image to male_paper
      // If cpu has chosen "scissors"
      if (randomChoice === "scissors") {
        scissors_sfx.play(); // play scissors sound effect
      } else if (randomChoice === "rock") { // If cpu has chosen "rock"
        paper_sfx.play(); // play paper sound effect
      }
    }
  };

  /*
    Handle click events when user selects random option. Function returns a random selection from the 3 available options (rock, paper, scissors)
  */
  const randomClick = () => {
    const randomClick = choices[Math.floor(Math.random() * choices.length)]; // Get randomly selected option
    setUserChoice(randomClick); // Set user choice state
    generateComputerChoice(); // Call generateComputerChoice to randomly choose one of the three options (ie. rock, paper, scissors). Returns "randomChoice"
    // If user choice is "scissors"
    if (randomClick === "scissors") { 
      setMaleImg(male_scissors);// Set image to male_scissors
      if (randomChoice === "rock") { // If cpu has chosen "rock"
        rock_sfx.play(); // play rock sound effect
      } else if (randomChoice === "paper") { // If cpu has chosen "rock"
        scissors_sfx.play(); // play scissors sound effect
      }
    } else if (randomClick === "rock") { // If user choice is "rock"
      setMaleImg(male_rock); // Set image to male_rock
      if (randomChoice === "paper") { // If cpu has chosen "paper"
        paper_sfx.play(); // play paper sound effect
      } else if (randomChoice === "scissors") { // If cpu has chosen "scissors"
        rock_sfx.play(); // play rock sound effect
      }
    } else { // If user choice is "paper"
      setMaleImg(male_paper); // Set image to male_paper
      if (randomChoice === "scissors") { // If cpu has chosen "scissors"
        scissors_sfx.play(); // play scissors sound effect
      } else if (randomChoice === "rock") { // If cpu has chosen "rock"
        paper_sfx.play(); // play paper sound effect
      }
    }
  };

  const randomChoice = choices[Math.floor(Math.random() * choices.length)]; // Get randomly selected option
  /*
    generateComputerChoice function returns a random selection from the 3 available options (rock, paper, scissors) for cpu player
  */
  const generateComputerChoice = () => {
    setComputerChoice(randomChoice); // Set cpu choice state
    // If cpu choice is "scissors"
    if (randomChoice === "scissors") {
      setFemaleImg(female_scissors); // Set image to female_scissors 
    } else if (randomChoice === "rock") { // If cpu choice is "rock"
      setFemaleImg(female_rock); // Set image to female_rock 
    } else { // If cpu choice is "paper"
      setFemaleImg(female_paper); // Set image to female_paper
    }
  };
  /*
    handleReset function returns resets the game
  */
  const handleReset = () => {
    start_sfx.play(); // play intro sound effect
    setGameOver(false); // set game over state to false
    setUserPoints(0); // set user points to 0
    setComputerPoints(0); //set computer points to 0
    setMaleImg(maleIdle); // set default user image
    setFemaleImg(femaleIdle); // set default computer image
  };

  // call useEffect function to pass call back function which determines winner of round and game and updates points after each round
  useEffect(() => {
    const comboMoves = userChoice + computerChoice; // join user and computer choices
    if (userPoints <= 4 && computerPoints <= 4) { // check if user and computer points are <= 4
      // Check combo moves if user has won
      if (
        comboMoves === "scissorspaper" ||
        comboMoves === "rockscissors" ||
        comboMoves === "paperrock"
      ) {
        const updatedUserPoints = userPoints + 1; // add 1 to user points
        setUserPoints(updatedUserPoints); //  set user points state

        // Check if user points are 5
        if (updatedUserPoints === 5) {
          setResult("You Win"); // Show user has won
          const gameOff = true; 
          // Play confetti animation
          setTimeout(() => {
            setGameOver(gameOff); // Set game over state to true
            confetti_sfx.play();
          }, 1000);
        }
      }
      // Check combo moves if computer has won
      if (
        comboMoves === "paperscissors" ||
        comboMoves === "scissorsrock" ||
        comboMoves === "rockpaper"
      ) {
        
        const updatedComputerPoints = computerPoints + 1; // add 1 to computer points
        setComputerPoints(updatedComputerPoints); //  set computer points state

        // Check if computer points are 5
        if (updatedComputerPoints === 5) {
          setResult("You Lose"); // Show user has lost
          const gameOff = true;
          // Play lose animation
          setTimeout(() => {
            setGameOver(gameOff); // Set game over state to true
            lose_sfx.play();
          }, 1000);
        }
      }
    }
  }, [computerChoice, userChoice]);

  // Build optionsArray Array which holds options information
const optionsArray = [
  {id:1, cName: 'rock_icon', callbackFn: () => handleClick(choices[0]), imgSrc: rock_icon},
  {id:2, cName: 'paper_icon', callbackFn: () => handleClick(choices[1]), imgSrc: paper_icon},
  {id:3, cName: 'scissors_icon', callbackFn: () => handleClick(choices[2]), imgSrc: scissors_icon},
  {id:4, cName: 'random_icon', callbackFn: () => randomClick(), imgSrc: random_icon}
];

// build and return content of app
  return (
    <>
      {splash && (
        <div className="App">
          {!gameOver && (
            <>
              <div className="game">
                <div className="top">
                  <motion.img
                    key={computerChoice}
                    src={femaleImg}
                    alt=""
                    transition={{
                      ease: "easeOut",
                      duration: 0.5,
                    }}
                    initial={{ y: -200 }}
                    animate={{ y: -50 }}
                  />{" "}
                </div>
                <div className="bottom">
                  <motion.img
                    src={maleImg}
                    key={userChoice}
                    alt=""
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    initial={{ y: 200 }}
                    animate={{ y: 50 }}
                  />
                </div>
                <div className="ui">
                  <div className="ui-box">
                    {/* Use options Array to create img elements */}
                  {optionsArray.map(data =>
                    <img
                      key = {data.id}
                      src={data.imgSrc}
                      alt=""
                      className={data.cName}
                      onClick={data.callbackFn}
                    />
                    )}
                  </div>
                </div>
              </div>
              <div className="score">
                {gameOver && <p>{result}</p>}
                <div className="hp-box-user">
                  <div className="hp-box-inner-user">
                    <progress
                      className="user-hp"
                      value={5 - computerPoints}
                      max="5"
                    ></progress>
                    <motion.img
                      src={user_hp_avatar}
                      className="user_hp_avatar"
                      alt=""
                      key={computerPoints}
                      animate={{
                        rotate: [0, 0, 20, 20, 0, 20, 20, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="hp-box-cpu">
                  <div className="hp-box-inner-user">
                    <progress
                      className="user-hp cpu"
                      value={5 - userPoints}
                      max="5"
                    ></progress>
                    <motion.img
                      src={cpu_hp_avatar}
                      className="cpu_hp_avatar"
                      alt=""
                      key={userPoints}
                      animate={{
                        rotate: [0, 0, 20, 20, 0, 20, 20, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {gameOver && (
            <motion.div
              className="result"
              animate={{ scale: 1.3 }}
              transition={{
                duration: 0.5,
              }}
            >
              {result === "You Win" && <ConfettiExplosion />}
              <motion.img
                src={result === "You Lose" ? result_user : result_cpu}
                alt=""
                animate={{
                  scale: [1, 1.5, 1.5, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                }}
                transition={{ duration: 1 }}
              />
              <p className="result-msg">{result}</p>
              <p className="result-score">
                {computerPoints} - {userPoints}
              </p>
              <motion.img
                src={restart}
                alt=""
                onClick={handleReset}
                animate={{ scale: [1, 1.2, 1.2, 1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          )}
        </div>
      )}
      {!splash && (
        <motion.div
          className="splash"
          initial={{ y: 1000 }}
          transition={{ duration: 1 }}
          animate={{ y: 0 }}
        >
          <motion.button
            onClick={() => {
              setSplash(true);
              start_sfx.play();
            }}
            animate={{
              rotate: [0, 0, 10, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 1 }}
          >
            Start The Game!!
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default Game;
