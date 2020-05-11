/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import './GSAPComponent.css'
import styled from 'styled-components'
import { gsap } from 'gsap';
import pig from './pig.png'
import chimp from './chimpanz.png'
import dog from './doggy.png'
import xmark from './x-mark.png'
import check from './check.png'
import pigcheck from './pigcheck.png'
import pigx from './pigx.png'
import chimpx from './chimpx.png'
import chimpcheck from './chimpcheck.png'
import dogcheck from './dogcheck.png'
import dogx from './dogx.png'
import pigbackground from './pigbackground.jpeg'
import Popup from './Popup'
import { TimelineLite, CSSPlugin, TextPlugin, RoughEase, Linear, Back, shuffle } from "gsap/all";
gsap.registerPlugin(CSSPlugin)
gsap.registerPlugin(TextPlugin);



const iconsArray = [
	{ src: pig, width: "250", height: "250", link: "https://aeon.co/essays/what-more-evidence-do-we-need-to-stop-killing-pigs-for-food", info: "Read, `What more evidence do we need to stop killing pigs for food?` in Aeon" },
  { src: chimp, width: "250", height: "250", link: "https://www.nonhumanrights.org/?gclid=EAIaIQobChMIxPWu5Ius6QIVhQiICR34dAi0EAAYASAAEgK4JPD_BwE", info: "Learn about the Nonhuman Rights Project" },
	{ src: dog, width: "250", height: "250", link:"https://www.seeker.com/iq-tests-suggest-pigs-are-smart-as-dogs-chimps-1769934406.html", info: "Research from the Nonhuman Rights Project that this website is based off of"},
];
const questionsArr = [
{id: 1, text: "can comprehend a simple symbolic language", pig: true, chimp: true, dog: false},
{id: 2, text: "have excellent long-term memories", pig: true, chimp: true, dog: true},
{id: 3, text: "are whizzes with mazes and other tests requiring location of objects", pig: true, chimp: true, dog: true},
{id: 4, text: "live in complex social communities where they keep track of individuals and learn from one another ", pig: true, chimp: true, dog: true},
{id: 5, text: "excellent at manipulating a joystick to move an on-screen cursor", pig: true, chimp: true, dog: false},
{id: 6, text: "can use a mirror to find hidden food", pig: true, chimp: true, dog: false},
{id: 7, text: "exhibit a form of empathy when witnessing the same emotion in another individual", pig: true, chimp: true, dog: true},
]

let numberCorrect = 0;

class App extends React.Component {
	
	constructor(props){
		super(props);

    this.logoTl = new gsap.timeline({ paused:true });
    this.animalTl = new gsap.timeline({paused: true})

		this.content = null;
		this.head = null;
		this.subhead = null;
    this.feature = null;
    this.reading = null;
    this.description = null;
    this.questionText = null;
    this.check = null;
    this.starterButton = null;
    this.enterPig = null;
    this.pigBackground = null;
    this.show = null;
    this.popup1 = null;
    this.cards = [this.head, this.word, this.subhead]
    this.icons = [];
    this.buttons = [];
    this.furtherInfo =[];
    this.box = [];
    this.link = [];
    this.newIcons = [];
    this.newButtons = [];
    this.nav = null;
    
    
    this.state = {
      currentQuestion: "But maybe you're smarter?",
      currentIndx: 0,
      selectedStart: false,
      furtherReading: false, 
    }
    this.handleClick = this.handleClick.bind(this);
    this.selectAnimal = this.selectAnimal.bind(this);
    this.showCorrect = this.showCorrect.bind(this);
	}

	// add instances to the timeline
	componentDidMount(){
    this.logoTl
      .set(this.cards[2], {opacity: 0})
      .set(this.enterPig, {hidden: true})
      .set(this.pigBackground, {hidden: true})
      .set(this.starterButton, {hidden: true})
      .set(this.content, { autoAlpha: 1 })// show content div
      .from(this.cards[0], 0.5, { left: 100, autoAlpha: 0 })

    this.logoTl.to(this.cards[1], {duration: 1,   text: {
        value: "Empathetic"
      }, ease: "none"})
      .to(this.cards[1], {duration: 1,   text: {
         value: "Aware"
      }
    , ease: "none"})
      .to(this.cards[1], {duration: 1,   text: {
        value: "Sensitive"
      }
    , ease: "none"})
      .to(this.cards[1], {duration: 1,   text: {
        value: "Smart"
      }
    , ease: "none"})

   this.logoTl.from(this.cards[2], 0.5, { left: 100, autoAlpha: 0 }) // added -0.25 seconds prior to end this.of timeline
    
   this.logoTl.staggerTo( this.cards, 2, {opacity: 0 }, 0.1, "-=0.25")

   this.logoTl.to(this.cards[0], {opacity: 1, text: "Select all of the animals which the following statement applies to"})

      // .from(this.feature, 0.5, { scale: .5, autoAlpha: 0 }, "feature") // added 0.5 seconds after end of timeline
    // this.logoTl.from(this.description, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")
    .set(this.link, {hidden: "true"})
    .staggerFrom(this.icons, 0.2, { scale: 0, autoAlpha: 0 }, 0.1) //animate all icons with 0.1 second stagger
    .staggerFrom(this.buttons, 0.2, { scale: 0, autoAlpha: 0 }, 0.1); 
  
    // this.logoTl.from(this.question, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")
    this.logoTl.from(this.next, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")
    this.logoTl.from(this.show, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")

    this.logoTl.set(this.cards[2], {opacity: 1, text: "can comprehend a simple symbolic language"}, "-=0.25")

    this.animalTl.set(this.content, { autoAlpha: 1 })// show content div
    .to(this.cards[2], {duration: 1,   text: {
      value: "Further reading"
    }, ease: "none"}, "+=2")
   
    this.animalTl.staggerTo(this.icons, 0.2, { hidden: false }, 0.25)
    .staggerTo(this.buttons, 0.2, { margin: "10px", hidden: false, backgroundColor: "#939799"}, 0.25)
    .staggerTo(this.furtherInfo, 0.2, { color: "#000000" }, 0.25)
    .set(this.icons, {opacity: 0.5})
    .staggerTo(this.link, 0.2, {hidden: false}, 0.25)
    // .staggerTo(this.box, 0.2, { backgroundColor: "#939799", opacity: 0.5 }, 0.25)
   


    // .staggerFrom(this.buttons, 0.2, { opacity: 1, scale: 0, autoAlpha: 0 }, 0.1)

  }
  

  handleClick(){
    gsap.set(this.buttons,  {backgroundColor: "transparent"}); 
    gsap.set(this.icons[0], {attr:{src: pig}})
    gsap.set(this.icons[1], {attr:{src: chimp}})
    gsap.set(this.icons[2], {attr:{src: dog}})
    if (this.state.currentIndx < 6){
    const nextIndx = this.state.currentIndx + 1 
    this.setState({
      currentQuestion: questionsArr[nextIndx].text,
      currentIndx: nextIndx
    }) 
    }
    else {
      this.setState({
        currentQuestion: `Correct: ${numberCorrect}/18, Answer: Pigs rock`,
      }) 
      gsap.set(this.buttons, {hidden: true})
      gsap.set(this.icons, {hidden: true})
      gsap.set(this.show, {hidden: true})
      gsap.set(this.next, {hidden: true})
      gsap.set(this.cards[0], {hidden: true})
      let last = iconsArray.pop()
      iconsArray.unshift(last)
      iconsArray.forEach(element => {
        element.width = "350px"
        element.height = "350px"
      })
      this.animalTl.play()
    }
  }


  selectAnimal(index){
  // var rough = new gsap.RoughEase({strength:3, points:50, taper:"both", randomize:false});
  if (index === 0){
    if (questionsArr[this.state.currentIndx].pig){
      numberCorrect++
      gsap.set(this.buttons[0], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[0], {attr:{src: pigcheck}})
      gsap.fromTo(this.icons[0], 0.3, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})
    }
    else {
      gsap.set(this.buttons[0], {backgroundColor:"#FF0000"})
      gsap.set(this.icons[0], {attr:{src: pigx}})
      gsap.fromTo(this.icons[0], 0.3, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})
    }
    }
  else if (index === 1){
    if (questionsArr[this.state.currentIndx].chimp){
      numberCorrect++
      gsap.set(this.buttons[1], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[1], {attr:{src: chimpcheck}})
      gsap.fromTo(this.icons[1], 0.3, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})
    }
    else {
      gsap.set(this.buttons[1], {backgroundColor:"#FF0000"})
      gsap.set(this.icons[1], {attr:{src: chimpx}})
      gsap.fromTo(this.icons[1], 0.3, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})
    }
  }
  else {
    if (questionsArr[this.state.currentIndx].dog){
      numberCorrect++
      gsap.set(this.buttons[2], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[2], {attr:{src: dogcheck}})
      gsap.fromTo(this.icons[2], 0.3, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})
    }
    else {
      gsap.set(this.buttons[2], {backgroundColor:"#FF0000"})
      gsap.set(this.icons[2], {attr:{src: dogx}})
      gsap.fromTo(this.icons[2], 0.3, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})
    }
  }
  }

  showCorrect(){
    if (questionsArr[this.state.currentIndx].pig){
      gsap.set(this.buttons[0], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[0], {attr:{src: pigcheck}})
    }
    else {
      gsap.set(this.buttons[0], {backgroundColor:"#FF0000"})
      gsap.set(this.icons[0], {attr:{src: pigx}})
    }
    if (questionsArr[this.state.currentIndx].chimp){
      gsap.set(this.buttons[1], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[1], {attr:{src: chimpcheck}})
    }
    else {
      gsap.set(this.buttons[1], {backgroundColor:"#FF0000"})
      gsap.set(this.icons[1], {attr:{src: chimpx}})
    }
    if (questionsArr[this.state.currentIndx].dog){
      gsap.set(this.buttons[2], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[2], {attr:{src: dogcheck}})
    }
    else {
      gsap.set(this.buttons[2], {backgroundColor:"#FF0000"})
      gsap.set(this.icons[2], {attr:{src: dogx}})
    }
    
  }

	render(){
    console.log('STATE', this.state)
    if (!this.state.furtherReading){
		return <div className="container">
			<div className="row">
				<div className="col-12 mt-3">

					{/* <h3 className="text-center">Timeline Sequence</h3>
					<p className="lead">Uses the <strong>ref</strong> callback to create references for a group of elements in the app. Then using the <strong>componentDidMount</strong> method, creates a timeline sequence that can be controlled using the buttons.</p>
					 */}
					{/* DEMO WRAPPER */}
					<div className="demoWrapper">

						<div className="bg"></div>

						<div className="content" ref={ div => this.content = div }>
              {/* <h1 className="description" ref={ h1 => this.description = h1 }>
                  Select all of the animals which the following statement applies to
                </h1> */}
							<h1 ref={ h1 => this.cards[0] = h1 }>Pigs are really <span ref={span => this.cards[1] = span}>...</span></h1>
              <h2 ref={ h2 => this.cards[2] = h2 }>{this.state.currentQuestion}</h2>
              {/* <h2 className="quiz" ref={h2 => this.question = h2}>{this.state.currentQuestion}</h2> */}
              <button ref={button => this.next = button} onClick={() => this.handleClick()}>
                <h2 ref={h2 => this.questionText = h2} >Next Question</h2>
              </button>
              <button ref={button => this.show = button} onClick={() => this.showCorrect()}>
                <h2 >Show Answer</h2>
              </button>
              {/* <br></br> */}
              {/* <button style={{opacity: 0}} ref={button => this.reading = button} onClick={() => this.furtherReading()}>
                <h2 >Further Reading</h2>
              </button> */}
              <div className="quiz">
                {/* <p ref={p => this.question = p}>{this.state.currentQuestion}</p> */}
              </div>
							<div className="info">
								{/* <img
                  src="https://www.greensock.com/_img/codepen/feature_robust.png"
                  alt="random_image"
									width="240"
									height="151"
									className="feature"
									ref={ img => this.feature = img } 
								/> */}
	
							</div>
							<div className="nav">
								{ iconsArray.map( (icon, index) => {
									const { src, width, height, info, link } = icon;
                  return (
                    <button key={index} style={{backgroundColor: "transparent"}} ref={button => this.buttons[index] = button} onClick={() => this.selectAnimal(index)} >
                    <img
                    // style={{position: "relative"}}
                    alt="random_image"
										key={`icon-${index}`}
										src={src} width={width} height={height}
										ref={ img => this.icons[index] = img }
                  />
                  <div ref={div => this.box[index] = div} style={{backgroundColor: "transparent"}}>
                   <p style={{color: "transparent", zIndex: "100", position: "absolute", left: "0", top: "20%", fontWeight: "bold", maxWidth: "350px", wordBreak: "break-word", fontSize: "33px", justifyContent: "center", alignText: "center", fontFamily: "Hoefler Text"}}ref={p => this.furtherInfo[index] = p}>
                     <a ref={a => this.link[index] = a} style={{onHover: "#ffffff"}} href={link}>{info}</a>
                     </p>
                   </div>
                  </button>
                  )
								})}
							</div>
						</div>
					</div>

					{/* BUTTONS */}
					<div className="my-3 btn-group">
						<button
              ref={button => this.starterButton = button}
							className="btn gsap-btn"
							onClick={() => this.logoTl.play()}
						>  <img
            style={{backgroundSize: "cover", height: "100%", width: "100%", position: "absolute", top: "0", left: "0"}}
            alt="pig_background"
            src={pigbackground}
            ref={ img => this.pigBackground = img }
                />
          <p style={{color: "black", zIndex: "100", position: "absolute", left: "33%", top: "25%", fontWeight: "bold", fontSize: "60px", justifyContent: "center", alignText: "center", fontFamily: "Hoefler Text"}}ref={p => this.enterPig = p}>Enter Pig Interactive</p>
          </button>
						{/* <button
							className="btn gsap-btn"
							onClick={() => this.logoTl.pause()}
						>Pause</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTl.reverse()}
						>Reverse</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTl.restart()}
						>Restart</button> */}
					</div>
				</div>
			</div>
    </div>;
    }
    else {
      return <div className="container">
			<div className="row">
				<div className="col-12 mt-3">

					{/* <h3 className="text-center">Timeline Sequence</h3>
					<p className="lead">Uses the <strong>ref</strong> callback to create references for a group of elements in the app. Then using the <strong>componentDidMount</strong> method, creates a timeline sequence that can be controlled using the buttons.</p>
					 */}
					{/* DEMO WRAPPER */}
					<div className="demoWrapper">

						<div className="bg"></div>

						<div className="content" ref={ div => this.content = div }>
              {/* <h1 className="description" ref={ h1 => this.description = h1 }>
                  Select all of the animals which the following statement applies to
                </h1> */}
							<h1 ref={ h1 => this.cards[0] = h1 }>Pigs are really <span ref={span => this.cards[1] = span}>...</span></h1>
              <h2 ref={ h2 => this.cards[2] = h2 }>{this.state.currentQuestion}</h2>

  
              {/* <h2 className="quiz" ref={h2 => this.question = h2}>{this.state.currentQuestion}</h2> */}
              {/* <button ref={button => this.next = button} onClick={() => this.handleClick()}>
                <h2 ref={h2 => this.questionText = h2} >Next Question</h2>
              </button>
              <button ref={button => this.show = button} onClick={() => this.showCorrect()}>
                <h2 >Show Answer</h2>
              </button> */}
              {/* <br></br> */}
              {/* <button style={{opacity: 0}} ref={button => this.reading = button} onClick={() => this.furtherReading()}>
                <h2 >Further Reading</h2>
              </button> */}
              <div className="quiz">
                {/* <p ref={p => this.question = p}>{this.state.currentQuestion}</p> */}
              </div>
							<div className="info">
								{/* <img
                  src="https://www.greensock.com/_img/codepen/feature_robust.png"
                  alt="random_image"
									width="240"
									height="151"
									className="feature"
									ref={ img => this.feature = img } 
								/> */}
	
							</div>
							<div ref={div => this.nav = div} className="nav">
								{ iconsArray.map( (icon, index) => {
									const { src, width, height } = icon;
                  return (
              <button key={index} style={{display: "flex", flexDirection: "column", border: "transparent", backgroundColor: "transparent"}} ref={button => this.newButtons[index] = button} >
                    <img
                    alt="random_image"
										key={`icon-${index}`}
										src={src} width={width} height={height}
										ref={ img => this.newIcons[index] = img }
                  />
              </button>
                  )
								})}
							</div>
						</div>
					</div>

					{/* BUTTONS */}
					<div className="my-3 btn-group">
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTl.play()}
						>
           <img
              alt="pig_background"
							src={pigbackground} width="800px" height="600px"
							ref={ img => this.pigBackground = img }
                  />
            <p style={{color: "black", zIndex: "100", position: "absolute", left: "0", top: "20%", fontWeight: "bold", fontSize: "60px", justifyContent: "center", alignText: "center", fontFamily: "Hoefler Text"}}ref={p => this.enterPig = p}>Enter Pig Interactive</p>
            </button>
						{/* <button
							className="btn gsap-btn"
							onClick={() => this.logoTl.pause()}
						>Pause</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTl.reverse()}
						>Reverse</button>
						<button
							className="btn gsap-btn"
							onClick={() => this.logoTl.restart()}
						>Restart</button> */}
					</div>
				</div>
			</div>
    </div>;

    }
	}
}

export default App;



const Wrapper = styled.div`


`