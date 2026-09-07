export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te';

export interface TranslationDictionary {
  localeName: string;
  nativeName: string;
  flag: string;
  speechLang: string; // BCP 47 language code for Web Speech
  accentLabel: string;
  translations: Record<string, string>;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    localeName: 'English',
    nativeName: 'English (Indian Accent)',
    flag: '🇮🇳',
    speechLang: 'en-IN',
    accentLabel: 'Indian English',
    translations: {
      platformTitle: 'SMART EDUCATION',
      platformSubtitle: 'Personal AI Learning Companion',
      askAi: 'Ask AI',
      listening: 'Listening...',
      searchPlaceholder: 'Search concepts, formulas, code, hackathons... (Press Enter)',
      femaleVoice: 'Female Voice',
      maleVoice: 'Male Voice',
      conceptMastery: 'Concept Mastery',
      continueLearning: 'Continue Learning',
      recommendedNextStep: 'Recommended Next Step',
      remedialRetest: 'Remedial Re-Test',
      verifiedGrowth: 'Verified Growth',
      programmingHub: 'Programming Hub',
      mockInterview: 'AI Mock Interview',
      resumeBuilder: 'ATS Resume Builder',
      adminPortal: 'Admin Portal',
      juryDemoTour: 'Jury Demo Tour',
      parabolaVisualizer: 'Parabola Visualizer',
      unitCircle: 'Unit Circle Trigonometry',
      sortingVisualizer: 'Sorting Visualizer',
      runCode: 'Run & Test Code',
      terminalOutput: 'Terminal Output',
      aiCodeMentor: 'Personal AI Code Mentor',
      privacyPolicy: 'Student Privacy & DPDP Act Policy'
    }
  },
  hi: {
    localeName: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    speechLang: 'hi-IN',
    accentLabel: 'हिन्दी आवाज़',
    translations: {
      platformTitle: 'स्मार्ट एजुकेशन',
      platformSubtitle: 'व्यक्तिगत एआई शिक्षण साथी',
      askAi: 'एआई से पूछें',
      listening: 'सुन रहा हूँ...',
      searchPlaceholder: 'अवधारणाएं, सूत्र, कोड या हैकाथॉन खोजें... (Enter दबाएं)',
      femaleVoice: 'महिला आवाज़',
      maleVoice: 'पुरुष आवाज़',
      conceptMastery: 'अवधारणा महारत',
      continueLearning: 'पढ़ाई जारी रखें',
      recommendedNextStep: 'अनुशंसित अगला कदम',
      remedialRetest: 'उपचारात्मक पुनः परीक्षा',
      verifiedGrowth: 'सत्यापित प्रगति',
      programmingHub: 'प्रोग्रामिंग हब',
      mockInterview: 'एआई मॉक इंटरव्यू',
      resumeBuilder: 'एटीएस बायोडाटा निर्माता',
      adminPortal: 'प्रशासक पोर्टल',
      juryDemoTour: 'ज्यूरी डेमो टूर',
      parabolaVisualizer: 'परवलय दृश्यदर्शी',
      unitCircle: 'इकाई वृत्त त्रिकोणमिति',
      sortingVisualizer: 'सॉर्टिंग एल्गोरिदम दृश्यदर्शी',
      runCode: 'कोड चलाएं और जांचें',
      terminalOutput: 'टर्मिनल आउटपुट',
      aiCodeMentor: 'व्यक्तिगत एआई कोड मेंटर',
      privacyPolicy: 'छात्र गोपनीयता एवं डीपीए कानून'
    }
  },
  ta: {
    localeName: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    speechLang: 'ta-IN',
    accentLabel: 'தமிழ் குரல்',
    translations: {
      platformTitle: 'ஸ்மார்ட் கல்வி',
      platformSubtitle: 'தனிப்பயன் AI கற்றல் துணைவன்',
      askAi: 'AI இடம் கேட்கவும்',
      listening: 'கேட்கிறது...',
      searchPlaceholder: 'பாடங்கள், சூத்திரங்கள், நிரல்கள் தேடுங்கள்... (Enter அழுத்தவும்)',
      femaleVoice: 'பெண் குரல்',
      maleVoice: 'ஆண் குரல்',
      conceptMastery: 'பாடத் தேர்ச்சி',
      continueLearning: 'தொடர்ந்து கற்கவும்',
      recommendedNextStep: 'பரிந்துரைக்கப்பட்ட அடுத்த படி',
      remedialRetest: 'மீள் தேர்வு',
      verifiedGrowth: 'நிரூபிக்கப்பட்ட வளர்ச்சி',
      programmingHub: 'புரோகிராமிங் மையம்',
      mockInterview: 'AI மாதிரி நேர்காணல்',
      resumeBuilder: 'ATS ரெஸ்யூம் பில்டர்',
      adminPortal: 'நிர்வாக மையம்',
      juryDemoTour: 'மதிப்பீட்டாளர் டெமோ டூர்',
      parabolaVisualizer: 'பரவளைய வரைபடம்',
      unitCircle: 'அலகு வட்டம் முக்கோணவியல்',
      sortingVisualizer: 'வரிசையாக்க காட்சிப்படுத்துதல்',
      runCode: 'குறியீட்டை இயக்கவும்',
      terminalOutput: 'வெளியீட்டுத் திரை',
      aiCodeMentor: 'தனிப்பயன் AI வழிகாட்டி',
      privacyPolicy: 'மாணவர் தனியுரிமை மற்றும் DPDP சட்டம்'
    }
  },
  te: {
    localeName: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    speechLang: 'te-IN',
    accentLabel: 'తెలుగు వాయిస్',
    translations: {
      platformTitle: 'స్మార్ట్ ఎడ్యుకేషన్',
      platformSubtitle: 'వ్యక్తిగత AI లెర్నింగ్ కంపానియన్',
      askAi: 'AI ని అడగండి',
      listening: 'వింటోంది...',
      searchPlaceholder: 'భావనలు, సూత్రాలు, కోడ్ వెతకండి... (Enter నొక్కండి)',
      femaleVoice: 'మహిళా వాయిస్',
      maleVoice: 'పురుష వాయిస్',
      conceptMastery: 'భావన ప్రావీణ్యం',
      continueLearning: 'నేర్చుకోవడం కొనసాగించండి',
      recommendedNextStep: 'సిఫార్సు చేయబడిన తదుపరి అడుగు',
      remedialRetest: 'పరిహార పునఃపరీక్ష',
      verifiedGrowth: 'ధృవీకరించబడిన అభివృద్ధి',
      programmingHub: 'ప్రోగ్రామింగ్ హబ్',
      mockInterview: 'AI మాక్ ఇంటర్వ్యూ',
      resumeBuilder: 'ATS రెజ్యూమ్ బిల్డర్',
      adminPortal: 'అడ్మిన్ పోర్టల్',
      juryDemoTour: 'జ్యూరీ డెమో టూర్',
      parabolaVisualizer: 'పారాబోలా విజువలైజర్',
      unitCircle: 'యూనిట్ సర్కిల్ త్రికోణమితి',
      sortingVisualizer: 'సార్టింగ్ అల్గారిథమ్ విజువలైజర్',
      runCode: 'కోడ్ రన్ చేయండి',
      terminalOutput: 'టెర్మినల్ అవుట్‌పుట్',
      aiCodeMentor: 'వ్యక్తిగత AI కోడ్ మెంటర్',
      privacyPolicy: 'విద్యార్థి గోప్యత & DPDP చట్టం'
    }
  }
};
