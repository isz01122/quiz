import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import QuizPage from "../QuizPage";
import Quiz from "../../components/Quiz";

afterEach(() => {
  cleanup();
});

test("퀴즈 페이지가 생성되어야함", () => {
  render(<QuizPage />);
  const quizPageElement = screen.getByTestId("quiz-page");
  expect(quizPageElement).toBeInTheDocument();
});

test("퀴즈 컴포넌트가 생성되어야함", () => {
  render(
    <Quiz
      quizzes={[
        {
          category: "My Category",
          type: "multiple",
          difficulty: "easy",
          question: "우리나라의 이름은?",
          correct_answer: "대한민국",
          incorrect_answers: ["미국", "일본", "중국"],
          id: 0,
          options: ["미국", "대한민국", "일본", "중국"],
          isCorrect: false,
          isOnceMore: false,
          note: null,
          selectedOption: null
        }
      ]}
      index={0}
      selectedOption={""}
      isFinish={false}
      time={{
        startedAt: null,
        endedAt: null,
        duration: null
      }}
      isWrongAnswerMode={false}
    />
  );
  const quizPageElement = screen.getByTestId("quiz-component");
  expect(quizPageElement).toBeInTheDocument();
});

test("퀴즈 컴포넌트 오답노트가 생성되어야함", () => {
  render(
    <Quiz
      quizzes={[
        {
          category: "My Category",
          type: "multiple",
          difficulty: "easy",
          question: "우리나라의 이름은?",
          correct_answer: "대한민국",
          incorrect_answers: ["미국", "일본", "중국"],
          id: 0,
          options: ["미국", "대한민국", "일본", "중국"],
          isCorrect: false,
          isOnceMore: false,
          note: null,
          selectedOption: null
        }
      ]}
      index={0}
      selectedOption={""}
      isFinish={false}
      time={{
        startedAt: null,
        endedAt: null,
        duration: null
      }}
      isWrongAnswerMode={true}
    />
  );
  const quizPageElement = screen.getByTestId(
    "quiz-component-wrong-answer-mode"
  );
  expect(quizPageElement).toBeInTheDocument();
});

test("퀴즈 결과 컴포넌트가 생성되어야함", () => {
  render(
    <Quiz
      quizzes={[
        {
          category: "My Category",
          type: "multiple",
          difficulty: "easy",
          question: "우리나라의 이름은?",
          correct_answer: "대한민국",
          incorrect_answers: ["미국", "일본", "중국"],
          id: 0,
          options: ["미국", "대한민국", "일본", "중국"],
          isCorrect: false,
          isOnceMore: false,
          note: null,
          selectedOption: null
        }
      ]}
      index={0}
      selectedOption={""}
      isFinish={true}
      time={{
        startedAt: null,
        endedAt: null,
        duration: null
      }}
      isWrongAnswerMode={false}
    />
  );
  const quizPageElement = screen.getByTestId("result-component");
  expect(quizPageElement).toBeInTheDocument();
});

test("퀴즈 종료화면 컴포넌트가 생성되어야함", () => {
  render(
    <Quiz
      quizzes={[
        {
          category: "My Category",
          type: "multiple",
          difficulty: "easy",
          question: "우리나라의 이름은?",
          correct_answer: "대한민국",
          incorrect_answers: ["미국", "일본", "중국"],
          id: 0,
          options: ["미국", "대한민국", "일본", "중국"],
          isCorrect: false,
          isOnceMore: false,
          note: null,
          selectedOption: null
        }
      ]}
      index={0}
      selectedOption={""}
      isFinish={true}
      time={{
        startedAt: null,
        endedAt: null,
        duration: null
      }}
      isWrongAnswerMode={true}
    />
  );
  const quizPageElement = screen.getByTestId("close-component");
  expect(quizPageElement).toBeInTheDocument();
});

test("matches snapshot", () => {
  const tree = renderer.create(<QuizPage />).toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
});
