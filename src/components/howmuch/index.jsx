import React, { useState, useRef, useEffect } from 'react';
import { Element, ScrollElement, scroller, Link, Button, Events, scrollSpy, animateScroll } from 'react-scroll';
import { Waypoint } from 'react-waypoint';

// 1) Here’s a minimal version of the possible data structures from Angular:
const projectOptions = [
    { val: 'a1', label: 'App Design', low: 8000, high: 200000 },
    { val: 'a2', label: 'Web Design', low: 5000, high: 500000 },
    { val: 'a3', label: 'Brand Design', low: 2500, high: 100000 },
    { val: 'a4', label: 'Print Design', low: 300, high: 100000 },
    // ...
];
const clientOptions = [
    { val: 'a1', label: 'Private Client', sub: 'Paying from personal money', low: 200, high: 10000 },
    { val: 'a2', label: 'SMB', sub: 'Small/Medium sized business', low: 3000, high: 250000 },
    { val: 'a3', label: 'Large Corp', sub: 'Big budgets, enterprise org', low: 5000, high: 1000000 },
    // ...
];
const interestOptions = [
    { val: 'a1', label: 'Boring', factor: [1.7, 1.3] },
    { val: 'a2', label: 'Meh', factor: [1.5, 1.1] },
    { val: 'a3', label: 'Awesome Project', factor: [1.2, 1.0] },
    { val: 'a4', label: 'Dream Project', factor: [1.1, 1.0] },
];
const afterOptions = [
    { val: 'a1', label: 'I will hate myself a little', factor: [1.7, 1.3] },
    { val: 'a2', label: 'Nothing changes', factor: [1.5, 1.1] },
    { val: 'a3', label: 'Will look good in portfolio', factor: [1.2, 1.0] },
    { val: 'a4', label: 'Might be life-changing', factor: [1.1, 1.0] },
];

// 2) The pure function for calculating:
function computePricing({ hourRate, hours, project, client, interest, after }) {
    // Convert to number just to be sure
    const hr = parseFloat(hourRate) || 0;
    const hrs = parseFloat(hours) || 0;
    const breakeven = hr * hrs;

    if (!project || !client || !interest || !after) {
        // We can’t compute if something is missing
        return { breakeven: 0, firstPrice: 0, lastPrice: 0 };
    }

    const [iHigh, iLow] = interest.factor;
    const [aHigh, aLow] = after.factor;

    const firstPrice = Math.round(breakeven * iHigh * aHigh);
    const lastPrice = Math.round(breakeven * iLow * aLow);

    return {
        breakeven,
        firstPrice,
        lastPrice,
    };
}

const COLOR_PRIMARY = '#FFC700';
const COLOR_HEADING = '#3a3a3a';

const stepstyles = {
    container: {
        width: '100vw',
        // margin: '40px auto',
        textAlign: 'center',
        fontFamily: 'Helvetica, Arial, sans-serif',
        color: '#4a4a4a',
        // padding: '0 1rem',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

    },
    heading: {
        fontSize: '2.2rem',
        color: COLOR_HEADING,
        margin: '1rem 0 0.5rem',
        fontWeight: 700,
    },
    divider: {
        width: 80,
        height: 3,
        backgroundColor: COLOR_PRIMARY,
        margin: '1rem auto 2rem',
    },
    button: {
        backgroundColor: COLOR_PRIMARY,
        color: '#000',
        border: 'none',
        borderRadius: 4,
        fontSize: '1rem',
        fontWeight: 700,
        padding: '0.75rem 2rem',
        cursor: 'pointer',
        margin: '1rem 0.5rem 0',
        textTransform: 'uppercase',
    },
};

const Step = ({ number, title, children, onNext, onBack, nextLabel = 'Next', backLabel = 'Back', setStep, isNextDisabled }) => {
    return (
        <Element name={`step-${number}`} >
            <Waypoint
                bottomOffset={"100px"}
                onEnter={() => {
                    // console.log('onEnter', number);
                    setStep(number)
                }}>
                <div style={stepstyles.container}>
                    {title && <h1 style={styles.heading}>{title}</h1>}
                    <div style={styles.divider}></div>
                    {children}
                    <div>
                        {onBack && (
                            <button style={stepstyles.button} onClick={onBack}>
                                {backLabel}
                            </button>
                        )}
                        {onNext && (
                            <button style={{ ...stepstyles.button, opacity: isNextDisabled ? 0.5 : 1, cursor: isNextDisabled ? 'not-allowed' : 'pointer' }} onClick={()=>{
                                // step must be this step
                                // setStep(number);
                                onNext(number);

                            }} disabled={isNextDisabled}>
                                {nextLabel}
                            </button>
                        )}
                    </div>
                </div>
            </Waypoint>
        </Element>
    );
};

const COLOR_INACTIVE = '#cccccc';

const styles = {
    scrollContainer: {
        overflow: 'auto',
        height: '100vh',
        position: 'relative',
        scrollBehavior: 'smooth',
    },
    stepsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.8s ease-in-out',
    },
    radioOption: {
        display: 'inline-block',
        cursor: 'pointer',
        margin: '0.5rem',
    },
    radioLabel: {
        padding: '0.75rem 1.5rem',
        borderRadius: 4,
        border: '2px solid transparent',
        fontWeight: 700,
        fontSize: '1rem',
        transition: 'all 0.2s ease',
    },
    selectedOption: {
        backgroundColor: '#000',
        color: COLOR_PRIMARY,
        borderColor: COLOR_PRIMARY,
    },
    unselectedOption: {
        backgroundColor: 'transparent',
        color: COLOR_INACTIVE,
    },
    button: {
        backgroundColor: COLOR_PRIMARY,
        color: '#000',
        border: 'none',
        borderRadius: 4,
        fontSize: '1rem',
        fontWeight: 700,
        padding: '0.75rem 2rem',
        cursor: 'pointer',
        margin: '1rem 0.5rem 0',
        textTransform: 'uppercase',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
    },
    buttonAnimated: {
        transform: 'scale(0.9)', // Shrink
        opacity: 0.7, // Fade out
    },
    input: {
        width: '100px',
        padding: '0.5rem',
        margin: '0.5rem 0',
        fontSize: '1rem',

        // only border bottom:
        borderBottom: '2px solid #000',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
    },
    link: {
        color: 'gray',
        cursor: 'pointer',
        textDecoration: 'underline',
    }
};


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Calculation logic
function calculatePrice({ project, client, hourRate, hours, interest, after }) {
    const rate = parseFloat(hourRate) || 0;
    const hrs = parseFloat(hours) || 0;
    const breakEven = rate * hrs;

    let multiplier = 1;
    if (project === 'app') multiplier *= 2;
    if (project === 'web') multiplier *= 1.6;
    if (project === 'brand') multiplier *= 1.3;
    if (project === 'print') multiplier *= 1.1;

    if (client === 'private') multiplier *= 1.2;
    if (client === 'smb') multiplier *= 1.3;
    if (client === 'large') multiplier *= 1.5;

    if (interest === 'boring') multiplier *= 1.5;
    if (interest === 'meh') multiplier *= 1.3;
    if (interest === 'awesome') multiplier *= 1.1;
    if (interest === 'dream') multiplier *= 1.05;

    if (after === 'hate') multiplier *= 1.5;
    if (after === 'nothing') multiplier *= 1.3;
    if (after === 'portfolio') multiplier *= 1.1;
    if (after === 'lifechange') multiplier *= 1.05;

    const recommended = breakEven * multiplier;
    const lowestAcceptable = recommended * 0.7;

    return {
        recommended: Math.round(recommended),
        lowestAcceptable: Math.round(lowestAcceptable),
    };
}

export const HowMuch = () => {

    const [step, setStep] = useState(0);
    const [buttonAnimating, setButtonAnimating] = useState(false);
    const scrollRef = useRef();

    // State for all form inputs
    const [projectType, setProjectType] = useState('');
    const [clientType, setClientType] = useState('');
    const [hourRate, setHourRate] = useState();
    const [hours, setHours] = useState();
    const [interestLevel, setInterestLevel] = useState('');
    const [afterEffect, setAfterEffect] = useState('');
    const [currentCurrency, setCurrentCurrency] = useState('$');

    useEffect(() => {

        // Registering the 'begin' event and logging it to the console when triggered.
        Events.scrollEvent.register('begin', (to, element) => {
            console.log('begin', to, element);
        });

        // Registering the 'end' event and logging it to the console when triggered.
        Events.scrollEvent.register('end', (to, element) => {
            console.log('end', to, element);
        });

        Events.scrollEvent.re

        // Updating scrollSpy when the component mounts.
        scrollSpy.update();

        // Returning a cleanup function to remove the registered events when the component unmounts.
        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    const steps = [
        {
            title: 'What’s the project?',
            content: (
                <div>
                    {['app', 'web', 'brand', 'print'].map((val) => (
                        <div
                            key={val}
                            style={styles.radioOption}
                            onClick={() => setProjectType(val)}
                        >
                            <div
                                style={{
                                    ...styles.radioLabel,
                                    ...(projectType === val ? styles.selectedOption : styles.unselectedOption),
                                }}
                            >
                                {val === 'app' && 'App Design'}
                                {val === 'web' && 'Web Design'}
                                {val === 'brand' && 'Brand Design'}
                                {val === 'print' && 'Print Design'}
                            </div>
                        </div>
                    ))}
                </div>
            ),
            isNextDisabled: !projectType,
        },
        {
            title: 'Who’s the client?',
            content: (
                <div>
                    {['private', 'smb', 'large'].map((val) => (
                        <div
                            key={val}
                            style={styles.radioOption}
                            onClick={() => setClientType(val)}
                        >
                            <div
                                style={{
                                    ...styles.radioLabel,
                                    ...(clientType === val ? styles.selectedOption : styles.unselectedOption),
                                }}
                            >
                                {val === 'private' && 'Private Client'}
                                {val === 'smb' && 'Small / Medium Business'}
                                {val === 'large' && 'Large Corp'}
                            </div>
                        </div>
                    ))}
                </div>
            ),
            isNextDisabled: !clientType,
        },
        {
            title: 'How much does it cost you?',
            content: (
                <div>
                    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label>What is your hourly rate?</label>
                        <br />
                        <input
                            type="number"
                            value={hourRate}
                            onChange={(e) => setHourRate(e.target.value)}
                            style={{ ...styles.input }}
                        />
                        {/* dropdown to select currency */}
                        <select onChange={(e) => {
                            console.log(e.target.value)
                            setCurrentCurrency(e.target.value)
                        }}>
                            <option value="$">$</option>
                            <option value="€">€</option>
                            <option value="£">£</option>
                            <option value="₪">₪</option>
                            <option value="₹">₹</option>
                            <option value="A$">A$</option>
                            <option value="C$">C$</option>
                            <option value="¥">¥</option>
                        </select>
                    <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                        <a 
                        target="_blank"
                        href="https://www.upwork.com/tools/freelance-rate-calculator"
                        style={{...styles.link}}>Calculate</a>
                        <a
                        target="_blank"
                        href="https://www.payscale.com/research/US/Job=Web_Designer/Salary#"
                         style={{...styles.link}}>See Average Rates</a>
                         </div>
                    </div>
                    <div>
                        <label>How many hours do you estimate working?</label>
                        <br />
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            style={{ ...styles.input }}
                        />
                        <p>Even if you're not sure, take a guess. But remember the time you will spend on meetings, phone calls & Emails</p>
                    </div>
                </div>
            ),
            isNextDisabled: !hourRate || !hours,
        },
        {
            title: 'Is the project interesting?',
            content: (
                <div>
                    {['boring', 'meh', 'awesome', 'dream'].map((val) => (
                        <div
                            key={val}
                            style={styles.radioOption}
                            onClick={() => setInterestLevel(val)}
                        >
                            <div
                                style={{
                                    ...styles.radioLabel,
                                    ...(interestLevel === val ? styles.selectedOption : styles.unselectedOption),
                                }}
                            >
                                {val === 'boring' && 'Boring'}
                                {val === 'meh' && 'Meh'}
                                {val === 'awesome' && 'Awesome Project'}
                                {val === 'dream' && 'Dream Project'}
                            </div>
                        </div>
                    ))}
                </div>
            ),
            isNextDisabled: !interestLevel,
        },
        {
            title: 'After the project...',
            content: (
                <div>
                    {['hate', 'nothing', 'portfolio', 'lifechange'].map((val) => (
                        <div
                            key={val}
                            style={styles.radioOption}
                            onClick={() => setAfterEffect(val)}
                        >
                            <div
                                style={{
                                    ...styles.radioLabel,
                                    ...(afterEffect === val ? styles.selectedOption : styles.unselectedOption),
                                }}
                            >
                                {val === 'hate' && 'I will hate myself a little'}
                                {val === 'nothing' && 'Nothing will change'}
                                {val === 'portfolio' && 'Will look good on my portfolio'}
                                {val === 'lifechange' && 'My life might change'}
                            </div>
                        </div>
                    ))}
                </div>
            ),
            isNextDisabled: !afterEffect,
        },
        {
            title: 'You should charge:',
            content: (() => {
                const { recommended, lowestAcceptable } = calculatePrice({
                    project: projectType,
                    client: clientType,
                    hourRate,
                    hours,
                    interest: interestLevel,
                    after: afterEffect,
                });

                return (
                    <div>
                        <h2>You should charge {currentCurrency}{numberWithCommas(recommended)}</h2>
                        <p>You can negotiate down to {currentCurrency}{numberWithCommas(lowestAcceptable)}.</p>
                        <button
                            style={styles.button}
                            onClick={() => {
                                setStep(0);
                                setProjectType('');
                                setClientType('');
                                setHourRate('10');
                                setHours('12');
                                setInterestLevel('');
                                setAfterEffect('');
                                scroller.scrollTo('step-0', {
                                    duration: 800,
                                    containerId: 'scrollContainer',
                                });
                            }}
                        >
                            Reset
                        </button>
                    </div>
                );
            })(),
        },
    ];

    const handleNext = (currentStep) => {
        setButtonAnimating(true);

        console.log('current step', currentStep);
        console.log('next step', currentStep + 1);

        // Smooth scroll to the next step
        scroller.scrollTo(`step-${currentStep + 1}`, {
            containerId: 'scrollContainer',
        });

        setButtonAnimating(false);

    };


    return (

        <div ref={scrollRef} style={styles.scrollContainer} id="scrollContainer">
            <div style={{ ...styles.stepsWrapper, }}>
                {steps.map((stepObj, index) => (
                    <>
                        <Step
                            key={index}
                            number={index}
                            title={stepObj.title}
                            onNext={index < steps.length - 1 ? handleNext : null}
                            nextLabel="Next"
                            setStep={setStep}
                            isNextDisabled={stepObj.isNextDisabled}
                        >
                            {stepObj.content}
                        </Step>
                        <div style={{
                            width: '100%',
                            minHeight: '100px',
                        }}>
                            &nbsp;
                        </div>
                    </>


                ))}
            </div>
        </div>

    );
};
