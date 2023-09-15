"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

type Step = {
  title: string;
  actions: React.ReactNode;
};

type StepperProps = {
  steps: Step[];
  onNext: (i: number) => void;
  onBack: (i: number) => void;
};

const useSteps = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const next = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const back = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return {
    activeStep,
    next,
    back,
  };
};

export function Stepper({ steps, onNext, onBack }: StepperProps) {
  const theme = useTheme();
  const { activeStep, next, back } = useSteps();

  const maxSteps = steps.length;

  return (
    <Box
      sx={{ maxWidth: 900, width: "100%", flexGrow: 1 }}
      className="flex flex-col gap-2"
    >
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{steps[activeStep].title}</Typography>
      </Paper>
      <Paper
        sx={{
          minHeight: 400,
          height: "auto",
          color: "black",
          width: "100%",
          p: 2,
        }}
      >
        {steps[activeStep].actions}
      </Paper>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        component={Paper}
        nextButton={
          <Button
            size="small"
            onClick={() => {
              onNext(activeStep + 1);
              next();
            }}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => {
              onBack(activeStep - 1);
              back();
            }}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
