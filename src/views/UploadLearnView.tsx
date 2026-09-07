import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UploadCloud, Sparkles, ArrowRight, BookOpen, Check, Loader2, ClipboardList, Brain } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();

type Concept = { name: string; explanation: string; example?: string };
type QuizQuestion = { question: string; options: string[]; answer: number; explanation: string };
type Lesson = {
  title: string;
  subject: string;
  topic: string;
  summary: string;
  concepts: Concept[];
  keyPoints: string[];
  quiz: QuizQuestion[];
  fileName: string;
};

const steps = [
  'Upload Document', 'Read File', 'Extract Text', 'Understand Content', 'Detect Subject',
  'Find Topics', 'Extract Concepts', 'Explain Concepts', 'Generate Quiz', 'Analyze Performance'
];

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function extractText(file: File): Promise<string> {
  const ext = file.name.toLowerCase().split('.').pop();
  if (ext === 'txt') return file.text();

  if (ext === 'docx') {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value;
  }

  if (ext === 'pdf') {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const pages: string[] = [];
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      pages.push(content.items.map((item: any) => item.str || '').join(' '));
    }
    return pages.join('\n\n');
  }

  throw new Error('Please upload a PDF, DOCX, or TXT file.');
}

export const UploadLearnView: React.FC = () => {
  const { speakText, role, schoolProfile, collegeProfile } = useApp();
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [pastedText, setPastedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [uploadedDoc, setUploadedDoc] = useState('');
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quizIndex, setQuizIndex] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);
  const [quizSelections, setQuizSelections] = useState<Record<number, number>>({});
  const [error, setError] = useState('');

  const buildLocalLesson = (fileName: string, text: string): Lesson => {
    const clean = text.replace(/\s+/g, ' ').trim();
    const sentences = clean
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 20);
    const titleBase = fileName.replace(/\.(pdf|docx|txt)$/i, '').replace(/[_-]+/g, ' ').trim();
    const title = titleBase ? titleBase.replace(/\b\w/g, c => c.toUpperCase()) : 'Study Material';
    const definitionSentences = sentences.filter(s => /\b(is|are|means|refers to|defined as|known as|called)\b/i.test(s));
    const conceptSource = (definitionSentences.length ? definitionSentences : sentences).slice(0, 8);
    const concepts = conceptSource.map((sentence, index) => {
      const match = sentence.match(/^(.{2,70}?)\s+(?:is|are|means|refers to|defined as|known as|called)\s+/i);
      const name = match?.[1]?.replace(/^[,.:;\s]+|[,.:;\s]+$/g, '') || `Key Concept ${index + 1}`;
      return {
        name: name.length > 70 ? `Key Concept ${index + 1}` : name,
        explanation: sentence,
        example: sentences[index + 1] && sentences[index + 1] !== sentence ? sentences[index + 1] : undefined
      };
    });

    const keyPoints = Array.from(new Set(
      [...definitionSentences, ...sentences].map(s => s.replace(/^[-•*\d.)]+\s*/, '').trim())
    )).slice(0, 10);

    // Create MANY offline questions. We first use individual sentences, then
    // split longer material into smaller chunks so larger documents can produce
    // up to 50 questions without Gemini or any external API.
    const chunks: string[] = [];
    const addChunk = (value: string) => {
      const cleanChunk = value.replace(/\s+/g, ' ').trim();
      if (cleanChunk.length >= 25 && !chunks.includes(cleanChunk)) chunks.push(cleanChunk);
    };
    sentences.forEach(addChunk);

    if (chunks.length < 50) {
      const words = clean.split(/\s+/).filter(Boolean);
      const chunkSize = Math.max(35, Math.ceil(words.length / 50));
      for (let i = 0; i < words.length && chunks.length < 50; i += chunkSize) {
        addChunk(words.slice(i, i + chunkSize).join(' '));
      }
    }

    const quizCount = Math.min(50, chunks.length);
    const questionTemplates = [
      'Which statement is supported by the study material?',
      'Which statement correctly represents a point from the study material?',
      'Which statement is directly supported by the uploaded material?',
      'Which statement matches the material being studied?',
      'Which statement correctly reflects the provided content?'
    ];

    const quiz: QuizQuestion[] = [];
    for (let index = 0; index < quizCount; index += 1) {
      const correctSentence = chunks[index];
      const distractors: string[] = [];
      for (let offset = 1; offset < chunks.length && distractors.length < 3; offset += 1) {
        const candidate = chunks[(index + offset + (index % 5)) % chunks.length];
        if (candidate !== correctSentence && !distractors.includes(candidate)) distractors.push(candidate);
      }
      if (distractors.length < 3) break;

      const options = [correctSentence, ...distractors].map(x => x.length > 220 ? `${x.slice(0, 217)}...` : x);
      const shuffled = options
        .map((value, i) => ({ value, original: i }))
        .sort((a, b) => {
          const av = (a.value.length * 31 + a.original * 17 + index * 13) % 101;
          const bv = (b.value.length * 31 + b.original * 17 + index * 13) % 101;
          return av - bv;
        });
      const answer = shuffled.findIndex(item => item.original === 0);

      quiz.push({
        question: `Question ${index + 1}: ${questionTemplates[index % questionTemplates.length]}`,
        options: shuffled.map(item => item.value),
        answer,
        explanation: 'The correct statement is taken directly from the readable content of the uploaded material.'
      });
    }

    return {
      title,
      subject: 'Study Material',
      topic: `${sentences.length} readable sentences • ${quiz.length} quiz questions`,
      summary: sentences.slice(0, 5).join(' ') || clean.slice(0, 900),
      concepts: concepts.length ? concepts : [{ name: 'Main Content', explanation: clean.slice(0, 1000), example: sentences[1] }],
      keyPoints: keyPoints.length ? keyPoints : [clean.slice(0, 600)],
      quiz: quiz.length ? quiz : [{
        question: 'Which statement matches the uploaded study material?',
        options: [clean.slice(0, 180), 'The uploaded material contains no readable content.', 'The material is unrelated to the selected document.', 'The document could not be interpreted.'],
        answer: 0,
        explanation: 'The first option is taken directly from the readable uploaded content.'
      }],
      fileName
    };
  };

  const processText = async (fileName: string, text: string) => {
    if (!text.trim()) {
      setError('The file did not contain readable text. If it is a scanned PDF, use a text-based PDF or paste the content.');
      return;
    }

    setError('');
    setLesson(null);
    setQuizDone(false);
    setQuizAnswers([]);
    setQuizSelections({});
    setQuizIndex(-1);
    setSelectedAnswer(null);
    setUploadedDoc(fileName);
    setIsProcessing(true);

    try {
      speakText(`Reading ${fileName}. I will understand the content, explain the concepts, then generate a quiz.`);
      for (let i = 0; i < 8; i += 1) {
        setStepIndex(i);
        await wait(160);
      }

      // Fully local document learning: no Gemini API, no external AI service.
      // The browser extracts the file text and builds the lesson + quiz locally.
      const data = buildLocalLesson(fileName, text);

      setStepIndex(8);
      await wait(250);
      setStepIndex(9);
      setLesson(data);
      setQuizIndex(-1);
      setIsProcessing(false);
      speakText(`I finished analyzing the document. I found ${data.concepts?.length || 0} concepts and created ${data.quiz?.length || 0} quiz questions.`);
    } catch (err: any) {
      setIsProcessing(false);
      setStepIndex(-1);
      setError(err?.message || 'Could not process the file.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    try {
      const text = await extractText(file);
      await processText(file.name, text);
    } catch (err: any) {
      setError(err?.message || 'Could not read this file.');
    } finally {
      event.target.value = '';
    }
  };

  const startQuiz = () => {
    setQuizIndex(0);
    setQuizAnswers([]);
    setQuizSelections({});
    setSelectedAnswer(null);
    setQuizDone(false);
    speakText(`Now let us test what you understood. There are ${lesson?.quiz.length || 0} questions.`);
  };

  const chooseQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizSelections(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const submitAllQuiz = () => {
    if (!lesson || Object.keys(quizSelections).length < lesson.quiz.length) return;
    const answers = lesson.quiz.map((_, index) => quizSelections[index]);
    setQuizAnswers(answers);
    setQuizDone(true);
    const finalScore = answers.reduce((total, answer, index) => total + (answer === lesson.quiz[index].answer ? 1 : 0), 0);
    if (finalScore >= Math.ceil(lesson.quiz.length * 0.7)) confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    speakText(`Quiz complete. Your score is ${finalScore} out of ${lesson.quiz.length}.`);
  };

  const submitQuizAnswer = () => {
    if (!lesson || selectedAnswer === null) return;
    const nextAnswers = [...quizAnswers, selectedAnswer];
    setQuizAnswers(nextAnswers);

    if (quizIndex + 1 >= lesson.quiz.length) {
      setQuizDone(true);
      const finalScore = nextAnswers.reduce(
        (total, answer, index) => total + (answer === lesson.quiz[index].answer ? 1 : 0),
        0
      );
      if (finalScore >= Math.ceil(lesson.quiz.length * 0.7)) {
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      }
      speakText(`Quiz complete. Your score is ${finalScore} out of ${lesson.quiz.length}.`);
    } else {
      setQuizIndex((current) => current + 1);
      setSelectedAnswer(null);
    }
  };

  const score = lesson
    ? quizAnswers.reduce((total, answer, index) => total + (answer === lesson.quiz[index].answer ? 1 : 0), 0)
    : 0;
  const question = lesson?.quiz?.[quizIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3f2fd]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3f2fd] border border-[#90caf9] text-xs font-bold text-[#0d47a1]">
              <Sparkles className="w-3.5 h-3.5" /> Document Learning
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1] mt-2">Upload & Learn</h2>
            <p className="text-xs text-gray-600 mt-1">
              The file is read in your browser. Content, key points and a quiz are generated locally — no Gemini API is required.
            </p>
          </div>

          <div className="flex items-center bg-[#e3f2fd] p-1 rounded-2xl border border-[#90caf9] text-xs font-bold">
            <button
              type="button"
              onClick={() => setInputMode('upload')}
              className={`px-3.5 py-1.5 rounded-xl ${inputMode === 'upload' ? 'bg-[#0d47a1] text-white' : 'text-[#0d47a1]'}`}
            >Upload File</button>
            <button
              type="button"
              onClick={() => setInputMode('paste')}
              className={`px-3.5 py-1.5 rounded-xl ${inputMode === 'paste' ? 'bg-[#0d47a1] text-white' : 'text-[#0d47a1]'}`}
            >Paste Text</button>
          </div>
        </div>

        {inputMode === 'upload' ? (
          <div className="mt-6">
            <label className="relative block border-2 border-dashed border-[#90caf9] hover:border-[#2196f3] rounded-3xl p-8 text-center bg-[#e3f2fd]/30 cursor-pointer">
              <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} className="sr-only" disabled={isProcessing} />
              <div className="w-14 h-14 rounded-2xl bg-[#2196f3] text-white flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-[#0d47a1]">Upload notes, textbook pages, syllabus or study material</h4>
              <p className="text-xs text-gray-500 mt-1">PDF, DOCX and TXT — the text will be extracted locally and used to create multiple quiz questions.</p>
            </label>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <textarea
              rows={7}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your lesson / notes here..."
              className="w-full p-4 text-xs rounded-2xl bg-white border border-[#90caf9] text-[#0d47a1]"
            />
            <button
              type="button"
              disabled={!pastedText.trim() || isProcessing}
              onClick={() => processText('Pasted Study Material.txt', pastedText)}
              className="px-6 py-2.5 rounded-xl bg-[#2196f3] text-white text-xs font-bold flex items-center gap-2 disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4" /> Read & Teach Me
            </button>
          </div>
        )}

        {error && <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">{error}</div>}
      </section>

      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#0d47a1] uppercase tracking-wider">Local learning pipeline</h3>
            <p className="text-xs text-gray-500">Active source: <b>{uploadedDoc || 'No document selected'}</b></p>
          </div>
          {isProcessing && <span className="text-xs font-bold text-[#2196f3] flex items-center gap-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing...</span>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {steps.map((name, index) => (
            <div
              key={name}
              className={`p-3 rounded-2xl border text-xs ${stepIndex === index ? 'bg-[#2196f3] text-white border-[#2196f3]' : stepIndex > index ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-white/60 text-gray-400 border-gray-200'}`}
            >
              <div className="flex justify-between mb-1">
                <span className="text-[10px] font-black">{index + 1}</span>
                {stepIndex > index && <Check className="w-3.5 h-3.5" />}
              </div>
              <b className="text-[11px]">{name}</b>
            </div>
          ))}
        </div>
      </section>

      {lesson && !isProcessing && (
        <div className="space-y-6 animate-in fade-in">
          <section className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#2196f3]">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#0d47a1] text-white flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#2196f3]">Lesson generated locally</span>
                <h3 className="text-2xl font-black text-[#0d47a1]">{lesson.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{lesson.subject} • {lesson.topic}</p>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-[#e3f2fd] text-sm leading-7 text-gray-700">
              <b className="text-[#0d47a1]">Concept explained:</b> {lesson.summary}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-5">
              {lesson.concepts.map((concept, index) => (
                <div key={`${concept.name}-${index}`} className="p-4 rounded-2xl border border-[#90caf9] bg-white">
                  <div className="flex gap-2">
                    <Brain className="w-4 h-4 text-[#2196f3] mt-0.5" />
                    <b className="text-sm text-[#0d47a1]">{concept.name}</b>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 leading-6">{concept.explanation}</p>
                  {concept.example && <p className="text-[11px] mt-2 p-2 rounded-lg bg-gray-50"><b>Example:</b> {concept.example}</p>}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <b className="text-sm text-[#0d47a1]">Key points</b>
              <ul className="mt-2 space-y-1">
                {lesson.keyPoints.map((point, index) => (
                  <li key={`${point}-${index}`} className="text-xs text-gray-700 flex gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />{point}
                  </li>
                ))}
              </ul>
            </div>

            <button type="button" onClick={startQuiz} className="mt-6 px-5 py-3 rounded-xl bg-[#2196f3] text-white text-xs font-bold flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Start Quiz ({lesson.quiz.length} Questions) <ArrowRight className="w-4 h-4" />
            </button>
          </section>

          {quizIndex >= 0 && (
            <section className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#90caf9]">
              <div className="flex items-center gap-2 mb-5">
                <ClipboardList className="w-5 h-5 text-[#2196f3]" />
                <h3 className="text-lg font-black text-[#0d47a1]">Multiple-Question Quiz & Performance Analysis</h3>
              </div>

              {quizDone ? (
                <div className="text-center py-6">
                  <div className="text-4xl font-black text-[#0d47a1]">{score}/{lesson.quiz.length}</div>
                  <p className="text-sm font-bold mt-2">
                    {score >= Math.ceil(lesson.quiz.length * 0.7)
                      ? 'Good understanding — concepts are mostly clear.'
                      : 'Some concepts need revision. Review the explanations above and try again.'}
                  </p>
                  <div className="mt-5 grid md:grid-cols-3 gap-3 text-left">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200"><b className="text-xs">Correct</b><p className="text-xl font-black">{score}</p></div>
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200"><b className="text-xs">Needs review</b><p className="text-xl font-black">{lesson.quiz.length - score}</p></div>
                    <div className="p-4 rounded-2xl bg-[#e3f2fd] border border-[#90caf9]"><b className="text-xs">Accuracy</b><p className="text-xl font-black">{lesson.quiz.length ? Math.round((score / lesson.quiz.length) * 100) : 0}%</p></div>
                  </div>
                  <button type="button" onClick={startQuiz} className="mt-6 px-5 py-2.5 rounded-xl bg-[#0d47a1] text-white text-xs font-bold">Retake All {lesson.quiz.length} Questions</button>
                </div>
              ) : (
                <div>
                  <div className="mb-5 p-4 rounded-2xl bg-[#e3f2fd] border border-[#90caf9]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <b className="text-sm text-[#0d47a1]">{lesson.quiz.length} Questions</b>
                        <p className="text-xs text-gray-600 mt-1">Answer every question below, then submit the complete quiz.</p>
                      </div>
                      <span className="text-xs font-bold text-[#2196f3]">{Object.keys(quizSelections).length}/{lesson.quiz.length} answered</span>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {lesson.quiz.map((quizItem, qIndex) => (
                      <div key={quizItem.question + qIndex} className="p-5 rounded-2xl border border-[#90caf9] bg-white">
                        <div className="text-[11px] font-black text-[#2196f3] uppercase mb-2">Question {qIndex + 1} of {lesson.quiz.length}</div>
                        <h4 className="text-sm font-bold text-[#0d47a1] leading-6">{quizItem.question.replace(/^Question \d+: /, '')}</h4>
                        <div className="grid md:grid-cols-2 gap-2 mt-4">
                          {quizItem.options.map((option, optionIndex) => (
                            <button
                              type="button"
                              key={`${option}-${optionIndex}`}
                              onClick={() => chooseQuizAnswer(qIndex, optionIndex)}
                              className={`w-full p-3 rounded-xl border text-left text-xs ${quizSelections[qIndex] === optionIndex ? 'bg-[#2196f3] text-white border-[#2196f3]' : 'bg-white border-[#90caf9] text-gray-700'}`}
                            >
                              <b>{String.fromCharCode(65 + optionIndex)}.</b> {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={Object.keys(quizSelections).length < lesson.quiz.length}
                    onClick={submitAllQuiz}
                    className="mt-6 px-6 py-3 rounded-xl bg-[#0d47a1] text-white text-xs font-bold disabled:opacity-40"
                  >
                    Submit All {lesson.quiz.length} Questions
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
};
