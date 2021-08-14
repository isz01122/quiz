import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import QuizPage from "../QuizPage";

test("퀴즈 페이지가 생성되어야함", () => {
  render(<QuizPage />);
  const quizPageElement = screen.getByTestId("quiz-1");
  expect(quizPageElement).toBeInTheDocument();
});
