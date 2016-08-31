$( document ).ready(function() {
  //$("Container").hide();
  $("#start-button").click(function(){
   $("#Container").show();
  })

//Click events

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start-button', function(e) {
  $('#start-button').hide();
  $('#clock').html('<h2><span id="clock"></span></h2>');
  game.loadQuestion();
});


//Questions

var questions = [{
    
    question: "What Song Was Featured in Breakfast Club?",
    answers: ["I Melt With You","Don't You (Forget About Me)","Save A Prayer", "Twist and Shout"],
    correctAnswer: "Don't You (Forget About Me)",
  },

  { question: "What Song Does Ducky Sing in Pretty in Pink ?",
    answers: ["Too Shy","I Ran","Tenderness","If You Leave"],
    correctAnswer: "Tenderness",
  },
  { question: "What Town Did John Hughes Set Many of His Movies In?", 
    answers: ["Shermer","Chicago","Northbrook","Skokie"],
    correctAnswer: "Shermer",
  },
  { question: "What Was the License Plate on the Ferrari in Ferris Bueller's Day Off?", 
    answers: ["VCTN","FFBO","NRVOUS","MMOM"],
    correctAnswer: "NRVOUS",
  },
  { question: "What Movie Did Michael Keaton Turn Down to do Mr. Mom?",
    answers: ["Trading Places","Scarface","Terms of Endearment","Splash"],
    correctAnswer: "Splash",
  },
  { question: "What Movie Was the Inspiration for Home Alone?", 
    answers: ["Tootsie","Planes, Trains and Automobiles","Uncle Buck","Vacation"],
    correctAnswer: "Uncle Buck",
  },
  { question: "In Uncle Buck, What is Miles' Record for Consecutuve Questions?",
    answers: ["22","38","28","27"],
    correctAnswer: "38",
}];

//Game logic

var panel = $('#quiz-area');
var countStartNumber = 00;
var userChoices = [];
var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter++;
    $('#clock').html(""+game.counter);
    if (game.counter === 30){	
      $('#clock').html("<h2><span id=clock>00</span></h2>");
      panel.html('<h2>Well don\'t just sit there, hit the start button, up there, yes there.</h2>')
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button id="button" class="answer-button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  clicked: function(e) {
    console.log(e.target.innerText);
    userChoices.push(e.target.innerText);
    console.log(userChoices);
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredCorrectly: function(){
    game.correct++;
    if (game.currentQuestion === questions.length - 1){
      this.results();
    } else {
      this.nextQuestion();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    if (game.currentQuestion === questions.length - 1){
      this.results();
    } else {
      this.nextQuestion();
    }
  },
  nextQuestion: function(){
    game.currentQuestion++;
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  timeUp: function (){
    $('#clock').hide();
    clearInterval(timer);
    panel.html('<h2>Out of Time!</h2>');
    panel.append('<br><button id="start-over">Play Again</button>');
  },
  results: function() {
    $('#clock').hide();
    clearInterval(timer);
    panel.html('<h2>Game complete. Here are your results: <h2>');
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    //var yourScore = ((game.correct/questions.length)*100);
    //panel.append('<h3>Your Score: ' + yourScore + '%</h3><br>');
    for (i = 0; i < questions.length; i++) {
      panel.append('<h3>Question ' + [i+1] + ': ' + questions[i].question + '</h3>');
      if (questions[i].correctAnswer == userChoices[i]) {
        panel.append('<h3>You Answered: ' + userChoices[i] + ' - Correct!</h3');
      }
      else {
        panel.append('<h3>You Answered: ' + userChoices[i] + ' - Incorrect!</h3');
        panel.append('<h3>Correct Answer: ' + questions[i].correctAnswer + '</h3>');
      }
      panel.append('<br>');
    }

    panel.append('<br><button id="start-over">Play Again</button>');
  },
  reset: function(){
    this.currentQuestion = 0;
    $('#clock').html(""+game.counter);
    panel.html('Hey there!');
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
});