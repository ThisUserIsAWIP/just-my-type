$(function () {
    // let sentences = [
    //     'Eleven red dwarves ran across the field and under the bridge.',
    //     'Seven green snakes were hiding in the river beneath the bridge.',
    //     'The snakes saw the dwarves and called out a friendly hello.',
    //     'The dwarves ate the snakes, everyone knows red dwarves eat green snakes!'
    // ];
    let sentences = [
        'Eleven red dwarves.',
        'Seven green.',
        'The snakes.',
        'The dwarves!'
    ];
    let startTime = Date.now();
    console.log(startTime)
    let numberOfMistakes = 0;
    let sentIndex = 0;
    let letterIndex = 0;
    let currentSentence = sentences[sentIndex];
    let currentLetter = currentSentence[letterIndex];
    $('#target-letter').text(currentLetter);
    $('#sentence').text(currentSentence);

    $('#keyboard-upper-container').hide();
    $('body').keydown(function (e) {
        if (e.which === 16) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
        }
    })
    $('body').keyup(function (e) {
        $('.highlight').removeClass('highlight')
        if (e.which === 16) {
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
        }
    })
    $('body').keypress(function (e) {
        // highlighting keys and letters
        $('#' + e.keyCode).addClass('highlight');
        $('#yellow-block').css('left', '+=17.5px');
        //Confirming right or wrong
        if (currentSentence.charCodeAt(letterIndex) === e.keyCode) {
            $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>')
            // letterIndex++
            // let nextLetter = currentSentence[letterIndex]
            // $('#target-letter').text(nextLetter);
            // if (currentSentence[letterIndex] === currentSentence[letterIndex + 1]) {
            //     sentIndex++
            //     if (sentIndex === 4) {
            //         if (confirm('Your score is ' + numberOfWords / minutes - 2 * numberOfMistakes + 'Would you like to play again?')) {
            //             sentIndex = 0
            //             letterIndex = 0
            //         } else {}
            //     }
            // }
        } else {
            $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>')
            numberOfMistakes++
        }
        //preparng for next letter
        letterIndex++
        if (currentSentence.length <= letterIndex) {
            console.log('sentence finished')
            sentIndex++
            if (sentences.length <= sentIndex) {
                $('body').off()
                $('#keyboard-upper-container, #32').hide();
                $('#keyboard-lower-container').hide();
                let endTime = Date.now()
                let timeDiff = endTime - startTime
                let secondsPlayed = timeDiff / 1000;
                let minutesPlayed = secondsPlayed / 60;
                if (confirm('Your score is ' + (9 / minutesPlayed - 2 * numberOfMistakes) + ' Would you like to play again?')) {
                    window.location.reload()
                }
                return;
            }
            letterIndex = 0;
            currentSentence = sentences[sentIndex];
            $('#sentence').text(currentSentence);
            $('#feedback').empty()
            $('#yellow-block').css('left', '17.5px');
        }
        currentLetter = currentSentence[letterIndex];
        $('#target-letter').text(currentLetter);

    })
});