var currentScript = document.currentScript;
// const TRANSLATION_PLUGIN_API_KEY = currentScript.getAttribute('secretKey');
const posX = currentScript.getAttribute("data-pos-x") || 100;
const posY = currentScript.getAttribute("data-pos-y") || 5;
let defaultTranslatedLanguage = currentScript.getAttribute(
  "default-translated-language"
);
const languageListAttribute = currentScript.getAttribute(
  "translation-language-list"
);

var initialPreferredLanguage = currentScript.getAttribute("initial_preferred_language")
const pageSourceLanguage = currentScript.getAttribute("page-source-language") || "en";
const TRANSLATION_PLUGIN_API_BASE_URL = new URL(
  currentScript.getAttribute("src")
).origin;

const languageDetection = currentScript.getAttribute("language-detection") || false;
// const TRANSLATION_PLUGIN_API_BASE_URL = "https://translation-plugin.bhashini.co.in"
let mixedCode = currentScript.getAttribute("mixed-code") || false;
const supportedTargetLangArr = [
  { code: "en", label: "English" },
  { code: "as", label: "Assamese (অসমীয়া)" },
  { code: "bn", label: "Bengali (বাংলা)" },
  { code: "brx", label: "Bodo (बड़ो)" },
  { code: "doi", label: "Dogri (डोगरी)" },
  { code: "gom", label: "Goan Konkani (गोवा कोंकणी)" },
  { code: "gu", label: "Gujarati (ગુજરાતી)" },
  { code: "hi", label: "Hindi (हिन्दी)" },
  { code: "kn", label: "Kannada (ಕನ್ನಡ)" },
  { code: "ks", label: "Kashmiri (کٲشُر)" },
  { code: "mai", label: "Maithili (मैथिली)" },
  { code: "ml", label: "Malayalam (മലയാളം)" },
  { code: "mni", label: "Manipuri (মণিপুরী)" },
  { code: "mr", label: "Marathi (मराठी)" },
  { code: "ne", label: "Nepali (नेपाली)" },
  { code: "or", label: "Odia (ଓଡ଼ିଆ)" },
  { code: "pa", label: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "sa", label: "Sanskrit (संस्कृत)" },
  { code: "sat", label: "Santali (संताली)" },
  { code: "sd", label: "Sindhi (سنڌي)" },
  { code: "ta", label: "Tamil (தமிழ்)" },
  { code: "te", label: "Telugu (తెలుగు)" },
  { code: "ur", label: "Urdu (اردو)" },
];

const CHUNK_SIZE = 25;

// Define translationCache object to store original text
var translationCache = {};

// Flag to track whether content has been translated initially
var isContentTranslated = false;

// Selected target language for translation
let selectedTargetLanguageCode =
  localStorage.getItem("preferredLanguage") || initialPreferredLanguage

// Retrieve translationCache from session storage if available
if (sessionStorage.getItem("translationCache")) {
  translationCache = JSON.parse(sessionStorage.getItem("translationCache"));
}

var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = `${TRANSLATION_PLUGIN_API_BASE_URL}/v2/website_translation_utility.css`;
// cssLink.href = `./plugin.css`;

// Append link to the head
document.head.appendChild(cssLink);

let selectedRating = 0;



const getPoweredByText = (lang) => {
  switch (lang) {
    case "kn":
      return "ಮೂಲಕ ನಡೆಸಲ್ಪಡುತ್ತಿದೆ";
    case "te":
      return "ఆధారితం";
    default:
      return "Powered by";
  }
};

function toggleDropdown() {
  const dropdown = document.getElementById("bhashiniLanguageDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
  const dropdownHeight = dropdown.clientHeight;
  const windowHeight = window.innerHeight;
  const dropdownTop = dropdown.getBoundingClientRect().top;
  if (windowHeight - dropdownTop < dropdownHeight) {
    dropdown.style.bottom = "100%";
    dropdown.style.top = "auto";
  } else {
    dropdown.style.top = "100%";
    dropdown.style.bottom = "auto";
  }
}

// Fetch supported translation languages
function fetchTranslationSupportedLanguages() {
  const targetLangSelectElement = document.getElementById(
    "bhashiniLanguageDropdown"
  );
  const brandingDiv = document.createElement("div");
  brandingDiv.setAttribute("class", "bhashini-branding");
  const poweredBy = document.createElement("span");
  poweredBy.textContent = getPoweredByText(selectedTargetLanguageCode);
  const bhashiniLogo = document.createElement("img");
  bhashiniLogo.src = `${TRANSLATION_PLUGIN_API_BASE_URL}/v2/bhashini-logo.png`;
  bhashiniLogo.alt = "Bhashini Logo";


  // feedback button
  // if (selectedTargetLanguageCode !== "en") {
  const feedbackDiv = document.createElement('div');
  feedbackDiv.setAttribute("class", "bhashini-feedback-div");
  feedbackDiv.setAttribute("title", "Feedback");
  // feedbackButton.innerHTML = `<img src=${TRANSLATION_PLUGIN_API_BASE_URL}/v2/feedback.svg alt="feedback">`;
  const feedbackButton = document.createElement('button');
  feedbackButton.setAttribute("class", "bhashini-feedback-button ");
  feedbackButton.setAttribute("title", "Feedback");
  feedbackButton.addEventListener("click", function () {
    const feedbackModal = document.querySelector('.bhashini-feedback-modal');
    feedbackModal.style.display = "block";
  });
  feedbackButton.innerHTML = `<img src=${TRANSLATION_PLUGIN_API_BASE_URL}/v2/feedback.svg alt="feedback">`;
  // feedbackButton.innerHTML = `<img src= feedback.svg alt="feedback">`;

  feedbackDiv.appendChild(feedbackButton);
  brandingDiv.appendChild(feedbackDiv);

  // }


  brandingDiv.appendChild(poweredBy);
  brandingDiv.appendChild(bhashiniLogo);

  if (languageListAttribute) {
    // If the languageList attribute is present
    // remove extra spaces and split the string into an array
    // so if the attribute is "en, hi, ta", it will be converted to ["en", "hi", "ta"]
    const languageList = languageListAttribute
      .split(",")
      .map((lang) => lang.trim());
    const filteredLanguages = supportedTargetLangArr.filter((lang) =>
      languageList.includes(lang.code)
    );
    // Loop through the filtered languages and create of ption elements for the dropdown
    filteredLanguages.forEach((element, index) => {
      let option_element = document.createElement("div");
      option_element.setAttribute("class", "dont-translate language-option");
      option_element.setAttribute("data-value", element.code);
      option_element.textContent = element.label;
      // Set the first language as the default selected option
      if (index === 0) {
        option_element.setAttribute("selected", "selected");
      }
      targetLangSelectElement.appendChild(option_element);
    });
  } else {
    supportedTargetLangArr.forEach((element) => {
      let option_element = document.createElement("div");
      option_element.setAttribute("class", "dont-translate language-option");
      option_element.setAttribute("data-value", element.code);
      option_element.textContent = element.label;
      targetLangSelectElement.appendChild(option_element);
    });
  }
  targetLangSelectElement.appendChild(brandingDiv);

  // Add single event listener to parent container using event delegation
  targetLangSelectElement.addEventListener("click", function (event) {
    const languageOption = event.target.closest(".language-option");
    if (languageOption) {
      selectLanguage(languageOption.textContent);
    }
  });
}

// Function to split an array into chunks of a specific size
function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

// Function to get all input and textArea element with placeholders
function getInputElementsWithPlaceholders() {
  return Array.from(
    document.querySelectorAll("input[placeholder], textarea[placeholder]")
  );
}

async function translateTitleAttributes(element, target_lang) {
  const elementsWithTitle = element.querySelectorAll("[title]");
  const titleTexts = Array.from(elementsWithTitle).map((el) =>
    el.getAttribute("title")
  );

  if (titleTexts.length > 0) {
    const translatedTitles = await translateTextChunks(titleTexts, target_lang);
    elementsWithTitle.forEach((el, index) => {
      const translatedTitle =
        translatedTitles[index].target || titleTexts[index];
      el.setAttribute("title", translatedTitle);
    });
  }
}

// Function to translate all input elements with placeholders
async function translatePlaceholders(target_lang) {
  const inputs = getInputElementsWithPlaceholders();
  const placeholders = inputs.map((input) => input.placeholder);

  if (placeholders.length > 0) {
    const translatedPlaceholders = await translateTextChunks(
      placeholders,
      target_lang
    );

    inputs.forEach((input, index) => {
      const translatedPlaceholder =
        translatedPlaceholders[index].target || placeholders[index];
      input.placeholder = translatedPlaceholder;
    });
  }
}

// Function to translate text chunks using custom API
async function translateTextChunks(chunks, target_lang) {
  if (target_lang === "en") {
    return chunks.map((chunk) => ({ source: chunk, target: chunk }));
  }
  const payload = {
    targetLanguage: target_lang,
    textData: chunks,
  };

  if (mixedCode === "true") {
    payload.mixed_code = true;
  }

  if (languageDetection === "true") {
    payload.languageDetection = true;
  }
  else {
    payload.sourceLanguage = "en"
  }

  try {
    const response = await fetch(
      `${TRANSLATION_PLUGIN_API_BASE_URL}/v2/translate-text`,
      {
        method: "POST",
        headers: {
          // 'auth-token': TRANSLATION_PLUGIN_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error translating text:", error);
    return [];
  }
}

// Function to recursively traverse DOM tree and get text nodes while skipping elements with "dont-translate" class
function getTextNodesToTranslate(rootNode) {
  const translatableContent = [];

  function isSkippableElement(node) {
    return (
      node.nodeType === Node.ELEMENT_NODE &&
      (node.classList.contains("dont-translate") ||
        node.classList.contains("bhashini-skip-translation") ||
        node.tagName === "SCRIPT" ||
        node.tagName === "STYLE" ||
        node.tagName === "NOSCRIPT")
    );
  }

  function isNodeOrAncestorsSkippable(node, maxLevels = 5) {
    let currentNode = node;
    let level = 0;

    while (currentNode && level < maxLevels) {
      if (isSkippableElement(currentNode)) {
        return true;
      }
      currentNode = currentNode.parentElement;
      level++;
    }

    return false;
  }

  function traverseNode(node) {
    // Handle the case when node is an array or object with node property
    if (Array.isArray(node)) {
      // Process each node in the array
      node.forEach(item => {
        // Check if it's an object with a node property (from nodesToTranslate structure)
        if (item && typeof item === 'object' && item.node) {
          traverseNode(item.node);
        } else {
          traverseNode(item);
        }
      });
      return;
    }

    // Check for valid DOM node
    if (!node || !node.nodeType) {
      return;
    }


    // Skip the entire subtree if this node or any of its ancestors are skippable
    if (isNodeOrAncestorsSkippable(node)) {
      return;
    }

    // Process this node
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const isNumeric = /^[\d.]+$/.test(text);
      if (text && !isIgnoredNode(node) && !isNumeric) {
        translatableContent.push({
          type: "text",
          node: node,
          content: text,
        });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.hasAttribute("placeholder")) {
        translatableContent.push({
          type: "placeholder",
          node: node,
          content: node.getAttribute("placeholder"),
        });
      }
      if (node.hasAttribute("title")) {
        translatableContent.push({
          type: "title",
          node: node,
          content: node.getAttribute("title"),
        });
      }

      // Process all child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
        traverseNode(node.childNodes[i]);
      }
    }
  }

  traverseNode(rootNode);
  return translatableContent;
}

function isIgnoredNode(node) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
  const nonEnglishRegex = /^[^A-Za-z0-9]+$/;
  const isValidGovtEmail = (email) => {
    let normalizedEmail = email
      .replace(/\[dot]/g, '.')
      .replace(/\[at]/g, '@');
    return emailRegex.test(normalizedEmail);
  }
  var onlyNewLinesOrWhiteSpaceRegex = /^[\n\s\r\t]*$/;
  return (
    node.parentNode &&
    (node.parentNode.tagName === "STYLE" ||
      node.parentNode.tagName === "SCRIPT" ||
      node.parentNode.tagName === "NOSCRIPT" ||
      node.parentNode.classList.contains("dont-translate") ||
      node.parentNode.classList.contains("bhashini-skip-translation") ||
      emailRegex.test(node.textContent) || isValidGovtEmail(node.textContent) ||
      (((languageDetection !== "true") && pageSourceLanguage === "en") && nonEnglishRegex.test(node.textContent))) ||
    onlyNewLinesOrWhiteSpaceRegex.test(node.textContent)
  );
}



// Global instance

async function translateElementText(element, target_lang) {
  const promises = [];
  const textNodes = getTextNodesToTranslate(element);

  if (textNodes.length > 0) {
    const textContentArray = textNodes.map((node, index) => {
      const id = `translation-${Date.now()}-${index}`;
      // Store original text in session storage
      if (node.parentNode) {
        node.parentNode.setAttribute("data-translation-id", id);
      }
      return { text: node.content, id, node };
    });

    const textChunks = chunkArray(textContentArray, CHUNK_SIZE);

    // Create an array to hold promises for each chunk translation
    const textNodePromises = textChunks.map(async (chunk) => {
      const texts = chunk.map(({ text }) => text);
      // if (target_lang === "en") {
      //         return;
      // }
      const translatedTexts = await translateTextChunks(texts, target_lang);
      chunk.forEach(({ node }, index) => {
        const translatedText = translatedTexts[index].target || texts[index];

        if (node.type === "text") {
          node.node.nodeValue = translatedText;
        }
        if (node.type === "value") {
          node.node.value = translatedText;
        }
        if (node.type === "placeholder") {
          node.node.placeholder = translatedText;
        }
        if (node.type === "title") {
          node.node.setAttribute("title", translatedText);
        }
      });
    });
    promises.push(textNodePromises);

    await Promise.all(promises);
  }
}


function selectLanguage(language) {
  document.querySelector(".bhashini-dropdown-btn-text").textContent = language;
  document.getElementById("bhashiniLanguageDropdown").classList.remove("show");
  const selectedLang = supportedTargetLangArr.find(
    (lang) => lang.label === language
  );
  if (selectedLang) {
    onDropdownChange({ target: { value: selectedLang.code } });
  }
}

window.onclick = function (event) {
  if (!event.target.matches(".bhashini-dropdown-btn")) {
    var dropdowns = document.getElementsByClassName(
      "bhashini-dropdown-content"
    );
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


const handleCloseFeedbackModal = () => {
  const feedbackModal = document.querySelector('.bhashini-feedback-modal');
  feedbackModal.style.display = "none";
  const feedbackTextArea = document.querySelector('.feedback-textarea')
  feedbackTextArea.style.display = "none";
  selectedRating = 0;
  document.querySelectorAll('.star').forEach(star => {
    star.classList.remove('selected');
  }
  )
  const suggestedResponseCheckbox = document.getElementById('suggested-feedback-checkbox');
  suggestedResponseCheckbox.checked = false;
  const suggestedFeedbackContainer = document.querySelector('.suggested-feedback-container');
  suggestedFeedbackContainer.style.display = "none";

}


const handleFeedbackSubmission = async (rating, feedback, suggestedResponse) => {
  if (!rating) {
    showToast("Please provide rating")
    return
  }
  if (rating <= 3 && !feedback) {
    showToast("Please describe your issue")
    return
  }

  const suggestedResponseCheckbox = document.getElementById('suggested-feedback-checkbox');
  if (suggestedResponseCheckbox.checked && !suggestedResponse) {
    showToast("Please provide suggested response")
    return
  }



  const submitButton = document.querySelector('.submit-feedback');
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  const payload = {
    "feedbackTimeStamp": Math.floor(new Date().getTime() / 1000),
    "feedbackLanguage": "en",
    "pipelineInput": {
      "pipelineTasks": [
        {
          "taskType": "translation",
          "config": {
            "language": {
              "sourceLanguage": "en",
              "targetLanguage": selectLanguage
            },
            "serviceId": "ai4bharat/indictrans-v2-all-gpu--t4"
          }
        }
      ],
      "inputData": {
        "input": [
          {
            "source": ""
          }
        ],
        "audio": []
      }
    },
    "pipelineOutput": {
      "pipelineResponse": [
        {
          "taskType": "translation",
          "config": null,
          "output": [
            {
              "source": "",
              "target": ""
            }
          ],
          "audio": null
        }
      ]
    },
    "pipelineFeedback": {
      "commonFeedback": [
        {
          "question": "Are you satisfied with the pipeline response",
          "feedbackType": "rating",
          "rating": rating
        },
        {
          "question": "Describe your issue",
          "feedbackType": "comment",
          "comment": feedback
        },
        {
          "question": "Suggested Response",
          "feedbackType": "comment",
          "comment": suggestedResponse
        }
      ]
    },
    "feedbackSource": {
      "application": "Bhashini Translation Plugin",
      "website": window.location.href
    }
  }
  try {
    const res = await fetch(`${TRANSLATION_PLUGIN_API_BASE_URL}/v1/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await res.json();
    showToast("Feedback Submitted Successfully")
    submitButton.textContent = "Submit";
    submitButton.disabled = false;
    handleCloseFeedbackModal();
  } catch (err) {
    console.log(err)
    showToast("Error submitting feedback. Please try again later")
  }
}


const showFeedbackdiv = () => {
  const feedbackdiv = document.querySelector('.bhashini-feedback-div');
  feedbackdiv.style.visibility = 'visible';
};

const hideFeedbackdiv = () => {
  const feedbackdiv = document.querySelector('.bhashini-feedback-div');
  feedbackdiv.style.visibility = 'hidden';

};

function processIframeContent(iframe, targetLang) {
  try {
    // Make sure we can access the iframe's content (same-origin check)
    if (iframe.contentDocument && iframe.contentDocument.body) {

      // Translate all text nodes within the iframe
      translateElementText(iframe.contentDocument.body, targetLang);

      // Translate placeholders within the iframe
      const iframeInputs = iframe.contentDocument.querySelectorAll('input[placeholder], textarea[placeholder]');
      const placeholders = Array.from(iframeInputs).map(input => input.placeholder);

      if (placeholders.length > 0) {
        translateTextChunks(placeholders, targetLang).then(translatedPlaceholders => {
          iframeInputs.forEach((input, index) => {
            input.placeholder = translatedPlaceholders[index].target || placeholders[index];
          });
        });
      }

      // Set up mutation observer for the iframe to handle dynamic content
      const iframeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                translateElementText(node, targetLang);
              }
            });
          }
        });
      });

      // Start observing the iframe's document
      iframeObserver.observe(iframe.contentDocument.body, {
        childList: true,
        subtree: true
      });
    }
  } catch (e) {
    console.error("Error accessing iframe content:", e);
  }
}


function translateSameOriginIframes(targetLang) {
  // Find all iframes in the document
  const iframes = document.querySelectorAll('iframe');

  // Process each iframe
  iframes.forEach(iframe => {
    // Handle already loaded iframes
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      processIframeContent(iframe, targetLang);
    }

    // Also set up a load event listener for iframes that haven't loaded yet
    iframe.addEventListener('load', function () {
      processIframeContent(iframe, targetLang);
    });
  });
}


document.addEventListener("DOMContentLoaded", function () {



  // check if isSelectedLangEnglish is present in sessionStorage
  const isSelectedLang = sessionStorage.getItem("selectedLang");
  if (isSelectedLang) {
    sessionStorage.removeItem("selectedLang");
    defaultTranslatedLanguage = null;
  }

  /**
   * Check if the defaultTranslatedLanguage is present and not equal to "en", then set the language to the defaultTranslatedLanguage
   * Otherwise, set the language to the preferred language stored in localStorage
   */
  const languageToUse =
    defaultTranslatedLanguage && defaultTranslatedLanguage !== "en"
      ? defaultTranslatedLanguage
      : localStorage.getItem("preferredLanguage") || initialPreferredLanguage;


  // Create translation popup elements
  const wrapperButton = document.createElement("div");
  wrapperButton.setAttribute(
    "class",
    "dont-translate bhashini-skip-translation bhashini-dropdown"
  );
  wrapperButton.setAttribute("id", "bhashini-translation");
  wrapperButton.setAttribute("title", "Translate this page!");
  // wrapperButton.innerHTML = `<select class="translate-plugin-dropdown" id="translate-plugin-target-language-list"></select><img src=${TRANSLATION_PLUGIN_API_BASE_URL}/bhashini_logo.png alt="toggle translation popup">`;
  wrapperButton.innerHTML = `
        <button class="bhashini-dropdown-btn">
          <div class="bhashini-dropdown-btn-icon">
            <img src=${TRANSLATION_PLUGIN_API_BASE_URL}/v2/languageLogo.svg  alt="toggle translation popup">
            <p class="dont-translate bhashini-skip-translation bhashini-dropdown-btn-text"> 
              ${languageToUse === "en"
      ? "English"
      : supportedTargetLangArr.find(
        (lang) => lang.code === languageToUse
      )?.label || "English"}
    
            </p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5.3295 7.36997C5.76884 6.87668 6.48116 6.87668 6.9205 7.36997L11 11.9505L15.0795 7.36997C15.5188 6.87668 16.2312 6.87668 16.6705 7.36997C17.1098 7.86326 17.1098 8.66305 16.6705 9.15635L11.7955 14.63C11.3562 15.1233 10.6438 15.1233 10.2045 14.63L5.3295 9.15635C4.89017 8.66305 4.89017 7.86326 5.3295 7.36997Z" fill="white"/>
          </svg>
        </button>
        <div class="bhashini-dropdown-content" id="bhashiniLanguageDropdown">
        </div>
    `
  // wrapperButton.appendChild(feedbackDiv);
  document.body.appendChild(wrapperButton);
  // wrapperButton.addEventListener("mouseenter", showFeedbackdiv);
  // wrapperButton.addEventListener("mouseleave", hideFeedbackdiv);
  // Create Feedback Modal
  const modal = document.createElement('div');
  modal.setAttribute("class", "bhashini-feedback-modal");
  modal.innerHTML = `
  <div class="bhashini-feedback-content">
    <div class="close-modal-container">
        <span class="close-modal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <mask id="mask0_10985_128804" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
    <rect width="16" height="16" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_10985_128804)">
    <path d="M3.11214 13.8657L2.1875 12.9411L7.10099 8.02758L2.1875 3.11409L3.11214 2.18945L8.02562 7.10294L12.9391 2.18945L13.8637 3.11409L8.95026 8.02758L13.8637 12.9411L12.9391 13.8657L8.02562 8.95221L3.11214 13.8657Z" fill="#424242"/>
  </g>
</svg>
        </span>
    </div>
      <div
        class="bhashini-feedback-form"
      >
      <div class="bhashini-feedback-star-container">
      <h2
      class= "bhashini-feedback-heading"
      >Rate this translation</h2>
      <div class="star-rating">
         <span class="star" data-value="1">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
            <path d="M13.0925 1.83921C13.8757 0.262891 16.1243 0.262888 16.9075 1.83921L19.8162 7.69337C20.1263 8.31759 20.7223 8.75057 21.4118 8.85265L27.8783 9.80991C29.6194 10.0677 30.3143 12.2063 29.0572 13.4382L24.3884 18.0136C23.8905 18.5014 23.6629 19.202 23.7789 19.8893L24.8667 26.3351C25.1596 28.0707 23.3404 29.3925 21.7803 28.5775L15.9861 25.5511C15.3683 25.2284 14.6317 25.2284 14.0139 25.5511L8.21972 28.5775C6.65956 29.3925 4.84036 28.0707 5.13328 26.3351L6.22111 19.8893C6.3371 19.202 6.10947 18.5014 5.61164 18.0136L0.942831 13.4382C-0.314316 12.2063 0.380554 10.0677 2.12174 9.80991L8.58821 8.85265C9.27772 8.75057 9.87367 8.31759 10.1838 7.69337L13.0925 1.83921Z" />
          </svg>
        </span>
          <span class="star" data-value="2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
            <path d="M13.0925 1.83921C13.8757 0.262891 16.1243 0.262888 16.9075 1.83921L19.8162 7.69337C20.1263 8.31759 20.7223 8.75057 21.4118 8.85265L27.8783 9.80991C29.6194 10.0677 30.3143 12.2063 29.0572 13.4382L24.3884 18.0136C23.8905 18.5014 23.6629 19.202 23.7789 19.8893L24.8667 26.3351C25.1596 28.0707 23.3404 29.3925 21.7803 28.5775L15.9861 25.5511C15.3683 25.2284 14.6317 25.2284 14.0139 25.5511L8.21972 28.5775C6.65956 29.3925 4.84036 28.0707 5.13328 26.3351L6.22111 19.8893C6.3371 19.202 6.10947 18.5014 5.61164 18.0136L0.942831 13.4382C-0.314316 12.2063 0.380554 10.0677 2.12174 9.80991L8.58821 8.85265C9.27772 8.75057 9.87367 8.31759 10.1838 7.69337L13.0925 1.83921Z" />
          </svg>
        </span>
         <span class="star" data-value="3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
            <path d="M13.0925 1.83921C13.8757 0.262891 16.1243 0.262888 16.9075 1.83921L19.8162 7.69337C20.1263 8.31759 20.7223 8.75057 21.4118 8.85265L27.8783 9.80991C29.6194 10.0677 30.3143 12.2063 29.0572 13.4382L24.3884 18.0136C23.8905 18.5014 23.6629 19.202 23.7789 19.8893L24.8667 26.3351C25.1596 28.0707 23.3404 29.3925 21.7803 28.5775L15.9861 25.5511C15.3683 25.2284 14.6317 25.2284 14.0139 25.5511L8.21972 28.5775C6.65956 29.3925 4.84036 28.0707 5.13328 26.3351L6.22111 19.8893C6.3371 19.202 6.10947 18.5014 5.61164 18.0136L0.942831 13.4382C-0.314316 12.2063 0.380554 10.0677 2.12174 9.80991L8.58821 8.85265C9.27772 8.75057 9.87367 8.31759 10.1838 7.69337L13.0925 1.83921Z" />
          </svg>
        </span>
          <span class="star" data-value="4">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
            <path d="M13.0925 1.83921C13.8757 0.262891 16.1243 0.262888 16.9075 1.83921L19.8162 7.69337C20.1263 8.31759 20.7223 8.75057 21.4118 8.85265L27.8783 9.80991C29.6194 10.0677 30.3143 12.2063 29.0572 13.4382L24.3884 18.0136C23.8905 18.5014 23.6629 19.202 23.7789 19.8893L24.8667 26.3351C25.1596 28.0707 23.3404 29.3925 21.7803 28.5775L15.9861 25.5511C15.3683 25.2284 14.6317 25.2284 14.0139 25.5511L8.21972 28.5775C6.65956 29.3925 4.84036 28.0707 5.13328 26.3351L6.22111 19.8893C6.3371 19.202 6.10947 18.5014 5.61164 18.0136L0.942831 13.4382C-0.314316 12.2063 0.380554 10.0677 2.12174 9.80991L8.58821 8.85265C9.27772 8.75057 9.87367 8.31759 10.1838 7.69337L13.0925 1.83921Z" />
          </svg>
        </span>
          <span class="star" data-value="5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
            <path d="M13.0925 1.83921C13.8757 0.262891 16.1243 0.262888 16.9075 1.83921L19.8162 7.69337C20.1263 8.31759 20.7223 8.75057 21.4118 8.85265L27.8783 9.80991C29.6194 10.0677 30.3143 12.2063 29.0572 13.4382L24.3884 18.0136C23.8905 18.5014 23.6629 19.202 23.7789 19.8893L24.8667 26.3351C25.1596 28.0707 23.3404 29.3925 21.7803 28.5775L15.9861 25.5511C15.3683 25.2284 14.6317 25.2284 14.0139 25.5511L8.21972 28.5775C6.65956 29.3925 4.84036 28.0707 5.13328 26.3351L6.22111 19.8893C6.3371 19.202 6.10947 18.5014 5.61164 18.0136L0.942831 13.4382C-0.314316 12.2063 0.380554 10.0677 2.12174 9.80991L8.58821 8.85265C9.27772 8.75057 9.87367 8.31759 10.1838 7.69337L13.0925 1.83921Z" />
          </svg>
        </span>
      </div>
        </div>
      <textarea
      style = "display: none;"
        class="feedback-textarea"
      placeholder="Describe your issues here..." aria-label="Describe your issues here"></textarea>
        <div class="suggested-feedback-container"
            style="display: none;"
        >
        <input type="checkbox" id="suggested-feedback-checkbox">

      <label for= "suggested-feedback-checkbox">Would you like to provide feedback</label>
        <textarea
      style = "display: none;"
        class="feedback-suggested-feedback"
      placeholder="Suggested Feedback" aria-label="Suggested Feedback"></textarea>
        </div>
      <button class="submit-feedback">Submit</button>
      </div>
  </div>
`;


  document.body.appendChild(modal);

  // Close modal on click of close button
  document.querySelector('.close-modal').addEventListener('click', () => {
    handleCloseFeedbackModal();
  });

  // Close modal when clicking outside the modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  const stars = document.querySelectorAll(".star");
  // Star Rating Selection
  stars.forEach((star, index) => {
    star.addEventListener("mouseenter", function () {
      highlightStars(index, "hovered");
    });

    star.addEventListener("mouseleave", function () {
      removeHoverEffect();
    });

    star.addEventListener("click", function () {
      selectedRating = index + 1; // Store the selected rating
      highlightStars(index, "selected");
      const textArea = document.querySelector('.feedback-textarea');
      const suggestedFeedbackContainer = document.querySelector('.suggested-feedback-container');
      if (selectedRating < 4) {
        textArea.style.display = "block";
        suggestedFeedbackContainer.style.display = "block";
        const suggestedFeedbackCheckbox = document.getElementById('suggested-feedback-checkbox');
        suggestedFeedbackCheckbox.addEventListener('change', function () {
          const suggestedFeedback = document.querySelector('.feedback-suggested-feedback');
          if (this.checked) {
            suggestedFeedback.style.display = "block";
          } else {
            suggestedFeedback.style.display = "none";
          }
        });

      }
      else {
        textArea.style.display = "none";
        suggestedFeedbackContainer.style.display = "none";
      }

    });
  });

  function highlightStars(index, className) {
    stars.forEach((s, i) => {
      if (i <= index) {
        s.classList.add(className);
      } else {
        s.classList.remove(className);
      }
    });
  }

  function removeHoverEffect() {
    stars.forEach((s) => s.classList.remove("hovered"));
  }
  wrapperButton.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleDropdown()
  });

  const submitFeedbackButton = document.querySelector('.submit-feedback');
  submitFeedbackButton.addEventListener('click', () => {
    const feedbackText = document.querySelector('.feedback-textarea').value;
    const suggestedResponse = document.querySelector('.feedback-suggested-feedback').value;
    handleFeedbackSubmission(selectedRating, feedbackText, suggestedResponse);
  });


  // Now that the element is in the DOM, its dimensions can be calculated
  // Set the position using the calculated width
  // Set the position using the calculated width
  const calculatedPosX = posX - (218 * 100) / window.innerWidth;
  const adjustedPosX = calculatedPosX < 0 ? posX : calculatedPosX;
  wrapperButton.style.left = `${adjustedPosX}%`;
  const calculatedPosY = posY - (58 * 100) / window.innerHeight;
  const adjustedPosY = calculatedPosY < 0 ? posY : calculatedPosY;
  wrapperButton.style.bottom = `${adjustedPosY}%`;
  // Add event listener for dropdown change
  // const targetLanguageList = document.getElementById("translate-plugin-target-language-list");
  // if (targetLanguageList) {
  //   targetLanguageList.addEventListener('change', onDropdownChange);
  // }

  // Fetch supported translation languages
  fetchTranslationSupportedLanguages();

  let nodesToTranslate = []; // Array to store nodes and their associated language codes
  let debounceTimer = null;
  const DEBOUNCE_DELAY = 250

  function translateElementTextNodes(node, targetLangCode) {
    nodesToTranslate.push({ node, targetLangCode });

    // If we've reached 25 nodes, translate immediately.
    if (nodesToTranslate.length >= 25) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
      translateElementText([...nodesToTranslate], targetLangCode);
      nodesToTranslate = [];
      return; // exit early to avoid setting a new timer below
    }

    // If no timer is currently active, set one for the first node.
    if (!debounceTimer) {
      debounceTimer = setTimeout(() => {
        translateElementText([...nodesToTranslate], targetLangCode);
        nodesToTranslate = [];
        debounceTimer = null;
      }, DEBOUNCE_DELAY);
    }
  }

  // Create a new MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.target.innerHTML) {
        if (selectedTargetLanguageCode) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // console.log("Translating added node:", node.textContent);
              translateElementTextNodes(node, selectedTargetLanguageCode);


            }
          });
        }
      }
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const iframes = node.querySelectorAll("iframe");
          iframes.forEach((newIframes) => {
            if (newIframes.length > 0 && selectedTargetLanguageCode) {
              newIframes.forEach(iframe => {
                // For iframes that are already loaded
                if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                  processIframeContent(iframe, selectedTargetLanguageCode);
                }

                // For iframes that will load later
                iframe.addEventListener('load', function () {
                  processIframeContent(iframe, selectedTargetLanguageCode);
                });
              });
            }


          });
        }
      }
      );
    });
  });


  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });

  // Add event listener for window resize to adjust widget position
  window.addEventListener("resize", adjustWidgetPosition);

  // Adjust the widget position on initial load
  adjustWidgetPosition();


  if (languageToUse) {
    selectedTargetLanguageCode = languageToUse;
    // document.getElementById("translate-plugin-target-language-list").value =
    //   languageToUse;
    isContentTranslated = true;
    translateAllTextNodes(languageToUse);
    translateSameOriginIframes(languageToUse);

  }
});

// Function to handle dropdown change
function onDropdownChange(event) {
  const selectedValue = event.target.value;
  // If English is selected, restore translations from session storage
  // if (selectedValue && selectedValue === "en" && isContentTranslated) {
  //     // selectedTargetLanguageCode = ""
  //     // restoreTranslations();
  //     localStorage.removeItem('preferredLanguage');
  //     window.location.reload();
  // } else if(selectedValue && selectedValue !== "en") {
  //     selectedTargetLanguageCode = selectedValue;
  //     isContentTranslated = true;
  //     // Store preferred language in localStorage
  //     localStorage.setItem('preferredLanguage', selectedValue);
  //     sessionStorage.setItem("isSelectedLang",selectedValue);

  //     // Perform translation for the selected language
  //     translateAllTextNodes(selectedTargetLanguageCode);
  //     // showToast(`This page is translated using Bhashini's Machine Learning models.`);
  // }
  isContentTranslated = true;
  sessionStorage.setItem("selectedLang", selectedValue);
  // Store preferred language in localStorage
  localStorage.setItem("preferredLanguage", selectedValue);
  // Perform translation for the selected language
  // translateAllTextNodes(selectedValue);
  window.location.reload();
}

// Function to show a toast messages
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "bhashini-toast";
  toast.textContent = message;
  toast.setAttribute("aria-label", message);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("visible");
    toast.classList.add("bhashini-skip-translation");
  }, 100);
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Function to restore translations from session storage
// function restoreTranslations() {
//   const textNodes = getTextNodesToTranslate(document.body);
//   textNodes.forEach((node) => {
//     const id = node.parentNode.getAttribute("data-translation-id");
//     if (id && translationCache[id]) {
//       node.nodeValue = translationCache[id];
//     }
//   });
//   fetchTranslationSupportedLanguages();
// }

// Function to translate all text nodes in the document
async function translateAllTextNodes(target_lang) {
  const promises = [];
  const textNodes = getTextNodesToTranslate(document.body);
  if (textNodes.length > 0) {
    const textContentArray = textNodes.map((node, index) => {
      const id = `translation-${Date.now()}-${index}`;
      // Store original text in session storage
      translationCache[id] = node.content;
      if (node.parentNode) {
        node.parentNode.setAttribute("data-translation-id", id);
      }
      return { text: node.content, id, node };
    });
    const textChunks = chunkArray(textContentArray, CHUNK_SIZE);

    // Create an array to hold promises for each chunk translation
    const textNodePromises = textChunks.map(async (chunk) => {
      const texts = chunk.map(({ text }) => text);
      // if (target_lang === "en") {
      //         return;
      // }
      const translatedTexts = await translateTextChunks(texts, target_lang);
      chunk.forEach(({ node }, index) => {
        const translatedText = translatedTexts[index].target || texts[index];

        if (node.type === "text") {
          node.node.nodeValue = translatedText;
        }
        if (node.type === "value") {
          node.node.value = translatedText;
        }
        if (node.type === "placeholder") {
          node.node.placeholder = translatedText;
        }
        if (node.type === "title") {
          node.node.setAttribute("title", translatedText);
        }
      });
    });
    promises.push(textNodePromises);

    // Wait for all translations to complete

    await Promise.all(promises);


    const preferredLanguage = localStorage.getItem("preferredLanguage");

    if (preferredLanguage === "as") {
      showToast(`এই পৃষ্ঠাটো ভাষিণীৰ এআই-চালিত মডেল ব্যৱহাৰ কৰি অনুবাদ কৰা হৈছে। উৎসৰ বিষয়বস্তু ইংৰাজীত আছে। অনুবাদ সম্পৰ্কীয় যিকোনো প্ৰশ্নৰ বাবে, অনুগ্ৰহ কৰি ceo-dibd@digitalindia.gov.inত যোগাযোগ কৰক।`);
    } else if (preferredLanguage === "bn") {
      showToast(`এই পৃষ্ঠাটি ভাষিণীর এআই-পরিচালিত মডেল ব্যবহার করে অনুবাদ করা হয়েছে। উৎস বিষয়বস্তু ইংরেজিতে রয়েছে। অনুবাদ সম্পর্কিত যে কোনও প্রশ্নের জন্য, দয়া করে যোগাযোগ করুন এখানে ceo-dibd@digitalindia.gov.in`);
    } else if (preferredLanguage === "brx") {
      showToast(`बे पेजखौ भासिनीनि ए.आइ.-पावार मडेलफोरखौ बाहायनानै राव दानस्लायनाय जादों। फुंखा आयदाफोरा इंराजियाव दं। राव दानस्लायनायजों सोमोन्दो थानाय जायखिजाया सोंनायनि थाखाय, अन्नानै ceo-dibd@digitalindia.gov.in आव सोमोन्दो खालाम।`);
    } else if (preferredLanguage === "doi") {
      showToast(`इस सफे दा अनुवाद भाशिनी दे एआई-संचालत माडलें दा इस्तेमाल करियै कीता गेदा ऐ। स्रोत समग्गरी अंग्रेज़ी च ऐ। अनुवादै कन्नै सरबंधत कुसै बी सोआलै आस्तै, कृपा करियै ceo-dibd@digitalindia.gov.in कन्नै राबता करो।`);
    } else if (preferredLanguage === "gu") {
      showToast(`આ પૃષ્ઠનું ભાષાંતર ભાષિણીના એ.આઈ. સંચાલિત મોડેલોનો ઉપયોગ કરીને કરવામાં આવ્યું છે. સ્રોત સામગ્રી અંગ્રેજીમાં છે. અનુવાદ સંબંધિત કોઈપણ પ્રશ્નો માટે, કૃપા કરીને ceo-dibd@digitalindia.gov.in નો સંપર્ક કરો.`);
    } else if (preferredLanguage === "hi") {
      showToast(`इस पृष्ठ का अनुवाद भाषिणी के ए. आई.-संचालित मॉडल का उपयोग करके किया गया है। स्रोत सामग्री अंग्रेजी में है। अनुवाद से संबंधित किसी भी प्रश्न के लिए, कृपया ceo-dibd@digitalindia.gov.in से संपर्क करें।`);
    } else if (preferredLanguage === "kn") {
      showToast(`ಈ ಪುಟವನ್ನು ಭಾಷಿಣಿಯ ಎಐ-ಚಾಲಿತ ಮಾದರಿಗಳನ್ನು ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ಮೂಲ ವಿಷಯವು ಇಂಗ್ಲಿಷ್ನಲ್ಲಿದೆ. ಯಾವುದೇ ಅನುವಾದ-ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳಿಗೆ, ದಯವಿಟ್ಟು ceo-dibd@digitalindia.gov.in ಅನ್ನು ಸಂಪರ್ಕಿಸಿ.`);
    } else if (preferredLanguage === "mai") {
      showToast(`एहि पृष्ठक अनुवाद भाषिणीक एआइ-सञ्चालित मॉडलक उपयोग करैत कयल गेल अछि। स्रोत सामग्री अङ्ग्रेजीमे अछि। अनुवादसँ सम्बन्धित कोनो प्रश्नक लेल कृपया ceo-dibd@digitalindia.gov.in सँ सम्पर्क करू।`);
    } else if (preferredLanguage === "ml") {
      showToast(`ഭാഷിണിയുടെ എഐ പവേഡ് മോഡലുകൾ ഉപയോഗിച്ചാണ് ഈ പേജ് വിവർത്തനം ചെയ്തിരിക്കുന്നത്. ഉറവിട ഉള്ളടക്കം ഇംഗ്ലീഷിലാണ്. വിവർത്തനവുമായി ബന്ധപ്പെട്ട എന്തെങ്കിലും ചോദ്യങ്ങൾക്ക് ദയവായി ceo-dibd@digitalindia.gov.in-മായി ബന്ധപ്പെടുക.`);
    } else if (preferredLanguage === "mr") {
      showToast(`हे पृष्ठ भाषिणीच्या ए. आय.-संचालित मॉडेल्सचा वापर करून अनुवादित केले गेले आहे. स्त्रोत मजकूर इंग्रजीत आहे. भाषांतराशी संबंधित कोणत्याही प्रश्नांसाठी, कृपया ceo-dibd@digitalindia.gov.in शी संपर्क साधा`);
    } else if (preferredLanguage === "ne") {
      showToast(`यो पृष्ठ भासिनीको एआई-संचालित मोडेलहरू प्रयोग गरेर अनुवाद गरिएको छ। स्रोत सामग्री अङ्ग्रेजीमा छ। कुनै पनि अनुवाद-सम्बन्धित प्रश्नहरूका लागि, कृपया ceo-dibd@digitalindia.gov.in मा सम्पर्क गर्नुहोस्।`);
    } else if (preferredLanguage === "or") {
      showToast(`ଏହି ପୃଷ୍ଠାଟିକୁ 'ଭାଷିଣୀ'ର ଏ.ଆଇ.-ଚାଳିତ ମଡେଲ୍‌ ବ୍ୟବହାର କରି ଅନୁବାଦ କରାଯାଇଛି। ମୂଳ ବିଷୟବସ୍ତୁ ଇଂରାଜୀରେ ଅଛି । ଅନୁବାଦ ସମ୍ବନ୍ଧୀୟ ଯେକୌଣସି ପ୍ରଶ୍ନ ପାଇଁ, ଦୟାକରି ceo-dibd@digitalindia.gov.in ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ ।`);
    } else if (preferredLanguage === "pa") {
      showToast(`ਇਸ ਪੰਨੇ ਦਾ ਅਨੁਵਾਦ ਭਾਸ਼ਣੀ ਦੇ ਏਆਈ-ਸੰਚਾਲਿਤ ਮਾਡਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ।  ਸਰੋਤ ਸਮੱਗਰੀ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਹੈ।  ਕਿਸੇ ਵੀ ਅਨੁਵਾਦ ਨਾਲ ਸਬੰਧਤ ਸਵਾਲਾਂ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ceo-dibd@digitalindia.gov.in 'ਤੇ ਸੰਪਰਕ ਕਰੋ।`);
    } else if (preferredLanguage === "sa") {
      showToast(`अस्य पृष्ठस्य अनुवादः भशिन्याः ए. ऐ.-शक्तियुक्तानि प्रतिरूपाणि उपयुज्य कृतः अस्ति। मूलविषयः आङ्ग्लभाषायाम् अस्ति। अनुवादसम्बद्धानां प्रश्नानां कृते कृपया ceo-dibd@digitalindia.gov.in सम्पर्कं करोतु।`);
    } else if (preferredLanguage === "sat") {
      showToast(`ᱱᱚᱣᱟ ᱯᱮᱡᱽ ᱫᱚ ᱵᱷᱟᱥᱤᱱᱤ ᱨᱮᱭᱟᱜ ᱮ ᱟᱭᱼᱯᱟᱣᱟᱨᱰ ᱢᱚᱰᱮᱞ ᱵᱮᱵᱷᱟᱨ ᱠᱟᱛᱮᱫ ᱛᱚᱨᱡᱚᱢᱟ ᱟᱠᱟᱱᱟ ᱾ ᱯᱷᱮᱰᱟᱛ ᱠᱚᱱᱴᱮᱱᱴ ᱫᱚ ᱤᱝᱜᱽᱞᱤᱥᱛᱮ ᱢᱮᱱᱟᱜᱼᱟ ᱾ ᱛᱚᱨᱡᱚᱢᱟ ᱤᱫᱤ ᱠᱟᱛᱮᱫ ᱡᱟᱦᱟᱱ ᱵᱟᱰᱟᱭ ᱞᱟᱹᱜᱤᱫ, ᱫᱟᱭᱟ ᱠᱟᱛᱮᱫ ceo-dibd@digitalindia.gov.in ᱥᱟᱶ ᱡᱳᱜᱟᱡᱳᱜᱽ ᱢᱮ ᱾ `);
    } else if (preferredLanguage === "ta") {
      showToast(`இந்தப் பக்கம் பாஷிணியின் செயற்கை நுண்ணறிவுடன் இயங்கும் மாதிரிகளைப் பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. மூல உள்ளடக்கம் ஆங்கிலத்தில் உள்ளது. மொழிபெயர்ப்பு தொடர்பான கேள்விகளுக்கு, தயவுசெய்து ceo-dibd@digitalindia.gov.in ஐ தொடர்பு கொள்ளவும்.`);
    } else if (preferredLanguage === "te") {
      showToast(`ఈ పేజీ భాషిణి యొక్క ఏఐ-ఆధారిత నమూనాలను ఉపయోగించి అనువదించబడింది. మూలం ఆంగ్లంలో ఉంది. అనువాదానికి సంబంధించిన ఏవైనా ప్రశ్నల కోసం, దయచేసి ceo-dibd@digitalindia.gov.in ను సంప్రదించండి.`);
    } else if (preferredLanguage === "ur") {
      showToast(`اس صفحے کا ترجمہ بھاشینی کے اے آئی سے چلنے والے ماڈلز کا استعمال کرتے ہوئے کیا گیا ہے۔ اصل مواد انگریزی میں ہے۔ ترجمے سے متعلق کسی بھی سوال کے لیے، براہ کرم ceo-dibd@digitalindia.gov.in سے رابطہ کریں۔`);
    } else if (preferredLanguage === "mni") {
      showToast(`ꯃꯁꯤꯒꯤ ꯆꯦꯐꯣꯡ ꯑꯁꯤ ꯚꯥꯁꯤꯅꯤꯒꯤ ꯑꯦ. ꯑꯥꯏ. ꯅ ꯆꯂꯥꯏꯕ ꯃꯣꯗꯦꯜꯁꯤꯡ ꯁꯤꯖꯤꯟꯅꯗꯨꯅ ꯍꯟꯗꯣꯛꯈ꯭ꯔꯦ ꯫ ꯁꯣꯔꯁꯀꯤ ꯃꯆꯥꯛ ꯑꯁꯤ ꯏꯪꯂꯤꯁꯇ ꯂꯩ ꯫ ꯍꯟꯗꯣꯛꯄꯒ ꯃꯔꯤ ꯂꯩꯅꯕ ꯆꯤꯡꯅꯕ ꯑꯃꯍꯦꯛꯇꯒꯤꯗꯃꯛ, ꯆꯥꯟꯕꯤꯗꯨꯅ ceo-dibd@digitalindia.gov.in ꯗ ꯀꯣꯟꯇꯦꯛ ꯇꯧꯕꯤꯌꯨ`);
    } else if (preferredLanguage === "sd") {
      showToast(`ھن صفحی جو ترجمو ڀاسنی جی ای-پاور ماڊل استعمال ڪندی ڪیو ویو آھی ذریعو مواد انگریزی ۾ آھی ترجمی سان لاڳاپیل ڪنھن بہ سوال لاء، مہربانی ڪری ceo-dibd@digitalindia.gov.in سان رابطو ڪریو`);
    } else if (preferredLanguage === "gom") {
      showToast(`भाशिनीचो एआय- संचालित मॉडेल वापरून ह्या पानाचें भाशांतर केलां. स्रोत मजकूर इंग्लीश भाशेंत आसा. भाशांतरा संबंदीत खंयच्याय प्रस्नां खातीर, उपकार करून ceo-dibd@digitalindia.gov.in कडेन संपर्क सादचो.`);
    } else if (preferredLanguage === "ks") {
      showToast(`امہِ صفُک ترجُمہٕ چھُ باشنی ہنٛد اے آیۍ پاور ماڈل استعمال کٔرتھ کرنہٕ آمُت۔ ماخذُک مواد چھُ انگریزی پٲٹھۍ۔ کُنہِ تہِ ترجمس مُتعلِق سوالَن باپتھ کٔرِو مہربٲنی کٔرِتھ ceo-dibd@digitalindia.gov.in پٮ۪ٹھ رٲبطہٕ۔`)
    } else {
      // No toast
    }
  }
}

// Store translationCache in session storage
sessionStorage.setItem("translationCache", JSON.stringify(translationCache));

// Function to adjust widget position based on device width
const adjustWidgetPosition = () => {
  const wrapperButton = document.getElementById("bhashini-translation");
  if (window.innerWidth <= 768) {
    // Position for mobile devices
    wrapperButton.style.left = `calc(100vw - ${wrapperButton.offsetWidth + 10
      }px)`;
    wrapperButton.style.bottom = `10px`;
  } else if (window.innerWidth <= 1024) {
    // Position for tablet devices
    wrapperButton.style.left = `calc(100vw - ${wrapperButton.offsetWidth + 20
      }px)`;
    wrapperButton.style.bottom = `20px`;
  }
};

// CSS for toast message
const toastStyles = `
    .bhashini-toast {
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        opacity: 0;
        transition: opacity 0.3s ease, bottom 0.3s ease;
        z-index: 10000;
    }
    .bhashini-toast.visible {
        opacity: 1;
        bottom: 40px;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = toastStyles;
document.head.appendChild(styleSheet);
