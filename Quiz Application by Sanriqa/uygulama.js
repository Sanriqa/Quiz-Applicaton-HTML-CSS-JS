    const questionNumber = document.querySelector(".soru-sayi");
    const questionText = document.querySelector(".soru-yazi");
    const optionContainer = document.querySelector(".secenek-sec");
    const answersIndicatorContainer = document.querySelector(".soru-gostergesi");
    const homeBox = document.querySelector(".giris-kutu ");
    const quizBox = document.querySelector(".quiz-kutu ");
    const resultBox = document.querySelector(".sonuc-kutu ");

    let questionCounter = 0;
    let currentQuestion;
    let availableQuestions = [];
    let availableOptions = [];
    let correctAnswers = 0;
    let attempt = 0;


    //push the questions into availableQuestions Array
    function setAvailableQuestions() {
        const totalQuestions = quiz.length;
        for (let i = 0; i < totalQuestions; i++) {
            availableQuestions.push(quiz[i])
        }
    }

    //set question number and question and options
    function getNewQuestions() {
        //set question number
        questionNumber.innerHTML = "Soru " + (questionCounter + 1) + " / " + quiz.length;

        //set Question text
        //get random question
        const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
        currentQuestion = questionIndex;
        questionText.innerHTML = currentQuestion.q
        //get the position of 'questionIndex' from the availableQuestions Array;
        const index1 = availableQuestions.indexOf(questionIndex);
        //remove the 'questionIndex' from the availableQuestions Array,so that the questions does not repeat
        availableQuestions.splice(index1, 1);

        //set options
        //get the lenght of options
        const optionLen = currentQuestion.options.length
        //push options into availableOptions Array
        for (let i = 0; i < optionLen; i++) {
            availableOptions.push(i)
        }
        optionContainer.innerHTML = '';
        let animationDelay = 0.15;
        //create options in HTML
        for (let i = 0; i < optionLen; i++) {
            //random option 
            const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
            //get the position of 'optonIndex' from the availableOptions 
            const index2 = availableOptions.indexOf(optonIndex);
            //remove the 'optonIndex' from the availableOptions,so that the option does not repeat 
            availableOptions.splice(index2, 1);
            const option = document.createElement("div");
            option.innerHTML = currentQuestion.options[optonIndex];
            option.id = optonIndex;
            option.style.animationDelay = animationDelay + 's';
            animationDelay = animationDelay + 0.15;
            option.className = "secenek";
            optionContainer.appendChild(option)
            option.setAttribute("onclick", "getResult(this)")
        }

        questionCounter++
    }

    //get the result of current attempt question
    function getResult(element) {
        const id = parseInt(element.id);
        //get the answer  
        if (id === currentQuestion.answer) {
            //set the green color to the correct option     
            element.classList.add("dogru");
            //add the indicator to correct mark
            updateAnswerIndicator("dogru");
            correctAnswers++;

            //set the red color to the incorrect option  
        } else {
            element.classList.add("yanlis");
            updateAnswerIndicator("yanlis");
            //add the indicator to incorrect mark
            //if the anwer is incorrect the show thec correct option by adding green color the correct option
            const optionLen = optionContainer.children.length;
            for (let i = 0; i < optionLen; i++) {
                if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                    optionContainer.children[i].classList.add("dogru");
                }
            }
        }

        attempt++;
        unclickableOptions()
    }
    //make all the options unclickable once the user select a option  (RESTRICT THE USER TO CHANGE THE OPTION AGAIN )
    function unclickableOptions() {
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            optionContainer.children[i].classList.add("cevaplandı");
        }
    }

    function answerIndicator() {
        answersIndicatorContainer.innerHTML = '';
        const totalQuestions = quiz.length;
        for (let i = 0; i < totalQuestions; i++) {
            const indicator = document.createElement("div");
            answersIndicatorContainer.appendChild(indicator)
        }
    }

    function updateAnswerIndicator(markType) {
        answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)
    }

    function next() {
        if (questionCounter === quiz.length) {
            quizOver();
        } else {
            getNewQuestions();
        }
    }


    function quizOver() {
        //hide quiz quizBox
        quizBox.classList.add("gizle");
        //show result box 
        resultBox.classList.remove("gizle");
        quizResult();
    }
    //get the quiz Result
    function quizResult() {
        resultBox.querySelector(".toplam-soru").innerHTML = quiz.length;
        resultBox.querySelector(".toplam-cevaplanan").innerHTML = attempt;
        resultBox.querySelector(".toplam-dogru").innerHTML = correctAnswers;
        resultBox.querySelector(".toplam-yanlis").innerHTML = attempt - correctAnswers;
        const percentage = (correctAnswers / quiz.length) * 100;
        resultBox.querySelector(".yuzde").innerHTML = percentage.toFixed(2) + "%";
        resultBox.querySelector(".toplam-sonuc").innerHTML = correctAnswers + " / " + quiz.length;
    }

    function resetQuiz() {
        questionCounter = 0;
        correctAnswer = 0;
        attempt = 0;
    }

    function tekrarDeneQuiz() {
        //hide the resultBox
        resultBox.classList.add("gizle");
        //show the quizBox
        quizBox.classList.remove("gizle");
        resetQuiz();
        startQuiz()
    }
    
    function basaDon(){
       // hide resultBox
       resultBox.classList.add("gizle");
       //show homeBox
       homeBox.classList.remove("gizle");
       resetQuiz();
    }

    // ### STARTING POINT ###

    function startQuiz() {

        //hide giris box
        homeBox.classList.add("gizle");
        //show quiz box
        quizBox.classList.remove("gizle");
        //first we will set all questions in AvailableQuestions Array 
        setAvailableQuestions();
        //Second we will call getNewQuestion();function
        getNewQuestions();
        // to create indicators of answer 
        answerIndicator();
    }

    window.onload = function (){
        homeBox.querySelector(".toplam-soru").innerHTML = quiz.length; 
    }