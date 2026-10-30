export const projects = [
  {
    slug: 'cancercare-ai',
    title: 'CancerCare AI',
    role: 'Team Project · Text Classification',
    discipline: 'backend',
    disciplineLabel: 'Machine Learning',
    related: '',
    pdf: '/docs/cancercare-ai.pdf', // ✅ PDF
    summary:
      'A machine learning web app that classifies the type of cancer (thyroid, colon or lung) from medical research text, built to support faster early-stage screening.',
    highlights: [
      'Trained on 7,569 biomedical publications across three cancer classes',
      'Text preprocessing: cleaning, lowercasing, stopword removal and tokenization',
      'TF-IDF with Logistic Regression reaching 95.4% accuracy',
      'Saved the model with joblib and deployed it as a Streamlit app',
    ],
    tech: ['Python', 'Scikit-learn', 'TF-IDF', 'Logistic Regression', 'Streamlit'],
    link: 'https://cancercare-ai.streamlit.app',
    images: [
      {
        src: '/images/proj-cancercare-ai-1.png',
        caption: 'Prediction App',
        desc: 'Streamlit interface where medical text is entered and the cancer type is predicted.',
        mock: { hue: 340, variant: 1 },
      },
      {
        src: '/images/proj-cancercare-ai-2.png',
        caption: 'Confusion Matrix',
        desc: 'Per-class results showing lung cancer fully correct and minor overlap between colon and thyroid.',
        mock: { hue: 200, variant: 0 },
      },
      {
        src: '/images/proj-cancercare-ai-3.png',
        caption: 'Word Clouds',
        desc: 'Most frequent terms in thyroid, colon and lung cancer publications.',
        mock: { hue: 150, variant: 2 },
      },
    ],
    story: {
      title: 'Turning long biomedical text into a quick first-look classifier',
      points: [
        'Framed the problem: diagnosis is slow and costly, so early screening needs a lightweight aid',
        'Explored a dataset of long research papers across thyroid, colon and lung cancer',
        'Analyzed class balance, document length and the most frequent words per class',
        'Cleaned the text and encoded the three labels',
        'Vectorized with TF-IDF and trained a Logistic Regression classifier',
        'Saved the model and vectorizer, then shipped a Streamlit app for live predictions',
      ],
      card: {
        text: 'A simple, light and accessible model that classifies cancer type from text, usable even where resources are limited.',
        stats: [
          { value: '95.4%', label: 'Accuracy' },
          { value: '7,569', label: 'Documents' },
        ],
        bullets: [
          'Three-class classification from raw text',
          'Precision and recall both at 95.7%',
          'Reusable saved model and vectorizer',
          'Live demo on Streamlit',
        ],
      },
    },
  },
  {
    slug: 'covi',
    title: 'COVI – Come Visualizations',
    role: 'Hacker · Capstone Project',
    discipline: 'fullstack',
    disciplineLabel: 'Fullstack Development',
    related: 'experiences:capstone-covi',
    pdf: '/docs/covi-capstone.pdf', // ✅ PDF
    summary:
      'A web-based data visualization and business prediction platform that helps MSMEs understand sales trends and make data-driven decisions.',
    highlights: [
      'Owned all development and code implementation in a team of five',
      'Interactive dashboards built with React, including line, bar and pie charts',
      'ARIMA sales forecasting served through Python Flask on a virtual machine',
      'Excel template upload flow from raw data to insight',
    ],
    tech: ['React', 'Python', 'Flask', 'ARIMA', 'Data Visualization'],
    link: 'https://bisa.ai/portofolio/detail/NjU5OA',
    images: [
      {
        src: '/images/proj-covi-1.png',
        caption: 'Upload Page',
        desc: 'Download a template, fill in sales data and upload the Excel file to process.',
        mock: { hue: 215, variant: 1 },
      },
      {
        src: '/images/proj-covi-2.png',
        caption: 'Sales Dashboard',
        desc: 'Prediction chart, monthly sales, sales by category and top-5 category breakdown.',
        mock: { hue: 280, variant: 0 },
      },
      {
        src: '/images/proj-covi-3.png',
        caption: 'User Flow',
        desc: 'From MSME owner uploading data to visualization and business prediction.',
        mock: { hue: 330, variant: 2 },
      },
    ],
    story: {
      title: 'Giving MSME owners analytics without needing an analyst',
      points: [
        'Started from the problem: many MSMEs still record sales manually and cannot see trends',
        'Defined the solution as a web platform with visualization and sales forecasting',
        'Built the React front end and the dashboard charts',
        'Integrated an ARIMA model through Flask, selected by the lowest AIC',
        'Designed an Excel template flow so non-technical users can upload their data',
        'Presented the product with market sizing, business model and go-to-market plan',
      ],
      card: {
        text: 'A platform that turns spreadsheets of sales into charts and forecasts that small business owners can act on.',
        stats: [
          { value: '5', label: 'Team members' },
          { value: '4', label: 'Dashboard charts' },
        ],
        bullets: [
          'Free visualization, premium forecasting',
          'Simple Excel-based data input',
          'Forecast model served via Flask API',
          'Validated with a business model canvas',
        ],
      },
    },
  },
  {
    slug: 'flightmood',
    title: 'FlightMood',
    role: 'Machine Learning Project',
    discipline: 'backend',
    disciplineLabel: 'Machine Learning',
    related: '',
    pdf: '/docs/flightmood.pdf', // ✅ PDF
    summary:
      'An AI sentiment predictor for airline passenger comments that tells airlines instantly whether feedback is positive or negative.',
    highlights: [
      'Used the Twitter US Airline Sentiment dataset of 14,640 tweets',
      'EDA on class imbalance and tweet length, then removed neutral tweets',
      'LSTM with embedding and dropout layers for binary classification',
      'Prediction function that classifies new comments in real time',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'NLP'],
    link: '#',
    images: [
      {
        src: '/images/proj-flightmood-1.png',
        caption: 'Model Evaluation',
        desc: 'Accuracy and loss curves across training epochs with the confusion matrix.',
        mock: { hue: 210, variant: 0 },
      },
      {
        src: '',
        caption: 'EDA',
        desc: 'Sentiment distribution and tweet length analysis.',
        mock: { hue: 30, variant: 2 },
      },
      {
        src: '',
        caption: 'Live Prediction',
        desc: 'Example sentences classified as negative and positive.',
        mock: { hue: 170, variant: 1 },
      },
    ],
    story: {
      title: 'Reading thousands of passenger comments in seconds',
      points: [
        'Framed the problem: airlines cannot manually review thousands of comments every day',
        'Explored the dataset and found 62.6% of tweets were negative',
        'Removed neutral tweets to focus on clear positive and negative opinions',
        'Tokenized and padded the tweets into fixed-length sequences',
        'Trained an LSTM model and tracked accuracy and loss per epoch',
        'Wrapped inference in a function that predicts sentiment from any new comment',
      ],
      card: {
        text: 'A sentiment model that helps airlines catch dissatisfaction early instead of reading feedback by hand.',
        stats: [
          { value: '92.8%', label: 'Validation accuracy' },
          { value: '14,640', label: 'Tweets' },
        ],
        bullets: [
          'Binary positive and negative classification',
          'LSTM trained on tokenized text',
          'Tested on sample positive and negative sentences',
          'Ready to wrap in a web interface',
        ],
      },
    },
  },
];

export const disciplines = ['frontend', 'backend', 'fullstack'];