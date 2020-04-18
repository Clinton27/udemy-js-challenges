
var Question = function (p_question_text, p_arr_answers, p_correct_answer_no) {
    this.question_text = p_question_text;
    this.arr_answers = p_arr_answers;
    this.correct_answer_no = p_correct_answer_no;
};

var arr_question_1_answers = ['Judy','Basil','Stiebel'];
var obj_question_1 = new Question ('What is the surname of Clinton\'s first grade teacher?', arr_question_1_answers, 2);

var arr_question_2_answers = ['8609275128','8435432468','147554551'];
var obj_question_2 = new Question ('What is Clinton\'s SA ID no.?', arr_question_2_answers, 1);

var arr_question_3_answers = ['Blue','Red','Green'];
var obj_question_3 = new Question ('What is Clinton\'s favorite colour?', arr_question_3_answers, 3);

var arr_question_4_answers = ['Ireland','South Africa','New Zealand'];
var obj_question_4 = new Question ('Where does Clinton currently live?', arr_question_4_answers, 3);

var arr_question_5_answers = ['1.86cm','1.78cm','1.83cm'];
var obj_question_5 = new Question ('How tall is Clinton?', arr_question_5_answers, 1);

var arr_questions = [obj_question_1, obj_question_2, obj_question_3, obj_question_4, obj_question_5];

function generateRandomQuestionNo() {
    return Math.floor(Math.random() * 5);
}

var currentQuestion = arr_questions[generateRandomQuestionNo()];

function questionLogger(questionObj) {
    console.log(questionObj.question_text);
    for (var i = 0; i < questionObj.arr_answers.length; i++) {
        console.log(i + ': ' + questionObj.arr_answers[i]);
    }
}

questionLogger(currentQuestion);    

var promptAnswer = prompt('Please enter the correct answer and click OK.');

if (promptAnswer == (currentQuestion.correct_answer_no - 1)) {
    console.log('Correct answer!');
}
else
{
    console.log('Incorrect answer, try again.')
}