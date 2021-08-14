import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import moment from "moment";

const Quiz = ({
  quizzes,
  onFinishPress,
  onNextPress,
  index,
  onOptionChange,
  selectedOption,
  isFinish,
  time,
  onRestartPress,
  onOnceMorePress,
  onWrongAnswerNotePress,
  isWrongAnswerMode,
  onWrongAnswerNoteTextChange,
  tempNote,
  closeQuiz
}) => {
  const classes = useStyles();
  let quiz = quizzes[index];
  let isLast = index === quizzes.length - 1 ? true : false;

  let dataColor = [];
  let _data = (quizzes || []).map((q, i) => {
    if (q.isCorrect && !q.isOnceMore) {
      dataColor.push("#66DE93");
      return 100;
    } else if (q.isCorrect && q.isOnceMore) {
      dataColor.push("#FF616D");
      return 50;
    } else {
      dataColor.push("");
      return 0;
    }
  });

  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 20,
            fontStyle: "bold",
            fontColor: "#000"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 100,
            beginAtZero: true,
            stepSize: 50,
            fontSize: 20,
            fontStyle: "bold",
            fontColor: "#000",
            callback: function (value) {
              return `${value}%`;
            }
          }
        }
      ]
    },
    maintainAspectRatio: true
  };

  const data = {
    labels: quizzes.map((q, i) => `${i + 1}번`),
    datasets: [
      {
        maxBarThickness: 30,
        label: "정답률",
        backgroundColor: dataColor,
        hoverBackgroundColor: "#dadada",
        data: _data
      }
    ]
  };

  return !isWrongAnswerMode ? (
    <div className="quiz-container">
      {!isFinish && (
        <div className="quiz-form">
          <div>
            <div className="text-title">{`Q${index + 1}. ${
              quiz.question
            }`}</div>
            <form>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={selectedOption}
                  onChange={onOptionChange}
                >
                  {quiz.options.map((option, index) => {
                    return (
                      <FormControlLabel
                        className="h-50 font-size-md option"
                        key={index}
                        value={option}
                        control={<Radio style={{ color: "black" }} />}
                        label={option}
                        style={
                          selectedOption
                            ? selectedOption === option
                              ? option === quiz.correct_answer
                                ? {
                                    backgroundColor: "#66DE93",
                                    pointerEvents: "none"
                                  }
                                : {
                                    backgroundColor: "#FF616D",
                                    pointerEvents: "none"
                                  }
                              : { pointerEvents: "none" }
                            : null
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </form>
          </div>
          {selectedOption && (
            <div className="f-d j-sb">
              <FormHelperText className="text-helper">
                {quiz.isCorrect ? "정답입니다!" : "오답입니다!"}
              </FormHelperText>
              <div className="f-d">
                {!quiz.isCorrect && !quiz.isOnceMore && (
                  <Button
                    className="normal-btn mr-20"
                    variant="contained"
                    onClick={onOnceMorePress}
                  >
                    {"한번 더!"}
                  </Button>
                )}
                <Button
                  className="normal-btn"
                  variant="contained"
                  onClick={isLast ? onFinishPress : onNextPress}
                >
                  {isLast ? "종료" : "다음"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {isFinish && (
        <div className="result-form">
          <div className="f-d j-sb">
            <div className="wd-30">
              <div className="text-title mb-30">{"<결과>"}</div>
              <div className="text-title mb-10">{`소요 시간 : ${moment
                .utc(time.duration)
                .format("HH:mm:ss")}`}</div>
              <div className="text-title mb-10">{`정답 개수 : ${
                quizzes.filter(quiz => quiz.isCorrect).length
              }개`}</div>
              <div className="text-title">{`오답 개수 : ${
                quizzes.filter(quiz => !quiz.isCorrect).length
              }개`}</div>
            </div>
            <div className="wd-70">
              <div className="text-title mb-30">{"<정 오답 비율>"}</div>
              <Bar data={data} width={300} height={100} options={options} />
            </div>
          </div>
          <div className="f-d j-fe a-c">
            <Button
              className="normal-btn mr-20"
              variant="contained"
              onClick={onWrongAnswerNotePress}
            >
              {"오답노트"}
            </Button>
            <Button
              className="normal-btn"
              variant="contained"
              onClick={onRestartPress}
            >
              {"다시풀기"}
            </Button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="quiz-container">
      {!closeQuiz && (
        <div className="quiz-form">
          <div>
            <div className="text-title">{`Q${index + 1}. ${
              quiz.question
            }`}</div>
            <form>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={selectedOption}
                  onChange={onOptionChange}
                >
                  {quiz.options.map((option, index) => {
                    return (
                      <FormControlLabel
                        className="h-50 font-size-md option"
                        key={index}
                        value={option}
                        control={
                          <Radio
                            checked={
                              option === quiz.selectedOption ? true : false
                            }
                            style={{ color: "black" }}
                          />
                        }
                        label={option}
                        style={
                          option === quiz.selectedOption
                            ? {
                                backgroundColor: "#FF616D",
                                pointerEvents: "none"
                              }
                            : option === quiz.correct_answer
                            ? {
                                backgroundColor: "#66DE93",
                                pointerEvents: "none"
                              }
                            : { pointerEvents: "none" }
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </form>
          </div>
          <div className="f-d j-sb">
            <TextField
              id="outlined-full-width"
              label="오답노트"
              style={{ marginRight: 20 }}
              className="text-field"
              placeholder="문제에 대한 내 생각을 간단하게 메모해 보세요."
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              value={tempNote}
              onChange={e => onWrongAnswerNoteTextChange(e, quiz)}
            />
            <div className="f-d">
              <Button
                className="normal-btn"
                variant="contained"
                onClick={isLast ? onFinishPress : onNextPress}
              >
                {isLast ? "저장 후 종료" : "다음"}
              </Button>
            </div>
          </div>
        </div>
      )}
      {closeQuiz && (
        <div className="result-form">
          <div className="f-d j-c a-c h-100">
            <div className="text-title">{"수고하셨습니다."}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    marginLeft: 10,
    width: "100%"
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0)
  }
}));
