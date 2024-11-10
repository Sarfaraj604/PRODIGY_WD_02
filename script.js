let [milliseconds, seconds, minutes] = [0, 0, 0];
let timerRef = document.getElementById('display');
let int = null;
let lapsContainer = document.getElementById('laps');

document.getElementById('startStop').addEventListener('click', () => {
    if (int === null) {
        int = setInterval(displayTimer, 10);
        document.getElementById('startStop').textContent = 'Pause';
    } else {
        clearInterval(int);
        int = null;
        document.getElementById('startStop').textContent = 'Start';
    }
});

document.getElementById('lap').addEventListener('click', () => {
    let lapTime = `${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
    let lapElement = document.createElement('li');
    lapElement.innerText = lapTime;
    lapsContainer.appendChild(lapElement);
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(int);
    int = null;
    [milliseconds, seconds, minutes] = [0, 0, 0];
    timerRef.innerHTML = '00:00:00';
    document.getElementById('startStop').textContent = 'Start';
    lapsContainer.innerHTML = '';
});

function displayTimer() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    let m = format(minutes);
    let s = format(seconds);
    let ms = format(milliseconds, true);

    timerRef.innerHTML = `${m}:${s}:${ms}`;
}

function format(time, isMilliseconds = false) {
    return isMilliseconds ? `00${time}`.slice(-3) : `0${time}`.slice(-2);
}
