import React, { useState, useEffect } from "react";

const Counter = ({ targetNumber, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * targetNumber);

      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [targetNumber, duration]);

  const formatWithCommas = (number) =>
    number.toLocaleString("en-US");

  return (
    <div style={{ fontSize: "2em" }}>
      {formatWithCommas(count)}
    </div>
  );
};

export const StepComponent = ({
  title,
  description,
  inputType,
  value,
  onChange,
  options = [],
  placeholder,
  onNext,
  onBack,
  isLastStep = false,
  currencySymbol = "$",
  onCurrencyChange,
  currencyOptions = ["$", "€", "£", "¥"],
  showCurrency = true, // Toggle currency selection
  formatOption = (option) => option, // Function to format options
}) => {
  return (
    <div style={{ textAlign: "center", padding: "20px", height: '300px' }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</h2>
      <p style={{ fontSize: "16px", color: "#555", width: '400px', height: '100px' }}>{description}</p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
        {inputType === "number" && (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            
          />
        )}
        {inputType === "select" && (
          <select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            
          >
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        )}
        { showCurrency && currencySymbol && (
          <select
            value={currencySymbol}
            onChange={(e) => onCurrencyChange(e.target.value)}
            
          >
            {currencyOptions.map((symbol, idx) => (
              <option key={idx} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "#f0f0f0",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          style={{
            background: "#FFD700",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isLastStep ? "Calculate" : "Next"}
        </button>
      </div>
    </div>
  );
};


export const BreakEvenCalculator = () => {
  const [step, setStep] = useState(1);
  const [lifeExpenses, setLifeExpenses] = useState(0);
  const [businessExpenses, setBusinessExpenses] = useState(0);
  const [vacationDays, setVacationDays] = useState(14);
  const [retirementFund, setRetirementFund] = useState(0);
  const [taxRate, setTaxRate] = useState(19);
  const [currencySymbol, setCurrencySymbol] = useState("$");

  const steps = [
    {
      title: "Life Expenses",
      description: "How much do you spend monthly on rent, food, utilities and other monthly payments?",
      inputType: "number",
      value: lifeExpenses,
      onChange: setLifeExpenses,
      placeholder: "Monthly payments",
    },
    {
      title: "Business Expenses",
      description: "How much do you spend monthly on software, equipment, accounting or other business related stuff?",
      inputType: "number",
      value: businessExpenses,
      onChange: setBusinessExpenses,
      placeholder: "Monthly payments",
    },
    {
      title: "Yearly Vacation Days",
      description:
        "You can’t work yourself to death. To be creative you gotta rest your mind for a bit. Vacation days vary by country and lifestyle, but we believe it’s important.",
      inputType: "select",
      value: vacationDays,
      onChange: setVacationDays,
      options: Array.from({ length: 31 }, (_, i) => i),
      showCurrency: false,
      formatOption: (option)=> `${option} days`
    },
    {
      title: "Retirement Fund",
      description:
        "We like to ignore the fact that we will get old and need a decent pension one day. But the time to start saving is today. The percentage you save determines when you can retire, so we recommend you read this.",
      inputType: "select",
      value: retirementFund,
      onChange: setRetirementFund,
      options: Array.from({ length: 21 }, (_, i) => i * 5),
      formatOption: (option)=>`${option} %`,
      showCurrency: false,
    },
    {
      title: "Taxes",
      description:
        "Nobody likes them, but we all gotta pay them (if we wanna stay out of jail). This might be complicated depending on where you live. Choose your tax rate, or leave this default number. ",
      inputType: "select",
      value: taxRate,
      onChange: setTaxRate,
      options: Array.from({ length: 51 }, (_, i) => i),
      formatOption: (option)=>`${option} %`,
      showCurrency: false,
    },
  ];

  const calculateBreakEven = () => {
    const yearlyExpenses =
      (Number(lifeExpenses) + Number(businessExpenses)) * 12;
    const retirementSavings = yearlyExpenses * (retirementFund / 100);
    const yearlyWorkingDays = 365 - vacationDays;
    const dailyWorkingHours = 8; // Assume 8-hour workdays.
    const yearlyWorkingHours = yearlyWorkingDays * dailyWorkingHours;

    const totalYearlyExpenses =
      yearlyExpenses + retirementSavings + yearlyExpenses * (taxRate / 100);
    const hourlyRate = totalYearlyExpenses / yearlyWorkingHours;
    const monthlyRate = totalYearlyExpenses / 12;

    return {
      hourlyRate: hourlyRate.toFixed(2),
      monthlyRate: monthlyRate.toFixed(2),
      yearlyRate: totalYearlyExpenses.toFixed(2),
    };
  };

  const results = calculateBreakEven();

  const styles = {
    container: {
      display: "flex",
      flexDirection: 'column',
      width: "100vw",
      height: '80vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      height: '500px',
      maxWidth: '768px',

    },
    guide: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
    },
    guideButton: (isActive) => ({
      backgroundColor: isActive ? "#FFD700" : "#f0f0f0",
      color: isActive ? "black" : "#555",
      border: "none",
      borderRadius: "100px",
      padding: "10px",
      cursor: "pointer",
      fontSize: "16px",
      width: '32px',
      height: '32px',
      fontWeight: isActive ? "bold" : "normal",
      display: 'flex',
      alignItems: 'center',


    }),
    numbersContainer: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px",
      gap: "6px",
    },
    numbersBox: (backgroundColor) => ({
      backgroundColor,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "230px",
      height: "120px",
      borderRadius: "8px",
      color: "white",

    }),
    largeNumber: {
      marginBottom: "5px",
      padding: "5px 0",
      fontSize: "20px",
      fontFamily: "'Sharpsansno1 book', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    numberLabel: {
      fontSize: "16px",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontFamily: "Sharpsansno1, sans-serif",
    },
    note: {
      fontSize: "16px",
      marginTop: "10px",
      color: "#555",
      width: '400px',

    },
    startOverButton: {
      marginTop: "20px",
      background: "#FFD700",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
      borderRadius: "0px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.guide}>
          {steps.map((_, index) => (
            <button
              key={index}
              style={styles.guideButton(step === index + 1)}
              onClick={() => setStep(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            style={styles.guideButton(step > steps.length)}
            onClick={() => setStep(steps.length + 1)}
          >
            6
          </button>
        </div>
        {step <= steps.length ? (
          <StepComponent
            title={steps[step - 1].title}
            description={steps[step - 1].description}
            inputType={steps[step - 1].inputType}
            value={steps[step - 1].value}
            onChange={steps[step - 1].onChange}
            options={steps[step - 1].options}
            placeholder={steps[step - 1].placeholder}
            onNext={() => setStep(step + 1)}
            onBack={step > 1 ? () => setStep(step - 1) : null}
            isLastStep={step === steps.length}
            currencySymbol={currencySymbol}
            onCurrencyChange={setCurrencySymbol}
            showCurrency={steps[step - 1].showCurrency}
            formatOption={steps[step - 1].formatOption}
          />
        ) : (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: '300px', padding: '20px' }}>
            <h5>Your Break-even rate</h5>
            <p style={styles.note}>
              Note - This is not what we recommend you to charge, only letting you
              know what your base hourly rate is.
            </p>
            <div style={styles.numbersContainer}>
              <div style={styles.numbersBox("#ff5057")}>
                <div style={styles.largeNumber}>
                  {currencySymbol}
                  <Counter targetNumber={results.hourlyRate} duration={500} />
                </div>
                <div style={styles.numberLabel}>Per Hour</div>
              </div>
              <div style={styles.numbersBox("#59e7a9")}>
                <div style={styles.largeNumber}>
                  {currencySymbol}
                  <Counter targetNumber={results.monthlyRate} duration={500} />
                </div>
                <div style={styles.numberLabel}>Per Month</div>
              </div>
              <div style={styles.numbersBox("#3aa2ad")}>
                <div style={styles.largeNumber}>
                  {currencySymbol}
                  <Counter targetNumber={results.yearlyRate} duration={500} />
                </div>
                <div style={styles.numberLabel}>Per Year</div>
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              style={styles.startOverButton}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
