// const { getSentimentAnalysis } = require('./lib/deepai')
const { getSentimentAnalysis } = require('./lib/sentimentserver')
const { getRandomCat } = require('./lib/cat.js');

const hasElement = (array1: [], array2: string[]) => {
  return array1.some(element => {
    if (array2.includes(element)) {
      return true;
    }
    return false;
  });
}

const notifyUser = async () => {
  const data = await getRandomCat();

  if(data && data[0]) {
    const sendToBackground = {
      from: 'therapy-pet-content',
      url: data[0].url
    }
  
    chrome.runtime.sendMessage(sendToBackground, (response) => {
      // Can do something once user come back
    });
  }
}


// Search function
const search = async (text: string) => {
  console.log('search', text)
  if(text) {
    // Analyze text sentiment
    const result = await getSentimentAnalysis(text)
    if(result) {
      const { sentiment, score, text } = result;

      if(sentiment === 'negative') {
        notifyUser()
      }

    }
  }
};

const isTextareaOrInput = (element: Element | null) => {
  if (!element) {
    return false;
  }
  // Always compare with uppercase
  const tagName = element.tagName.toUpperCase();

  if (tagName === "TEXTAREA" || tagName === "INPUT") {
    return true;
  }

  // Check if content is editable
  const isContentEditable = element.getAttribute('contenteditable');

  if(isContentEditable) {
    return true;
  }

  return false;
};

const listenActiveElement = (callback: any) => {
  // Initial check
  let lastActiveElement = document.activeElement;
  // Check if element is textarea or input
  if (isTextareaOrInput(lastActiveElement)) {
    callback(lastActiveElement);
  }

  // Handle if focus changes
  const detectFocus = () => {
    if (lastActiveElement !== document.activeElement) {
      lastActiveElement = document.activeElement;
      if (isTextareaOrInput(lastActiveElement)) {
        callback(lastActiveElement);
      }
    }
  };

  window.addEventListener("focus", detectFocus, true);
};

const listenToTyping = (element: HTMLInputElement) => {
  let timer: any | null; // Timer identifier
  let activeTypingTimer: any | null; // Timer identifier
  const waitTime = 3000; // Wait time in milliseconds
  let lastInput = element.value
  let activelyTyping = false
  let lastTypeTime = new Date().getTime();

  element.addEventListener("keydown", (e) => {
    activelyTyping = true;
    lastTypeTime = new Date().getTime();
  })


  // Listen for `keyup` event
  element.addEventListener("keyup", (e) => {
    const target = e.target as HTMLInputElement;

    let text = target.value;

    // If text is undefined, the element is a editable div
    if(text === undefined) {
      text = target.innerText;
    }
    
    if(timer) {
      // Clear timer
      clearTimeout(timer);
    }
    
    if(activeTypingTimer) {
      clearTimeout(activeTypingTimer);
    }
    
    const activeTypingCheckTime = waitTime - 1000;

    
    activeTypingTimer = setTimeout(() => {
      if(activelyTyping) {
        const now = new Date().getTime();

        if(now > lastTypeTime + activeTypingCheckTime) {
          activelyTyping = false;
        }
      }
    }, activeTypingCheckTime)

    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      if(text !== lastInput) {
        if(!activelyTyping) {
          search(text);
          lastInput = text;
        }
      }
    }, waitTime);
  });
};

listenActiveElement((element: HTMLInputElement) => {
  listenToTyping(element);
});
