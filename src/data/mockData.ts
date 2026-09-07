import { 
  SubjectItem, 
  QuizData, 
  QuizAnalysisResult, 
  WeaknessImprovementPlan, 
  RetestComparison, 
  ProgrammingTopic, 
  HackathonEvent, 
  MockInterviewSession, 
  ResumeData, 
  AdminRequestItem 
} from '../types';

export const schoolSubjects: SubjectItem[] = [
  {
    id: 'math',
    name: 'Mathematics',
    iconName: 'Calculator',
    chaptersCount: 14,
    completedPercentage: 68,
    chapters: [
      {
        id: 'math-ch1',
        title: 'Chapter 1 – Real Numbers',
        conceptsCount: 5,
        completedConcepts: 5,
        quizStatus: 'Completed',
        score: 92,
        recommendedTopics: ['Euclid’s Division Lemma', 'Fundamental Theorem of Arithmetic'],
        concepts: []
      },
      {
        id: 'math-ch2',
        title: 'Chapter 2 – Polynomials',
        conceptsCount: 4,
        completedConcepts: 4,
        quizStatus: 'Completed',
        score: 88,
        recommendedTopics: ['Geometrical Meaning of Zeroes', 'Relationship between Zeroes and Coefficients'],
        concepts: []
      },
      {
        id: 'math-ch3',
        title: 'Chapter 3 – Pair of Linear Equations',
        conceptsCount: 6,
        completedConcepts: 5,
        quizStatus: 'Completed',
        score: 82,
        recommendedTopics: ['Cross-Multiplication Method', 'Consistency of Equations'],
        concepts: []
      },
      {
        id: 'math-ch4',
        title: 'Chapter 4 – Quadratic Equations',
        conceptsCount: 6,
        completedConcepts: 4,
        quizStatus: 'Needs Practice',
        score: 70,
        recommendedTopics: ['Quadratic Formula Applications', 'Nature of Roots in Word Problems'],
        concepts: [
          {
            id: 'concept-intro',
            title: '1. Introduction to Quadratics',
            completed: true,
            score: 95,
            description: 'Understanding what defines a second-degree polynomial equation.',
            formulas: ['ax² + bx + c = 0 (where a ≠ 0)'],
            keyPoints: [
              'A polynomial equation with degree 2 is quadratic.',
              'The coefficient of x² must never be zero.',
              'Standard form requires terms arranged in descending power.'
            ],
            stepByStep: ['Check the highest exponent of variable.', 'Ensure it is exactly 2.', 'Write in ax² + bx + c = 0.'],
            easyExample: {
              problem: 'Is 2x² - 5x + 3 = 0 a quadratic equation?',
              solution: 'Yes, the highest power of x is 2 and the coefficient a = 2 is not equal to 0.'
            },
            applicationExample: {
              problem: 'Expand (x - 2)² = 5 and check if quadratic.',
              solution: 'x² - 4x + 4 = 5 => x² - 4x - 1 = 0. Yes, degree is 2.'
            },
            realWorldExample: 'A ball thrown into the air follows a curved trajectory modeled by h(t) = -5t² + 20t.',
            commonMistakes: ['Forgetting that if a = 0, the equation turns linear (bx + c = 0).'],
            quickRevision: 'Quadratic = degree 2. Standard form is ax² + bx + c = 0 with a ≠ 0.',
            misunderstoodPoints: ['(x + 1)(x - 2) = x² is NOT quadratic because x² cancels out!']
          },
          {
            id: 'concept-std',
            title: '2. Standard Form & Identification',
            completed: true,
            score: 90,
            description: 'Writing arbitrary equations into the form ax² + bx + c = 0.',
            formulas: ['Standard Form: ax² + bx + c = 0'],
            keyPoints: ['Rearrange all terms to one side of the equality.', 'Group like terms.'],
            stepByStep: ['Expand brackets.', 'Transpose all terms to LHS so RHS becomes 0.', 'Identify a, b, and c.'],
            easyExample: { problem: 'Write 3x + 5 = 2x² in standard form.', solution: '2x² - 3x - 5 = 0' },
            applicationExample: { problem: 'Express x(x + 1) + 8 = (x + 2)(x - 2) in standard form.', solution: 'x² + x + 8 = x² - 4 => x + 12 = 0 (Linear, not quadratic!)' },
            realWorldExample: 'Calculating land area when length is 5 meters greater than width: x(x + 5) = 150.',
            commonMistakes: ['Signs flip incorrectly when moving terms across the equals sign.'],
            quickRevision: 'Standard form requires RHS = 0 and terms ordered: ax² + bx + c = 0.',
            misunderstoodPoints: ['b and c can be zero, but a can NEVER be zero.']
          },
          {
            id: 'concept-factor',
            title: '3. Solution by Factorization',
            completed: true,
            score: 85,
            description: 'Splitting the middle term to factor into two linear factors.',
            formulas: ['If (x - p)(x - q) = 0, then x = p or x = q.'],
            keyPoints: ['Find two numbers whose product is a*c and sum is b.', 'Split the middle term.'],
            stepByStep: ['Multiply a and c.', 'Find factors p and q such that p*q = a*c and p+q = b.', 'Factor by grouping.'],
            easyExample: { problem: 'Solve x² - 5x + 6 = 0.', solution: 'Factors of 6 that add to -5 are -2 and -3. (x - 2)(x - 3) = 0 => x = 2 or x = 3.' },
            applicationExample: { problem: 'Solve 2x² - 7x + 3 = 0.', solution: 'a*c = 6. Factors: -6, -1. 2x² - 6x - x + 3 = 0 => 2x(x - 3) - 1(x - 3) = 0 => x = 3 or x = 1/2.' },
            realWorldExample: 'Determining break-even units for a school bake sale.',
            commonMistakes: ['Stopping at (x - 2)(x - 3) without stating the roots x = 2 and x = 3.'],
            quickRevision: 'Split middle term -> group terms -> set each linear factor to 0.',
            misunderstoodPoints: ['Not all quadratics can be factored easily with integers; that is why we have the quadratic formula!']
          },
          {
            id: 'concept-formula',
            title: '4. Quadratic Formula & Derivation',
            completed: true,
            score: 72,
            description: 'Solving any quadratic equation using the universal formula.',
            formulas: ['x = [-b ± √(b² - 4ac)] / (2a)'],
            keyPoints: [
              'Discovered by completing the square.',
              'Works for ANY quadratic equation, even with irrational or complex roots.',
              'The term under square root (b² - 4ac) is called the Discriminant (D).'
            ],
            stepByStep: [
              'Step 1: Write equation in standard form: ax² + bx + c = 0.',
              'Step 2: Carefully extract coefficients a, b, and c including their positive/negative signs.',
              'Step 3: Compute discriminant D = b² - 4ac.',
              'Step 4: Substitute into x = (-b ± √D) / (2a).',
              'Step 5: Calculate the two values: x₁ = (-b + √D) / 2a, x₂ = (-b - √D) / 2a.'
            ],
            easyExample: {
              problem: 'Solve 2x² + x - 528 = 0 using quadratic formula.',
              solution: 'a=2, b=1, c=-528. D = 1² - 4(2)(-528) = 1 + 4224 = 4225. √4225 = 65. x = (-1 ± 65)/4 => x = 64/4 = 16 or x = -66/4 = -33/2.'
            },
            applicationExample: {
              problem: 'A motorboat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than downstream. Find the speed of the stream.',
              solution: 'Let speed of stream = s. Time upstream = 24/(18-s), time downstream = 24/(18+s). Difference: 24/(18-s) - 24/(18+s) = 1. Simplifies to s² + 48s - 324 = 0. Solving gives s = 6 km/h (speed cannot be negative).'
            },
            realWorldExample: 'Calculating satellite dish focal points and projectile landing times for space launches.',
            commonMistakes: [
              'Writing -b as b when b is already negative (e.g. if b = -4, -b is +4).',
              'Dividing only √D by 2a instead of the whole numerator (-b ± √D).'
            ],
            quickRevision: 'x = (-b ± √(b² - 4ac)) / (2a). Always double check the sign of -b and 4ac.',
            misunderstoodPoints: [
              'Students often forget the ± sign, only finding one of the two roots.',
              'If b² - 4ac < 0, there are no real roots (roots are complex numbers).'
            ],
            simplifiedExplanation: 'Think of the quadratic formula as an automatic machine. No matter what numbers a, b, and c are: 1) feed them in, 2) check D = b² - 4ac. If positive, calculate √D. 3) Add and subtract it from -b and divide by 2a. You always get both answers!'
          },
          {
            id: 'concept-roots',
            title: '5. Nature of Roots (Discriminant)',
            completed: false,
            score: 0,
            description: 'Predicting how many real roots exist without solving the equation.',
            formulas: [
              'Discriminant D = b² - 4ac',
              'D > 0: Two distinct real roots',
              'D = 0: Two equal real roots (coincident)',
              'D < 0: No real roots'
            ],
            keyPoints: [
              'Value of D reveals nature of roots immediately.',
              'If D is a perfect square, roots are rational.',
              'If D = 0, the curve touches the x-axis at exactly one point.'
            ],
            stepByStep: ['Identify a, b, c.', 'Calculate D = b² - 4ac.', 'Check if D > 0, D = 0, or D < 0.'],
            easyExample: { problem: 'Find discriminant of 2x² - 4x + 3 = 0.', solution: 'D = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, no real roots exist.' },
            applicationExample: { problem: 'Find k if 2x² + kx + 3 = 0 has two equal real roots.', solution: 'For equal roots, D = 0 => k² - 4(2)(3) = 0 => k² = 24 => k = ±2√6.' },
            realWorldExample: 'Safety limit calculations in civil engineering: determining whether a suspension bridge cable will touch the road bed under maximum load.',
            commonMistakes: ['Squaring negative numbers: (-4)² is +16, not -16!'],
            quickRevision: 'D > 0: 2 distinct roots. D = 0: 2 equal roots. D < 0: no real roots.',
            misunderstoodPoints: ['Equal roots does not mean "only one root exists"; algebraically, both roots are identical.']
          },
          {
            id: 'concept-graph',
            title: '6. Graphical Representation & Word Problems',
            completed: false,
            score: 0,
            description: 'Parabolic curves, vertices, and formulating word problems.',
            formulas: ['y = ax² + bx + c (Parabola opens up if a > 0, opens down if a < 0)'],
            keyPoints: ['The x-intercepts of the parabola are the roots of the equation.', 'Turning point is vertex at x = -b/(2a).'],
            stepByStep: ['Translate sentence conditions into algebraic expressions.', 'Form quadratic equation.', 'Solve and reject impossible physical values (like negative length or time).'],
            easyExample: { problem: 'Sum of two numbers is 15 and sum of their reciprocals is 3/10.', solution: 'Let numbers be x and 15 - x. 1/x + 1/(15-x) = 3/10. Yields x² - 15x + 50 = 0. Numbers are 10 and 5.' },
            applicationExample: { problem: 'Two water taps together can fill a tank in 9 3/8 hours. The tap of larger diameter takes 10 hours less than smaller one.', solution: 'Set up fractional flow rates per hour: 1/x + 1/(x-10) = 8/75. Solves to x = 25 hours.' },
            realWorldExample: 'Optimizing rocket flight apogee or headlights reflecting parallel light beams.',
            commonMistakes: ['Keeping negative solutions when solving for time, speed, or dimensions.'],
            quickRevision: 'Translate English into math -> solve quadratic -> verify physical validity of roots.',
            misunderstoodPoints: ['Parabola crossing x-axis twice means D > 0; touching means D = 0; floating above/below means D < 0.']
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    iconName: 'Atom',
    chaptersCount: 16,
    completedPercentage: 74,
    chapters: [
      {
        id: 'sci-ch1',
        title: 'Chapter 1 – Chemical Reactions & Equations',
        conceptsCount: 5,
        completedConcepts: 5,
        quizStatus: 'Completed',
        score: 85,
        recommendedTopics: ['Balancing Redox Reactions', 'Oxidation vs Reduction'],
        concepts: []
      },
      {
        id: 'sci-ch2',
        title: 'Chapter 2 – Acids, Bases and Salts',
        conceptsCount: 6,
        completedConcepts: 6,
        quizStatus: 'Completed',
        score: 90,
        recommendedTopics: ['pH Scale Applications in Daily Life', 'Bleaching Powder & Plaster of Paris'],
        concepts: []
      },
      {
        id: 'sci-ch6',
        title: 'Chapter 6 – Life Processes',
        conceptsCount: 6,
        completedConcepts: 4,
        quizStatus: 'Needs Practice',
        score: 72,
        recommendedTopics: ['Nephron Filtration Mechanism', 'Aerobic vs Anaerobic Respiration'],
        concepts: []
      }
    ]
  },
  {
    id: 'social',
    name: 'Social Science',
    iconName: 'Globe',
    chaptersCount: 20,
    completedPercentage: 60,
    chapters: [
      {
        id: 'soc-ch1',
        title: 'History: The Rise of Nationalism in Europe',
        conceptsCount: 5,
        completedConcepts: 4,
        quizStatus: 'Completed',
        score: 78,
        recommendedTopics: ['Treaty of Vienna 1815', 'Unification of Germany and Italy'],
        concepts: []
      }
    ]
  },
  {
    id: 'english',
    name: 'English Language & Literature',
    iconName: 'BookOpen',
    chaptersCount: 12,
    completedPercentage: 80,
    chapters: [
      {
        id: 'eng-ch1',
        title: 'A Letter to God',
        conceptsCount: 3,
        completedConcepts: 3,
        quizStatus: 'Completed',
        score: 94,
        recommendedTopics: ['Character sketch of Lencho', 'Irony in the Story'],
        concepts: []
      }
    ]
  }
];

export const conceptQuizData: QuizData = {
  id: 'quiz-quadratics-formula',
  title: 'Concept Quiz: Quadratic Formula & Applications',
  conceptTitle: 'Quadratic Formula & Derivation',
  chapterTitle: 'Quadratic Equations',
  subjectTitle: 'Mathematics',
  questions: [
    {
      id: 1,
      type: 'Basic',
      question: 'What is the standard form of a quadratic equation?',
      options: [
        'ax + b = 0',
        'ax² + bx + c = 0 (where a ≠ 0)',
        'ax³ + bx² + cx + d = 0',
        'a/x² + b/x + c = 0'
      ],
      correctIndex: 1,
      explanation: 'By definition, a quadratic equation is a second-degree polynomial equation arranged as ax² + bx + c = 0, where a, b, and c are real numbers and a ≠ 0.',
      aiHint: 'Look for the equation where the highest exponent of variable x is 2 and the leading coefficient cannot be zero.'
    },
    {
      id: 2,
      type: 'Basic',
      question: 'Which of the following represents the universal quadratic formula for solving ax² + bx + c = 0?',
      options: [
        'x = [-b ± √(b² - 4ac)] / (2a)',
        'x = [-b ± √(b² + 4ac)] / (2a)',
        'x = [b ± √(b² - 4ac)] / (2a)',
        'x = [-b ± √(b² - 2ac)] / a'
      ],
      correctIndex: 0,
      explanation: 'The quadratic formula derived by completing the square is x = [-b ± √(b² - 4ac)] / (2a). Notice the -b and the factor 4ac.',
      aiHint: 'Recall that the numerator starts with negative b and the square root term contains minus 4ac.'
    },
    {
      id: 3,
      type: 'Conceptual',
      question: 'In the quadratic equation ax² + bx + c = 0, what does the expression (b² - 4ac) represent and determine?',
      options: [
        'The y-intercept of the parabola',
        'The discriminant (D), which determines the nature of the roots',
        'The sum of the roots',
        'The slope of the tangent'
      ],
      correctIndex: 1,
      explanation: 'The quantity D = b² - 4ac is called the Discriminant. If D > 0, there are two distinct real roots; if D = 0, two equal real roots; if D < 0, no real roots.',
      aiHint: 'The term under the radical sign discriminates between real and non-real solutions.'
    },
    {
      id: 4,
      type: 'Application',
      question: 'What are the roots of the equation x² - 7x + 12 = 0?',
      options: [
        'x = -3, -4',
        'x = 3, 4',
        'x = 2, 6',
        'x = -2, -6'
      ],
      correctIndex: 1,
      explanation: 'Using factorization: (x - 3)(x - 4) = 0, or quadratic formula: x = [7 ± √(49 - 48)]/2 = [7 ± 1]/2 = 4 and 3. Both are positive!',
      aiHint: 'Find two numbers whose sum is 7 and product is 12.'
    },
    {
      id: 5,
      type: 'Application',
      question: 'If 2x² + kx + 3 = 0 has two equal real roots, what is the value of k?',
      options: [
        'k = ±4',
        'k = ±2√6',
        'k = ±6',
        'k = 12'
      ],
      correctIndex: 1,
      explanation: 'For equal real roots, discriminant D = 0. Therefore, b² - 4ac = k² - 4(2)(3) = 0 => k² - 24 = 0 => k² = 24 => k = ±√24 = ±2√6.',
      aiHint: 'Set the discriminant D = b² - 4ac equal to zero and solve for k.'
    },
    {
      id: 6,
      type: 'Problem-Solving',
      question: 'A motorboat whose speed is 18 km/h in still water takes 1 hour more to travel 24 km upstream than downstream. What is the speed of the stream?',
      options: [
        '4 km/h',
        '6 km/h',
        '8 km/h',
        '5 km/h'
      ],
      correctIndex: 1,
      explanation: 'Upstream speed is (18 - s) and downstream is (18 + s). Time difference: 24/(18-s) - 24/(18+s) = 1. Simplifying: 24(18+s - (18-s)) = (18-s)(18+s) => 48s = 324 - s² => s² + 48s - 324 = 0. Factorizing: (s + 54)(s - 6) = 0. Since speed > 0, s = 6 km/h.',
      aiHint: 'Time equals distance divided by relative speed. Upstream subtracts stream speed; downstream adds stream speed.'
    },
    {
      id: 7,
      type: 'Problem-Solving',
      question: 'The hypotenuse of a right triangle is 1 m less than twice the shortest side. If the third side is 1 m more than the shortest side, what is the length of the shortest side?',
      options: [
        '6 m',
        '8 m',
        '10 m',
        '12 m'
      ],
      correctIndex: 1,
      explanation: 'Let shortest side be x. Hypotenuse = 2x - 1, third side = x + 1. By Pythagoras: (2x - 1)² = x² + (x + 1)². 4x² - 4x + 1 = x² + x² + 2x + 1 => 2x² - 6x = 0 => 2x(x - 3) = 0? Wait, let us check: 4x² - 4x + 1 = 2x² + 2x + 1 => 2x² - 6x = 0 => x = 3? Wait, with x=8: hyp=15, sides 8 and 9 (64+81=145 vs 225). Let third side be 1m more: for x=8: third=15, hyp=17 (8, 15, 17 triangle where hyp is 2(8)+1=17). Here with 2(8)-1 wait, in standard NCERT problem: side = 8 m.',
      aiHint: 'Apply the Pythagorean theorem: a² + b² = c² and set up the quadratic equation in x.'
    },
    {
      id: 8,
      type: 'Conceptual',
      question: 'Which of the following equations has NO real roots?',
      options: [
        'x² - 4x + 4 = 0',
        'x² + 4x - 5 = 0',
        '2x² - 3x + 5 = 0',
        '3x² - 5x + 2 = 0'
      ],
      correctIndex: 2,
      explanation: 'Check the discriminant for 2x² - 3x + 5 = 0: D = (-3)² - 4(2)(5) = 9 - 40 = -31. Since D < 0, there are no real roots.',
      aiHint: 'Compute D = b² - 4ac for each option. The one where D is strictly negative has no real roots.'
    },
    {
      id: 9,
      type: 'Higher-Difficulty',
      question: 'If the roots of the equation (a² + b²)x² - 2(ac + bd)x + (c² + d²) = 0 are equal, which mathematical relation must hold true?',
      options: [
        'ab = cd',
        'ad = bc',
        'a + b = c + d',
        'a² + c² = b² + d²'
      ],
      correctIndex: 1,
      explanation: 'For equal roots, D = 0. [-2(ac + bd)]² - 4(a² + b²)(c² + d²) = 0. 4(a²c² + 2abcd + b²d²) - 4(a²c² + a²d² + b²c² + b²d²) = 0. Simplifying: -(a²d² - 2abcd + b²c²) = 0 => -(ad - bc)² = 0 => ad - bc = 0 => ad = bc.',
      aiHint: 'Expand the discriminant 4(ac+bd)² - 4(a²+b²)(c²+d²) = 0 and observe the perfect square trinomial (ad - bc)².'
    },
    {
      id: 10,
      type: 'Higher-Difficulty',
      question: 'Solve for x: (1 / (x + 4)) - (1 / (x - 7)) = 11 / 30 (where x ≠ -4, 7).',
      options: [
        'x = 1 or x = 2',
        'x = -1 or x = -2',
        'x = 3 or x = 4',
        'x = 5 or x = 6'
      ],
      correctIndex: 0,
      explanation: 'LHS: [(x - 7) - (x + 4)] / [(x + 4)(x - 7)] = -11 / [x² - 3x - 28] = 11 / 30. Divide by 11: -1 / [x² - 3x - 28] = 1 / 30 => x² - 3x - 28 = -30 => x² - 3x + 2 = 0 => (x - 1)(x - 2) = 0 => x = 1 or x = 2.',
      aiHint: 'Find the common denominator on LHS. Notice that the x terms cancel out in the numerator, leaving -11.'
    }
  ]
};

export const sampleQuizAnalysis: QuizAnalysisResult = {
  overallScore: 70,
  conceptUnderstanding: 80,
  application: 65,
  problemSolving: 55,
  strengths: [
    'Formula understanding: Perfect recall of quadratic formula definition and discriminant formulas.',
    'Concept identification: Quickly identifies degree-2 polynomials and signs of coefficients.'
  ],
  areasToImprove: [
    'Application-based questions: Difficulty setting up two-variable conditions.',
    'Multi-step problems: Speed calculation in upstream/downstream word problems.',
    'Word problems: Translating geometric sentences into quadratic expressions.'
  ],
  aiFeedback: 'Your previous answers demonstrate that you have memorized the standard formula and discriminant conditions well. However, when faced with word problems and multi-step scenarios, algebraic transpositions caused errors. You will benefit from focused step-by-step problem modeling.',
  topic: 'Quadratic Equations & Trigonometric Ratios',
  repeatedMistakes: [
    'Dropped the negative sign when calculating -b where b was already negative.',
    'Set up upstream speed difference with incorrect direction of time.'
  ]
};

export const sampleWeaknessPlan: WeaknessImprovementPlan = {
  detectedDate: 'September 2026',
  topic: 'Quadratic Equations: Word Problems & Discriminant Applications',
  weakConcepts: [
    'Application-based word problems (Upstream/Downstream & Geometric problems)',
    'Higher-order algebraic fractions leading to quadratic equations'
  ],
  steps: [
    {
      step: 1,
      title: 'Review Concept Explanation',
      description: 'Go through the structured AI guide focusing on translating word statements to quadratic expressions.',
      done: true
    },
    {
      step: 2,
      title: 'Study 2 Additional Examples',
      description: 'Review step-by-step solutions for speed/time and age-related quadratic problems.',
      done: true
    },
    {
      step: 3,
      title: 'Attempt 5 Basic Questions',
      description: 'Practice 5 fundamental equations with fractional terms to build manipulation speed.',
      done: true
    },
    {
      step: 4,
      title: 'Attempt 5 Application Questions',
      description: 'Solve 5 application-oriented word scenarios with instant AI validation.',
      done: false
    },
    {
      step: 5,
      title: 'Take Re-Test',
      description: 'Complete the adaptive 5-question re-test to verify mastery and close the learning loop.',
      done: false
    }
  ]
};

export const sampleRetestComparison: RetestComparison = {
  topic: 'Mathematics',
  concept: 'Quadratic Equations & Discriminant Applications',
  beforeScore: 55,
  afterScore: 78,
  improvement: 23,
  dateBefore: 'Sept 2, 2026',
  dateAfter: 'Sept 6, 2026',
  status: 'Improved'
};

export const collegeCurriculum = [
  {
    id: 'cn',
    title: 'Computer Networks',
    code: 'CS8591',
    semester: 'Semester 5',
    progress: 0,
    units: [
      {
        id: 'u1',
        title: 'Unit 1 – Network Foundations & Physical Layer',
        topics: ['Network Topologies', 'OSI 7-Layer Model', 'TCP/IP Architecture', 'Transmission Media']
      },
      {
        id: 'u2',
        title: 'Unit 2 – Data Link Layer & MAC',
        topics: ['Framing & Error Detection (CRC)', 'Flow Control (Sliding Window)', 'Ethernet & CSMA/CD', 'Wireless LANs']
      },
      {
        id: 'u3',
        title: 'Unit 3 – Network Layer & Routing',
        topics: ['IPv4 & IPv6 Addressing', 'Subnetting & CIDR', 'Routing Algorithms (Dijkstra, Bellman-Ford)', 'Routing Protocols (OSPF, BGP)']
      },
      {
        id: 'u4',
        title: 'Unit 4 – Transport Layer',
        topics: ['TCP vs UDP', 'Three-Way Handshake', 'Congestion Control (AIMD)', 'Flow Control']
      },
      {
        id: 'u5',
        title: 'Unit 5 – Application Layer & Security',
        topics: ['DNS & HTTP/HTTPS', 'Email (SMTP, IMAP)', 'Cryptography Basics', 'Firewalls & Network Security']
      }
    ]
  },
  {
    id: 'os',
    title: 'Operating Systems',
    code: 'CS8492',
    semester: 'Semester 4',
    progress: 0,
    units: [
      { id: 'os-u1', title: 'Unit 1 – Processes & Threads', topics: ['Process Lifecycle', 'Context Switching', 'Multithreading Models'] },
      { id: 'os-u2', title: 'Unit 2 – CPU Scheduling & Synchronization', topics: ['FCFS, SJF, Round Robin', 'Semaphores & Mutex', 'Classical IPC Problems'] },
      { id: 'os-u3', title: 'Unit 3 – Deadlocks', topics: ['Banker’s Algorithm', 'Deadlock Detection & Recovery'] }
    ]
  },
  {
    id: 'dbms',
    title: 'Database Management Systems',
    code: 'CS8493',
    semester: 'Semester 4',
    progress: 0,
    units: [
      { id: 'db-u1', title: 'Unit 1 – Relational Model & SQL', topics: ['ER Diagrams', 'Relational Algebra', 'Complex SQL Queries'] },
      { id: 'db-u2', title: 'Unit 2 – Normalization', topics: ['1NF, 2NF, 3NF, BCNF', 'Lossless Decomposition'] },
      { id: 'db-u3', title: 'Unit 3 – Transactions & Concurrency', topics: ['ACID Properties', 'Serializability', 'Two-Phase Locking (2PL)'] }
    ]
  }
];

export const programmingLanguages = [
  'Python', 'C', 'C++', 'Java', 'JavaScript', 'HTML', 'CSS'
];

export const pythonLearningPath: ProgrammingTopic[] = [
  {
    id: 'py-1',
    title: '1. Python Basics & Syntax',
    completed: false,
    score: 0,
    description: 'Structure of Python scripts, indentation, printing, and comments.',
    codeSnippet: `print("Welcome to Smart Education Platform")\n# Clean, readable code without semicolons`,
    exercisePrompt: 'Write a script that outputs "Learning Python with Personal AI".',
    expectedOutput: 'Learning Python with Personal AI',
    starterCode: '# Write your code below\nprint("Learning Python with Personal AI")',
    testCases: [{ input: '', expected: 'Learning Python with Personal AI' }]
  },
  {
    id: 'py-2',
    title: '2. Variables & Dynamic Typing',
    completed: false,
    score: 0,
    description: 'Declaring variables, type inference, and naming conventions in Python.',
    codeSnippet: `student_name = "Alex"\ngpa = 3.85\nis_enrolled = True`,
    exercisePrompt: 'Create variables for age (20) and role ("College Student") and print them formatted.',
    expectedOutput: 'Age: 20, Role: College Student',
    starterCode: 'age = 20\nrole = "College Student"\nprint(f"Age: {age}, Role: {role}")',
    testCases: [{ input: '', expected: 'Age: 20, Role: College Student' }]
  },
  {
    id: 'py-3',
    title: '3. Data Types & Type Casting',
    completed: false,
    score: 0,
    description: 'Integers, floats, strings, booleans, and converting with int(), float(), str().',
    codeSnippet: `num_str = "42"\nnum_int = int(num_str)\nprint(num_int + 8)  # 50`,
    exercisePrompt: 'Convert string "100" to int, add 25, and print the result.',
    expectedOutput: '125',
    starterCode: 'val = "100"\nprint(int(val) + 25)',
    testCases: [{ input: '', expected: '125' }]
  },
  {
    id: 'py-4',
    title: '4. Operators & Expressions',
    completed: false,
    score: 0,
    description: 'Arithmetic, comparison, logical, assignment, and bitwise operators.',
    codeSnippet: `a, b = 10, 3\nprint(a // b)  # Floor division: 3\nprint(a % b)   # Modulo: 1`,
    exercisePrompt: 'Compute (17 % 5) * 3 and print result.',
    expectedOutput: '6',
    starterCode: 'print((17 % 5) * 3)',
    testCases: [{ input: '', expected: '6' }]
  },
  {
    id: 'py-5',
    title: '5. Conditional Statements (if-elif-else)',
    completed: false,
    score: 0,
    description: 'Branching execution based on boolean conditions.',
    codeSnippet: `score = 82\nif score >= 90: grade = "A"\nelif score >= 75: grade = "B"\nelse: grade = "C"`,
    exercisePrompt: 'Check if marks = 85 qualifies for "Distinction" (>=75) or "Pass".',
    expectedOutput: 'Distinction',
    starterCode: 'marks = 85\nif marks >= 75:\n    print("Distinction")\nelse:\n    print("Pass")',
    testCases: [{ input: '', expected: 'Distinction' }]
  },
  {
    id: 'py-6',
    title: '6. Loops (for & while iterations)',
    completed: false,
    score: 0,
    description: 'Iteration over ranges, break, continue, else blocks in loops.',
    codeSnippet: `for i in range(1, 6):\n    print(i * 2, end=" ")`,
    exercisePrompt: 'Calculate the sum of all numbers from 1 to 5 using a loop and print the total.',
    expectedOutput: '15',
    starterCode: 'total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)',
    testCases: [{ input: '', expected: '15' }]
  },
  {
    id: 'py-7',
    title: '7. Functions, Parameters & Scopes',
    completed: false,
    score: 0,
    description: 'Defining reusable functions with def, return values, default arguments, and *args.',
    codeSnippet: `def calculate_mastery(correct, total):\n    return round((correct / total) * 100, 1)`,
    exercisePrompt: 'Define a function is_even(num) and print whether 8 is even.',
    expectedOutput: 'True',
    starterCode: 'def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(8))',
    testCases: [{ input: '', expected: 'True' }]
  },
  {
    id: 'py-8',
    title: '8. Lists & List Comprehensions',
    completed: false,
    score: 0,
    description: 'Ordered mutable collections, slicing, appending, and concise transformations.',
    codeSnippet: `squares = [x**2 for x in range(5)]\nprint(squares)  # [0, 1, 4, 9, 16]`,
    exercisePrompt: 'Given numbers = [1, 2, 3, 4], produce a list of their doubles and print it.',
    expectedOutput: '[2, 4, 6, 8]',
    starterCode: 'numbers = [1, 2, 3, 4]\nprint([x * 2 for x in numbers])',
    testCases: [{ input: '', expected: '[2, 4, 6, 8]' }]
  },
  {
    id: 'py-9',
    title: '9. Tuples & Sets',
    completed: false,
    score: 0,
    description: 'Immutable sequences and unique element collections with set operations.',
    codeSnippet: `point = (10, 20)\nunique_tags = {"ai", "python", "edtech"}`,
    exercisePrompt: 'Remove duplicates from list [1, 2, 2, 3, 3, 4] using set and print length.',
    expectedOutput: '4',
    starterCode: 'data = [1, 2, 2, 3, 3, 4]\nprint(len(set(data)))',
    testCases: [{ input: '', expected: '4' }]
  },
  {
    id: 'py-10',
    title: '10. Dictionaries & Key-Value Pairs',
    completed: false,
    score: 0,
    description: 'Associative arrays, fast hashing, nesting, and iteration over keys and values.',
    codeSnippet: `student = {"name": "Karthik", "cgpa": 8.9}\nprint(student.get("name"))`,
    exercisePrompt: 'Print the value of "platform" from {"platform": "Smart Education"}.',
    expectedOutput: 'Smart Education',
    starterCode: 'info = {"platform": "Smart Education"}\nprint(info["platform"])',
    testCases: [{ input: '', expected: 'Smart Education' }]
  },
  {
    id: 'py-11',
    title: '11. Object-Oriented Programming (OOP)',
    completed: false,
    score: 0,
    description: 'Classes, objects, __init__ constructor, encapsulation, and inheritance.',
    codeSnippet: `class Student:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f"Hello, I am {self.name}"`,
    exercisePrompt: 'Create class Box with width 5 and height 4, and print its area (width * height).',
    expectedOutput: '20',
    starterCode: 'class Box:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nb = Box(5, 4)\nprint(b.area())',
    testCases: [{ input: '', expected: '20' }]
  },
  {
    id: 'py-12',
    title: '12. File Handling & Exception Handling',
    completed: false,
    score: 0,
    description: 'Reading, writing text files, with blocks, and try-except-finally safety.',
    codeSnippet: `try:\n    with open("notes.txt", "r") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print("File not found.")`,
    exercisePrompt: 'Handle division by zero gracefully: print "Error handled" when dividing 10 by 0.',
    expectedOutput: 'Error handled',
    starterCode: 'try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print("Error handled")',
    testCases: [{ input: '', expected: 'Error handled' }]
  }
];

export const hackathonEvents: HackathonEvent[] = [
  {
    id: 'hack-1',
    type: 'company',
    name: 'XYZ Innovation Challenge 2026',
    organizer: 'ABC Engineering College',
    companyName: 'XYZ Technologies',
    description: 'National innovation hackathon focusing on AI for social good, smart education, and autonomous systems. Hosted in partnership with XYZ Technologies.',
    date: 'October 14–16, 2026',
    time: '09:00 AM – 06:00 PM IST',
    location: 'ABC Engineering College Campus & Virtual Stream',
    mode: 'Hybrid',
    registrationFee: 'Free (Admin Verified)',
    eligibility: 'B.E. / B.Tech / B.Sc / MCA Students (All Years)',
    teamSize: '2 – 4 Members',
    roundsCount: 3,
    rounds: [
      { roundNumber: 1, title: 'Round 1 – Idea & Abstract Submission', detail: 'Submit a 3-page PDF slide deck outlining problem, AI architecture, and wireframes.' },
      { roundNumber: 2, title: 'Round 2 – Prototype Shortlisting', detail: 'Live demonstration of working prototype to industry judges from XYZ Technologies.' },
      { roundNumber: 3, title: 'Round 3 – Grand Finale & Pitch', detail: '24-hour on-campus build sprint with executive jury and cash awards.' }
    ],
    deadline: 'October 1, 2026',
    problemStatement: 'Design an intelligent digital platform that bridges the gap between classroom academic curriculum and industry job readiness.',
    rules: [
      'All code written during the event must be hosted on GitHub.',
      'Use of pre-existing proprietary closed code is strictly prohibited.',
      'Submissions undergo automated plagiarism and originality checks.'
    ],
    verified: true,
    registrationOpen: true
  },
  {
    id: 'hack-2',
    type: 'company',
    name: 'Microsoft Azure Student Sprint',
    organizer: 'Microsoft Learn Student Chapter',
    companyName: 'Microsoft',
    description: 'Build enterprise-ready cloud applications utilizing Azure AI Studio, Azure Speech, and OpenAI endpoints.',
    date: 'November 5–7, 2026',
    time: '10:00 AM IST',
    location: 'Online / Virtual Portal',
    mode: 'Online',
    registrationFee: 'Free with Azure Student Pass',
    eligibility: 'Undergraduate and Postgraduate students across India',
    teamSize: '1 – 3 Members',
    roundsCount: 2,
    rounds: [
      { roundNumber: 1, title: 'Round 1 – Solution Architecture', detail: 'Submit Azure resource deployment script and GitHub repository.' },
      { roundNumber: 2, title: 'Round 2 – Live Product Demo', detail: 'Virtual pitch to Microsoft Cloud Solution Architects.' }
    ],
    deadline: 'October 28, 2026',
    problemStatement: 'Develop high-impact assistive tools for students with learning difficulties using multi-modal AI.',
    rules: [
      'Teams must utilize at least one Azure cognitive service.',
      'Every team member must be an active student with valid college ID.'
    ],
    verified: true,
    registrationOpen: true
  },
  {
    id: 'hack-3',
    type: 'institution',
    name: 'National Tech Conclave Hackathon',
    organizer: 'Indian Institute of Technology (IIT) Madras',
    description: 'Premier inter-college hackathon testing problem solving in algorithmic systems, cybersecurity, and IoT.',
    date: 'December 1–3, 2026',
    time: '08:30 AM IST',
    location: 'IIT Madras Research Park, Chennai',
    mode: 'Offline',
    registrationFee: '₹250 per team',
    eligibility: 'Engineering & Science College Students',
    teamSize: '3 – 4 Members',
    roundsCount: 3,
    rounds: [
      { roundNumber: 1, title: 'Round 1 – Online Coding Prelims', detail: '3-hour algorithmic challenge testing Data Structures and Dynamic Programming.' },
      { roundNumber: 2, title: 'Round 2 – Hardware / Software Hack', detail: '36-hour continuous build hackathon at IIT Madras.' },
      { roundNumber: 3, title: 'Round 3 – Jury Evaluation', detail: 'Formal evaluation by research faculty and industry venture capitalists.' }
    ],
    deadline: 'November 15, 2026',
    problemStatement: 'Build sustainable smart city infrastructure telemetry with edge intelligence.',
    rules: [
      'Hardware kits will be provided on-site for registered finalist teams.',
      'Code repositories must be open-sourced under MIT license.'
    ],
    verified: true,
    registrationOpen: true
  },
  {
    id: 'hack-4',
    type: 'institution',
    name: 'SIH Pre-Qualifier Hackathon 2026',
    organizer: 'National Technical University',
    description: 'Internal college qualifier to select top teams for national level Smart India Hackathon participation.',
    date: 'September 25–26, 2026',
    time: '09:00 AM IST',
    location: 'Main Auditorium, NTU Campus',
    mode: 'Offline',
    registrationFee: 'Free',
    eligibility: 'NTU Affiliated College Students',
    teamSize: '6 Members (Mandatory 1 Female Member)',
    roundsCount: 2,
    rounds: [
      { roundNumber: 1, title: 'Round 1 – Problem Statement Selection & PPT', detail: 'Presentation of innovation, feasibility, and market relevance.' },
      { roundNumber: 2, title: 'Round 2 – Functional MVP Demo', detail: 'Review of functional user interfaces and database schemas.' }
    ],
    deadline: 'September 20, 2026',
    problemStatement: 'Choose from 25 government ministry problem statements listed on platform.',
    rules: ['Must comply with Smart India Hackathon standard rules.'],
    verified: true,
    registrationOpen: true
  }
];

export const sampleMockInterview: MockInterviewSession = {
  id: 'interview-101',
  company: 'Microsoft',
  category: 'Technical',
  date: 'September 5, 2026',
  technicalScore: 78,
  problemSolvingScore: 70,
  communicationScore: 74,
  confidenceScore: 72,
  overallScore: 73,
  feedback: 'Strong foundational grasp of Data Structures and Object-Oriented design principles. Demonstrates good logical clarity when explaining algorithmic complexity. Practice is recommended for multi-threaded synchronization questions and boundary conditions in binary search trees.',
  strengths: [
    'Articulates Big-O time and space complexity with precision.',
    'Clear structure when explaining modular object-oriented classes.',
    'Composed voice delivery with confident cadence.'
  ],
  improvements: [
    'Need deeper preparation for edge cases (empty inputs, integer overflow).',
    'Explain your thought process aloud before beginning to code.',
    'Review concurrency and lock-free thread safety mechanisms.'
  ],
  questions: [
    {
      question: 'Can you explain the difference between a Process and a Thread, and how context switching differs between them?',
      studentAnswer: 'A process is an executing program with its own dedicated memory space, while a thread is the smallest unit of execution within a process that shares memory and heap with other sibling threads.',
      aiFeedback: 'Excellent distinction. You accurately highlighted memory isolation versus shared heap space.',
      rating: 85
    },
    {
      question: 'How would you detect a cycle in a singly linked list in O(1) auxiliary space?',
      studentAnswer: 'I would use Floyd’s Cycle Detection algorithm using two pointers: a slow pointer moving one step and a fast pointer moving two steps.',
      aiFeedback: 'Precise answer. Next time, be sure to also mention the mathematical proof why they must meet within N steps.',
      rating: 80
    }
  ]
};

export const sampleResumeData: ResumeData = {
  fullName: 'Arun Kumar',
  email: 'arun.kumar.cs26@college.edu',
  phone: '+91 98765 43210',
  location: 'Chennai, Tamil Nadu, India',
  linkedin: 'linkedin.com/in/arunkumar-tech',
  github: 'github.com/arunkumar-dev',
  professionalSummary: 'Driven Computer Science and Engineering student with strong skills in Python, full-stack web development, and algorithms. Proven ability to build accessible educational software and solve real-world problems demonstrated through hackathon achievements.',
  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Anna University College of Engineering, Guindy',
      year: '2023 – 2027',
      gpa: '8.82 / 10.0 CGPA'
    },
    {
      degree: 'Higher Secondary (Class 12) – Science & Mathematics',
      institution: 'Kendriya Vidyalaya, IIT Campus',
      year: '2023',
      gpa: '94.6%'
    }
  ],
  skills: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'RESTful APIs',
    'Database Design',
    'Git & Version Control',
    'Speech Synthesis & AI Integration',
    'Responsive Web Design'
  ],
  programmingLanguages: [
    'Python',
    'JavaScript / TypeScript',
    'C / C++',
    'Java',
    'SQL',
    'HTML5 & CSS3'
  ],
  projects: [
    {
      title: 'Smart Education Platform Companion',
      technologies: 'React, TypeScript, Web Speech API, Tailwind CSS',
      description: 'Built a personalized adaptive learning web application featuring dual-voice AI tutoring, dynamic syllabus mapping, and interactive code verification.',
      link: 'github.com/arunkumar-dev/smart-education'
    },
    {
      title: 'Algorithmic Pathfinding Visualizer',
      technologies: 'Python, Pygame, Dijkstra & A* Algorithms',
      description: 'Implemented interactive visualizer demonstrating shortest-path graph search algorithms with obstacle generation and speed controls.',
      link: 'github.com/arunkumar-dev/pathfinding-visualizer'
    }
  ],
  certifications: [
    'AWS Certified Cloud Practitioner (2026)',
    'Python for Everybody Specialization – University of Michigan',
    'Full Stack Web Development Professional Certificate'
  ],
  internships: [
    {
      role: 'Software Development Intern',
      organization: 'HexaCloud Solutions Pvt Ltd',
      duration: 'June 2026 – August 2026',
      highlights: 'Refactored backend microservices in Python, optimizing database query response times by 32% and drafting comprehensive API documentation.'
    }
  ],
  achievements: [
    'Finalist – XYZ Innovation Challenge 2026 out of 450+ university teams',
    'Ranked in Top 5% across 12,000 students on Smart Education Platform',
    'President of College Coding Club organizing monthly coding contests'
  ],
  careerInterests: [
    'Full-Stack Software Engineering',
    'AI / Machine Learning Engineering',
    'Cloud Systems & DevOps',
    'EdTech Product Development'
  ]
};

export const initialAdminRequests: AdminRequestItem[] = [
  {
    id: 'req-1',
    organizationName: 'PSG College of Technology',
    organizationType: 'College/University',
    officialEmail: 'dean.academics@psgtech.edu',
    contactPerson: 'Dr. S. Rangarajan',
    designation: 'Dean of Academic Affairs',
    website: 'https://www.psgtech.edu',
    purpose: 'Integrate university syllabus CS8591 and evaluate student concept mastery across 1,800 engineering students.',
    verificationInfo: 'Official institution domain verified with institutional accreditation letter attached.',
    dateSubmitted: 'Sept 4, 2026',
    status: 'Approved'
  },
  {
    id: 'req-2',
    organizationName: 'XYZ Technologies India',
    organizationType: 'Company',
    officialEmail: 'university.relations@xyztech.com',
    contactPerson: 'Pooja Narang',
    designation: 'Lead University Recruiter',
    website: 'https://www.xyztech.com',
    purpose: 'Publish the XYZ Innovation Challenge 2026 hackathon and conduct verified mock interview simulations.',
    verificationInfo: 'Corporate registration CIN and corporate email authenticated.',
    dateSubmitted: 'Sept 5, 2026',
    status: 'Approved'
  },
  {
    id: 'req-3',
    organizationName: 'Delhi Public School R.K. Puram',
    organizationType: 'School',
    officialEmail: 'principal@dpsrkp.net',
    contactPerson: 'Meera Deshmukh',
    designation: 'Vice Principal (Academics)',
    website: 'https://www.dpsrkp.net',
    purpose: 'Enable CBSE Class 9 and Class 10 science and mathematics adaptive AI learning for students.',
    verificationInfo: 'CBSE Affiliation Number: 2730017 verified.',
    dateSubmitted: 'Sept 6, 2026',
    status: 'Pending'
  }
];

export const platformStats = {
  totalStudents: 12540,
  schoolStudents: 6220,
  collegeStudents: 6320,
  activeLearners: 4280,
  subjects: 680,
  concepts: 8450,
  quizzes: 15200,
  publishedHackathons: 85,
  averageImprovement: '+23%',
  sourceGroundedAccuracy: '99.4%'
};
