# Quiz

React JS Fundamentals Quiz

## Features

- [x] React, ReactHooks
- [x] Material-UI, chart.js, moment

### Essential

- [x] The user can start solving the quiz by clicking the "quiz solving" button.
- [x] The user can choose from four views of the answer to the question.
- [x] Users can view the following questions by selecting the answer.
  - [x] After selecting the answer, you can see the next question button.
  - [x] You can tell right away if the answer is correct or wrong.
  - [x] You can move to the next question by clicking the Next Question button.
- [x] When all the questions are solved, the user can see the following result information.
  - [x] Time spent completing the quiz
  - [x] Number of correct answers
  - [x] Wrong number of answers

### Options

- [x] Chart the percentage of correct answers
- [x] Resolve the problem
- [x] Wrong answer notes

## Preview

<img src="https://user-images.githubusercontent.com/43328761/129401209-072caf9e-7dfe-40b9-b87f-add085aecef0.png" width="640" height="480">
1.퀴즈 풀기 버튼을 눌러서 시작합니다.
<img src="https://user-images.githubusercontent.com/43328761/129401260-04b685fe-d5c5-4e33-a824-850f3d8a44be.png" width="640" height="480">
2. 공공 API를 통해 무작위로 퀴즈를 10개 가지고 오고 보기는 4개가 있습니다.
<img src="https://user-images.githubusercontent.com/43328761/129401305-bbc27a80-5742-4152-a25e-80d2a9ab7b84.png" width="640" height="480">
3. 답안을 선택하면 다음 문항으로 넘어가는 버튼을 볼 수 있습니다. 이때 정답, 오답 여부를 바로 알 수 있습니다.
<img src="https://user-images.githubusercontent.com/43328761/129401356-f5e04bd9-4aa3-434f-bec2-a8530c43cdb2.png" width="640" height="480">
4. 만약 오답을 선택한 경우 한번 더 풀어볼 수 있도록 기회를 줍니다.
<img src="https://user-images.githubusercontent.com/43328761/129401398-35a469ed-dfbc-4a5d-927c-c1efe361de65.png" width="640" height="480">
5. 그럼에도 불구하고 답이 틀리면 다음 문항으로 넘어가야 합니다.
<img src="https://user-images.githubusercontent.com/43328761/129401448-6b26e12d-5a62-4a55-ac0d-7ef5469e9e5d.png" width="640" height="480">
6. 10개의 문제를 모두 풀면 소요 시간, 정답 개수, 오답 개수 그리고 정오답 비율의 차트와 오답노트 및 다시풀기 버튼이 나타납니다.<br/>
(한번에 맞춘 문제는 정답률 100%를 부여하고, 한번 더 기회를 얻어 맞춘 문제는 50% 그리고 두 차례에서 모두 맞추지 못한 경우는 0%를 부여합니다.)<br/>
(오답노트를 선택한 경우 : 아래의 7번으로 넘어갑니다.)<br/>
(다시풀기를 선택한 경우 : 퀴즈의 1번으로 돌아가서 모든 문제를 다시 풀 수 있도록 합니다.)
<img src="https://user-images.githubusercontent.com/43328761/129401490-870ede41-fdc3-4e49-bfc8-94eeab0d26f9.png" width="640" height="480">
7. 사용자가 골랐던 오답과 정답을 구분하여 보여주고, 간단한 메모를 남길 수 있도록 합니다.
<img src="https://user-images.githubusercontent.com/43328761/129401526-1648e758-156f-4231-9c5b-1ee56486b0eb.png" width="640" height="480">
8. 오답노트 마지막 문항에서 저장 후 종료 버튼을 누르게 되면 퀴즈가 끝납니다.

## Try it out

`yarn`

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
