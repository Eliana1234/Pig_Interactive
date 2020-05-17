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
import thoughtbubble from './thoughtbubble.png'
import Popup from './Popup'
import { TimelineLite, CSSPlugin, TextPlugin, RoughEase, Linear, Back, shuffle, Power0 } from "gsap/all";
gsap.registerPlugin(CSSPlugin)
gsap.registerPlugin(TextPlugin);



const iconsArray = [
	{ id: 1, src: pig, width: "250", height: "250", link: "https://aeon.co/essays/what-more-evidence-do-we-need-to-stop-killing-pigs-for-food", info: "Read, `What more evidence do we need to stop killing pigs for food?` in Aeon" },
  { id: 2, src: chimp, width: "250", height: "250", link: "https://www.nonhumanrights.org/?gclid=EAIaIQobChMIxPWu5Ius6QIVhQiICR34dAi0EAAYASAAEgK4JPD_BwE", info: "Learn about the Nonhuman Rights Project" },
	{ id: 3, src: dog, width: "250", height: "250", link:"https://animalstudiesrepository.org/cgi/viewcontent.cgi?article=1042&context=acwp_asie", info: "Study from the Nonhuman Rights Project that this website is based off"},
];

const questionsArr = [
{id: 1, text: "belongs to the genus ", pig: false, chimp: true, dog: false, explainer: ["genus Sus", "It's a Chimpanzee!", "genus Canis"]},
{id: 2, text: "the second to last sign in the Chinese zodiac", pig: false, chimp: false, dog: true, explainer: ["The Pig is the 12th sign", "Chimpanzee's are not represented in the zodiac, their relative The Monkey is the 9th sign", "It's The Dog!"]},
{id: 3, text: "in Denmark there are twice as many of this animal as people", pig: true, chimp: false, dog: false, explainer: ["It's a pig!", "Except for in zoo's there are few Chimpanzees in Denmark", "There are only 8.4 pet dogs for every 100 people in Denmark"]},
{id: 4, text: "engage in play as a form of social bonding ", pig: true, chimp: true, dog: true, explainer: ["Pigs engage in quite complex types of play that include social play and object play (Horback, 2014)", "Play is seen in primates (Bencke, 2015)",  "Play is seen in dogs (Bekoff, 2015)"]},
{id: 5, text: "perform well on mazes and spatial tests requiring location of objects", pig: true, chimp: true, dog: true, 
explainer: ["Pigs are highly competent at learning to navigate mazes and other spatial arrangements (e.g., de Jon et al., 2000; Siegford, Rucker & Zarella, 2008)",  "Dogs appear to develop novel spatial shortcuts based on their knowledge of previously used paths (Bensky, Gosling, & Sinn, 2013, for a review)",  "Chimpanzees and other nonhuman primates possess sophisticated spatial-navigational memory and learning capacities (Garber & Dolins, 2014)"]},
{id: 6, text: "can learn to discriminate between objects on the basis of their attributes ", pig: true, chimp: true, dog: true, explainer: ["Complex object discrimination has been demonstrated in pigs (Croney et al, 2003; Hemsworth, Verge, & Coleman, 1996; Tanida & Nagano, 1998.)", "Primates, are capable of rather complex [object] discriminations (Fagot, 2000; Matsuzawa, 2001; Zentall & Wasserman, 2006)", "Dogs are able to classify color photographs of natural stimuli such as other dogs and landscapes (Range, Aust, Steurer, & Huber, 2008)"]},
{id: 7, text: "able to manipulate a joystick to move on on screen cursor  ", pig: true, chimp: true, dog: true, explainer: ["Croney (1999) found that pigs were able to manipulate a modified joystick in order to move an on-screen cursor.", "Pigs may share this capacity with chimpanzees, who are able to distinguish a computer cursor controlled by themselves from motion caused by someone else (Kaneko & Tomonaga, 2011)", "Dogs, while able to perform the task, underperformed pigs (Croney, 2014).(Croney, 2014)"]},
{id: 8, text: "experience ‘emotional contagion’, or experience an emotion after sensing it in another ", pig: true, chimp: true, dog: true, explainer: ["Pigs can connect with the emotions of other pigs, including pigs who are responding emotionally in anticipation of future events (Reimert, Bolhuis, Kemp, & Rodenburg, 2013)", "Emotional contagion has been demonstrated in great apes  (Anderson, Myowa-Yamakoshi, & Matsuzawa, 2004; Palagi, Norscia & Demuru, 2014)", "Emotional contagion has been demonstrated in dogs (JolyMascheroni, Senju, & Shepherd, 2008)"]},
]


let numberCorrect = 0;
var h = window.innerHeight/3

class App extends React.Component {
	
	constructor(props){
		super(props);

    this.introTl = new gsap.timeline({paused: true})
    this.logoTl = new gsap.timeline({ paused:true });
    this.animalTl = new gsap.timeline({paused: true})
    this.researchTl = new gsap.timeline({paused: true})

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
    this.furtherInfo = [];
    this.footnote = [];
    this.box = [];
    this.link = [];
    this.research = [];
    this.italics = null;
    this.newIcons = [];
    this.newButtons = [];
    this.nav = null;
    this.left = null;
    this.right = null;
    this.top = null; 
    this.bottom = null;
    this.holding = null;
    
    
    this.state = {
      currentQuestion: "belongs to the genus ",
      currentIndx: 0,
      hidePan: false,
      selectedStart: false,
      furtherReading: false, 
    }
    this.handleClick = this.handleClick.bind(this);
    this.selectAnimal = this.selectAnimal.bind(this);
    this.showCorrect = this.showCorrect.bind(this);
    this.enterButton = this.enterButton.bind(this);
    this.leaveButton = this.leaveButton.bind(this);
	}

	// add instances to the timeline
	componentDidMount(){

    this.introTl.play()

    let color = "rgba(218,165,32, 1)"

    this.introTl
    .from(this.enterPig, 1, { top: -100, autoAlpha: 1 })
    .fromTo(this.top, 0.3, {
      width: 0, 
     background: color,
     immediateRender: false,
     autoRound: false,
     ease: Power0.easeNone,
    }, 
    {
    width: 370, 
    background: color
   }
)
.fromTo(this.right, 0.3, 
{
 height: 0, 
 background: color,
 immediateRender: false,
 autoRound: false,
 ease: Power0.easeNone,
}, 
{
 height: 150, 
 background: color
}
).fromTo(this.bottom, 0.3, 
{
 width: 0, 
 background: color,
 immediateRender: false,
 autoRound: false,
 ease: Power0.easeNone,
}, 
{
 width: 370, 
 background: color
}
).fromTo(this.left, 0.3, 
{
 height: 0, 
 background: color,
 immediateRender: false,
 autoRound: false,
 ease: Power0.easeNone,
}, 
{
 height: 150, 
 background: color
}
)
.to(this.enterPig, {backgroundColor: "rgb(255,215,0, 1)", color: "rgba(0,0,0, 0.3)" });


  this.logoTl
      .set(this.italics, {opacity: 0})
      .set(this.footnote, {hidden: true})
      .set(this.research, {hidden: true})
      .set(this.enterPig, {hidden: true})
      .to(this.pigBackground, 3, {autoAlpha: 0})
      .set(this.starterButton, {hidden: true})
      .set(this.content, { autoAlpha: 1 })// show content div
      .set(this.holding, { autoAlpha: 1 })// show content div
      .fromTo(this.cards[0], 0.5, {  fontWeight: "20px" , autoAlpha: 0 }, {autoAlpha: 1, fontWeight: "20px", y:h})
      

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
    .fromTo(this.cards[3], 0.5, { y: h, autoAlpha: 0 }, {autoAlpha: 1, y: h-1})

  //  this.logoTl.from(this.cards[2], { left: 100, autoAlpha: 0 }, "-=0.25")
   this.logoTl.staggerTo( this.cards, 2, {opacity: 0 }, 0.1, "-=0.25")
   .set(this.cards[3], {hidden: true})
   
   this.logoTl.to(this.cards[0], {y: "10%", opacity: 1, text: "Select all of the animals which the following statement applies to"})

      // .from(this.feature, 0.5, { scale: .5, autoAlpha: 0 }, "feature") // added 0.5 seconds after end of timeline
    // this.logoTl.from(this.description, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")
    .set(this.link, {hidden: "true"})
    .staggerFrom(this.icons, 0.2, { scale: 0, autoAlpha: 0 }, 0.1) //animate all icons with 0.1 second stagger
    .staggerFrom(this.buttons, 0.2, { scale: 0, autoAlpha: 0 }, 0.1) 
  
    // this.logoTl.from(this.question, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")
    this.logoTl.from(this.next, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")
    this.logoTl.from(this.show, 0.5, { left: 100, autoAlpha: 0 }, "-=0.25")

  this.logoTl.from(this.cards[2], { left: 100, autoAlpha: 0 })
  .set(this.italics, { opacity: 1})

    this.animalTl.set(this.content, { autoAlpha: 1 })// show content div
    .to(this.cards[2], {duration: 1, y: h+1,  text: {
      value: "Further reading"
    }, ease: "none"}, "+=2")
   
    this.animalTl.staggerTo(this.icons, 0.2, { hidden: false, y: h }, 0.25)
    .staggerTo(this.buttons, 0.2, { margin: "10px", hidden: false, backgroundColor: "#939799"}, 0.25)
    .staggerTo(this.furtherInfo, 0.2, {  color: "#000000" }, 0.25)
    // .set(this.icons, {opacity: 0.5})
    .staggerTo(this.link, 0.2, {hidden: false}, 0.25)
    // .staggerTo(this.box, 0.2, { backgroundColor: "#939799", opacity: 0.5 }, 0.25)
   
    this.researchTl.staggerTo(this.footnote, 0.2, { hidden: false }, 0.25)
    .staggerTo(this.research, 0.2, {hidden: false}, 0.25)

    // .staggerFrom(this.buttons, 0.2, { opacity: 1, scale: 0, autoAlpha: 0 }, 0.1)

  }

  enterButton(){
    gsap.to(this.enterPig, {backgroundColor: "rgba(0,0,0, 0.3)", color: "rgb(255,215,0, 1)"})

  }

  leaveButton(){
    gsap.to(this.enterPig, {backgroundColor: "rgb(255,215,0, 1)", color: "rgba(0,0,0, 0.3)" })
  }
  

  handleClick(){
    gsap.set(this.footnote, {hidden: true})
    gsap.set(this.research, {hidden: true})
    gsap.set(this.buttons,  {backgroundColor: "transparent"}); 
    gsap.set(this.icons[0], {attr:{src: pig}})
    gsap.set(this.icons[1], {attr:{src: chimp}})
    gsap.set(this.icons[2], {attr:{src: dog}})
    gsap.set(this.italics, {hidden: "true"})
    if (this.state.currentIndx < 7){
    const nextIndx = this.state.currentIndx + 1 
    this.setState({
      currentQuestion: questionsArr[nextIndx].text,
      currentIndx: nextIndx,
      hidePan: true
    }) 
    }
    else {
      this.setState({
        currentQuestion: `Correct: ${numberCorrect}/18, Answer: Pigs rock`,
      }) 
      gsap.set(this.footnote, {hidden: true})
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
  if (this.state.currentIndx < 9){
  if (index === 0){
    if (questionsArr[this.state.currentIndx].pig){
      numberCorrect++
      gsap.set(this.buttons[0], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[0], {attr:{src: pigcheck}})
      gsap.fromTo(this.icons[0], 0.3, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})
    }
    else {
      gsap.set(this.buttons[0], {backgroundColor:"rgba(192, 57, 43, 1)"})
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
      gsap.set(this.buttons[1], {backgroundColor:"rgba(192, 57, 43, 1)"})
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
      gsap.set(this.buttons[2], {backgroundColor:"rgba(192, 57, 43, 1)"})
      gsap.set(this.icons[2], {attr:{src: dogx}})
      gsap.fromTo(this.icons[2], 0.3, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})
    }
  }
}
  }

  showCorrect(){
    if (!this.state.hidePan){
     this.researchTl.play()
    }
    else {
      this.researchTl.restart()
    }
    // gsap.set(this.footnote, {hidden: false})
    // gsap.set(this.researchPig, {hidden: false})
    // gsap.set(this.researchDog, {hidden: false})
    // gsap.set(this.researchChimp, {hidden: false})
    if (questionsArr[this.state.currentIndx].pig){
      gsap.set(this.buttons[0], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[0], {attr:{src: pigcheck}})
    }
    else {
      gsap.set(this.buttons[0], {backgroundColor:"rgba(192, 57, 43, 1)"})
      gsap.set(this.icons[0], {attr:{src: pigx}})
    }
    if (questionsArr[this.state.currentIndx].chimp){
      gsap.set(this.buttons[1], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[1], {attr:{src: chimpcheck}})
    }
    else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      gsap.set(this.buttons[1], {backgroundColor:"rgba(192, 57, 43, 1)"})
      gsap.set(this.icons[1], {attr:{src: chimpx}})
    }
    if (questionsArr[this.state.currentIndx].dog){
      gsap.set(this.buttons[2], {backgroundColor: "#90ee90"})
      gsap.set(this.icons[2], {attr:{src: dogcheck}})
    }
    else {
      gsap.set(this.buttons[2], {backgroundColor:"rgba(192, 57, 43, 1)"})
      gsap.set(this.icons[2], {attr:{src: dogx}})
    }
    
  }

	render(){
    console.log('STATE', this.state)

    if (!this.state.hidePan){
		return  <Wrapper> <div className="container" style={{}}>
			<div className="row">
				<div className="col-12 mt-3">

					<div className="demoWrapper">

						<div className="bg"></div>

						<div className="content" style={{}}ref={ div => this.content = div }>
   
							<h1 ref={ h1 => this.cards[0] = h1 }>Pigs are really <span ref={span => this.cards[1] = span}>...</span></h1>
              <h2 ref={ h2 => this.cards[3] = h2 }>But maybe you're smarter?</h2>
              <div ref={div => this.holding = div} style={{}}>
              <h2 style={{display: "inline"}} ref={ h2 => this.cards[2] = h2 }>{this.state.currentQuestion}</h2><h2 style={{display: "inline", fontStyle: "italic"}} ref={h2 => this.italics = h2}>Pan</h2>
              <br></br>
              <br></br>
              </div>
  
  
              <button ref={button => this.next = button} onClick={() => this.handleClick()}>
                <h2 ref={h2 => this.questionText = h2} >Next Question</h2>
              </button>
              <button ref={button => this.show = button} onClick={() => this.showCorrect()}>
                <h2 >Show Answer</h2>
              </button>
      
              <div className="quiz">
              </div>
							<div className="info">

	
							</div>
							<div className="nav">
								{ iconsArray.map( (icon, index) => {
									const { src, width, height, info, link, id } = icon;
                  return (
                    <button key={index} style={{border: "transparent", backgroundColor: "transparent"}} ref={button => this.buttons[index] = button} onClick={() => this.selectAnimal(index)} >
                    <img
                    alt="animal_image"
										key={`icon-${index}`}
										src={src} width={width} height={height}
										ref={ img => this.icons[index] = img }
                  />
                  <p style={{color: "black", zIndex: "100", position: "absolute", left: "5%", top: "0", fontWeight: "bold", fontSize: "20px"}}ref={p => this.footnote[index] = p}><sup>{id}</sup></p>   
                  <div ref={div => this.box[index] = div} style={{backgroundColor: "transparent"}}>
                   <p style={{color: "transparent", zIndex: "100", position: "absolute", left: "0", top: "20%", fontWeight: "bold", maxWidth: "350px", wordBreak: "break-word", fontSize: "33px", justifyContent: "center", alignText: "center", fontFamily: "Hoefler Text"}}ref={p => this.furtherInfo[index] = p}>
                     <a ref={a => this.link[index] = a} style={{onHover: "#ffffff"}} href={link}>{info}</a>
                     </p>
                   </div>
                  </button>
                  )
								})}
							</div>
              <div ref={div => this.researchDiv = div}>
              { questionsArr[this.state.currentIndx].explainer.map((element, index) => {
                  // const { pigEx, chimpEx, dogEx } = icon;
                  const num = index + 1 
                  return (
                  <div style={{}} key={`research_${index}`}>
                    <br></br>
                    <div style={{maxWidth: "700px", margin: "0 auto"}} ref={div => this.research[index] = div}><sup>{num}</sup> {element}</div>
                    <br></br>
                </div>
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
						>  
            <img
            style={{backgroundSize: "cover", height: "100%", width: "100%", position: "absolute", top: "0", left: "0"}}
            alt="pig_background"
            src={pigbackground}
            ref={ img => this.pigBackground = img }
                />
          <div style={{backgroundColor: "green"}}>
          <p onMouseEnter={() => this.enterButton()} onMouseLeave={() => this.leaveButton()} className="enterPigInt" style={{padding: "10px", maxWidth: "350px", zIndex: "100", position: "absolute",
           left: "35%", top: "33%", fontSize: "55px", justifyContent: "center", alignText: "center", fontWeight: "200px", fontFamily: "'Quicksand', sans-serif"}}ref={p => this.enterPig = p}>
                 <span ref={span => this.left = span} style={{position: "absolute", left: "0", bottom: "0", height: "155px", width: "10px"}} className="left"></span>
                  <span ref={span => this.top = span} style={{position: "absolute", left: "0", top: "0", width: "370px", height: "10px"}} className="top"></span>
                  <span ref={span => this.right = span} style={{position: "absolute", right: "0", top: "0", height: "155px", width: "10px"}} className="right"></span>
                  <span ref={span => this.bottom = span} style={{position: "absolute", right: "0", bottom: "0", width: "370px", height: "10px"}} className="bottom"></span>
             enter pig interactive</p>
          </div>
          </button>
					</div>
				</div>
			</div>

    </div>;
    </Wrapper>
    }
    else {
      return <Wrapper> <div className="container">
			<div className="row">
				<div className="col-12 mt-3">

					<div className="demoWrapper">

						<div className="bg"></div>

						<div className="content" ref={ div => this.content = div }>
        
							<h1 ref={ h1 => this.cards[0] = h1 }>Pigs are really <span ref={span => this.cards[1] = span}>...</span></h1>
              <h2 ref={ h2 => this.cards[3] = h2 }>But maybe you're smarter?</h2>
              <div ref={div => this.holding = div} style={{}}>
              <h2 style={{display: "inline"}} ref={ h2 => this.cards[2] = h2 }>{this.state.currentQuestion}</h2>
              <br></br>
              <br></br>
              </div>
  
            
              <button ref={button => this.next = button} onClick={() => this.handleClick()}>
                <h2 ref={h2 => this.questionText = h2} >Next Question</h2>
              </button>
              <button ref={button => this.show = button} onClick={() => this.showCorrect()}>
                <h2 >Show Answer</h2>
              </button>
            
              <div className="quiz">
           
              </div>
							<div className="info">
					
	
							</div>
							<div className="nav">
								{ iconsArray.map( (icon, index) => {
									const { src, width, height, info, link, id } = icon;
                  return (
                    <button key={index} style={{border: "transparent", backgroundColor: "transparent"}} ref={button => this.buttons[index] = button} onClick={() => this.selectAnimal(index)} >
                    <img
                    alt="random_image"
										key={`icon-${index}`}
										src={src} width={width} height={height}
										ref={ img => this.icons[index] = img }
                  />
                  <p style={{color: "black", zIndex: "100", position: "absolute", left: "5%", top: "0", fontWeight: "bold", fontSize: "20px"}}ref={p => this.footnote[index] = p}><sup>{id}</sup></p>   
                  <div ref={div => this.box[index] = div} style={{backgroundColor: "transparent"}}>
                   <p style={{color: "transparent", zIndex: "100", position: "absolute", left: "0", top: "20%", fontWeight: "bold", maxWidth: "350px", wordBreak: "break-word", fontSize: "33px", justifyContent: "center", alignText: "center", fontFamily: "Hoefler Text"}}ref={p => this.furtherInfo[index] = p}>
                     <a ref={a => this.link[index] = a} style={{onHover: "#ffffff"}} href={link}>{info}</a>
                     </p>
                   </div>
                  </button>
                  )
								})}
							</div>
              <div ref={div => this.researchDiv = div}>
              { questionsArr[this.state.currentIndx].explainer.map((element, index) => {
                  const num = index + 1 
                  return (
                  <div key={`research_${index}`}>
                    <br></br>
                    <div style={{maxWidth: "700px", margin: "0 auto"}} ref={div => this.research[index] = div}><sup>{num}</sup> {element}</div>
                    <br></br>
                </div>
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
						>  
            <img
            style={{backgroundSize: "cover", height: "100%", width: "100%", position: "absolute", top: "0", left: "0"}}
            alt="pig_background"
            src={pigbackground}
            ref={ img => this.pigBackground = img }
                />
          <div style={{backgroundColor: "green"}}>
          <p onMouseEnter={() => this.enterButton()} onMouseLeave={() => this.leaveButton()} className="enterPigInt" style={{padding: "10px", maxWidth: "350px", zIndex: "100", position: "absolute",
           left: "35%", top: "33%", fontSize: "55px", justifyContent: "center", alignText: "center", fontWeight: "200px", fontFamily: "'Quicksand', sans-serif"}}ref={p => this.enterPig = p}>
                 <span ref={span => this.left = span} style={{position: "absolute", left: "0", bottom: "0", height: "155px", width: "10px"}} className="left"></span>
                  <span ref={span => this.top = span} style={{position: "absolute", left: "0", top: "0", width: "370px", height: "10px"}} className="top"></span>
                  <span ref={span => this.right = span} style={{position: "absolute", right: "0", top: "0", height: "155px", width: "10px"}} className="right"></span>
                  <span ref={span => this.bottom = span} style={{position: "absolute", right: "0", bottom: "0", width: "370px", height: "10px"}} className="bottom"></span>
             enter pig interactive</p>
          </div>
          </button>
					</div>
				</div>
			</div>
    </div>;
    </Wrapper>
    }
	}
}

export default App;



const Wrapper = styled.div`

.enterPigInt {
  background-color: rgba(0,0,0, 0.3);
  color: rgb(255,215,0, 1);
}

.enterPigInt:hover {
  background-color: rgba(0,0,0, 0.3);
  color: rgb(255,215,0, 1);
  // background-color: rgb(255,215,0, 1);;
  // color: rgba(0,0,0, 0.3);
}




`