const isTextareaOrInput = (element: Element | null) => {
  if (!element) {
    return false;
  }
  // Always compare with uppercase
  const tagName = element.tagName.toUpperCase();

  if (tagName === "TEXTAREA" || tagName === "INPUT") {
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

const listenToTyping = (element: Element) => {
  let timer: any | null; // Timer identifier
  const waitTime = 500; // Wait time in milliseconds

  // Search function
  const search = (text: string) => {
    console.log('search content', text)
    if(text) {
      // Analyze text sentiment

    }
  };

  // Listen for `keyup` event
  element.addEventListener("keyup", (e) => {
    const target = e.target as HTMLInputElement;
    const text = target.value;

    if(timer) {
      // Clear timer
      clearTimeout(timer);
    }

    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      search(text);
    }, waitTime);
  });
};

listenActiveElement((element: Element) => {
  listenToTyping(element);
});
