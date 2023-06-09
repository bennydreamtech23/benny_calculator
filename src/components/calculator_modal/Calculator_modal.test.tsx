import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";

import CalculatorModal from "./Calculator_modal";

const click = (...chars: string[]) => {
  for (const char of chars) {
    fireEvent.click(screen.getByText(char));
  }
};

const expectDisplayed = (text: string) => {
  const display = screen.getByTestId("display");
  expect(display).toHaveValue(text);
};

describe("Calculator", () => {
  it.each([
    ["", "", "display empty text by default"],
    ["125", "125", "display number according to all digits that were pushed"],
    ["", "125C", 'display empty text after "C" clicked'],
    ["12+56", "12+56", 'don\'t evaluate before "equal" button pushed'],
    [
      "12+56+",
      "12+56+-*/",
      "display at most one operator at the end even if more were pushed",
    ],
    ["68", "12+56=", "add two numbers according to user input"],
    ["-44", "12-56=", "subtract two numbers according to user input"],
    ["672", "12*56=", "multiply two numbers according to user input"],
    [
      "0.21428571428571427",
      "12/56=",
      "divide two numbers according to user input",
    ],
  ])("should display '%s' for input '%s' (%s)", (expectedOutput, input) => {
    // given
    render(<CalculatorModal />);
    // when
    click(...input);
    // then
    expectDisplayed(expectedOutput);
  });
});
