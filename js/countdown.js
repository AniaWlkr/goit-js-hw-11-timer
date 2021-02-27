const refs = {
  dateBlock: document.querySelector('span[data-value="days"]'),
  hourBlock: document.querySelector('span[data-value="hours"]'),
  minsBlock: document.querySelector('span[data-value="mins"]'),
  secsBlock: document.querySelector('span[data-value="secs"]'), 
}

class CountdownTimer {
  constructor({ targetDate, onTick }) {
    this.targetTime = targetDate.getTime();
    this.intervalId = null;
    this.onTick = onTick;
    
    this.initTimer();
  }

  initTimer() { 
    const time = this.calcDateComponents(0);
    this.onTick(time);
  }
  
  pad(value) { 
    return String(value).padStart(2, '0');
  }

  calcDateComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs};
  }

  setCountdown() { 
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      
      if (currentTime >= this.targetTime) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        return null;
      }
      const deltaTime = this.targetTime - currentTime;
      const deltaConverted = this.calcDateComponents(deltaTime);
      this.onTick(deltaConverted);
    }, 1000);  
  }
}

function updateCountDown({ days, hours, mins, secs }) { 
  refs.dateBlock.textContent = days;
  refs.hourBlock.textContent = hours;
  refs.minsBlock.textContent = mins;
  refs.secsBlock.textContent = secs;
}

const timer = new CountdownTimer({
  targetDate: new Date('Jul 17, 2021'),
  onTick: updateCountDown,
});

timer.setCountdown();
