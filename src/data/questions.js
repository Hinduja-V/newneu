const QuestionsFlow = {
  // === 1. REST (PRIORITY #1) ===
  "rest_1": {
    category: "Rest & Vitality",
    title: "Energy Check",
    question: "How have your energy levels been over the last 24 hours?",
    options: [
      { id: "A", text: "Fully charged (Rested and Energetic)", next: "ind_1", log: "high_vitality=true" },
      { id: "B", text: "Running on low (Tired or Drained)", next: "rest_2", log: "low_energy=true" }
    ]
  },
  
  "rest_2": {
    category: "Rest & Vitality",
    title: "Energy Drain Source",
    question: "Where do you feel this low energy most?",
    options: [
      { id: "1", text: "Sleep Quality", next: "rest_sleep_1" },
      { id: "2", text: "Daily Fatigue", next: "rest_fatigue_1" },
      { id: "3", text: "Mental Fog", next: "rest_fog_1" },
      { id: "4", text: "Physical Weakness", next: "rest_phys_1" }
    ]
  },

  "rest_sleep_1": {
    question: "Did you have trouble falling asleep or wake up early?",
    options: [
      { id: "NO", text: "No", next: "rest_4" },
      { id: "YES", text: "Yes", next: "rest_sleep_2" }
    ]
  },
  "rest_sleep_2": {
    question: "Has this happened more than three times this week?",
    options: [
      { id: "YES", text: "Yes", next: "rest_4", log: "chronic_sleep_issue=true" },
      { id: "NO", text: "No", next: "rest_4", log: "acute_sleep_issue=true" }
    ]
  },

  "rest_fatigue_1": {
    question: "Do you feel tired throughout the day even after resting?",
    options: [
      { id: "YES", text: "Yes", next: "rest_4", log: "persistent_fatigue=true" },
      { id: "NO", text: "No", next: "rest_4", log: "temporary_fatigue=true" }
    ]
  },

  "rest_fog_1": {
    question: "Are you having trouble focusing or thinking clearly?",
    options: [
      { id: "NO", text: "No", next: "rest_4" },
      { id: "YES", text: "Yes", next: "rest_fog_2" }
    ]
  },
  "rest_fog_2": {
    question: "Is this affecting your productivity today?",
    options: [
      { id: "YES", text: "Yes", next: "rest_4", log: "mental_fog_high=true" },
      { id: "NO", text: "No", next: "rest_4", log: "mental_fog_low=true" }
    ]
  },

  "rest_phys_1": {
    question: "Does your body feel heavy or unusually slow?",
    options: [
      { id: "NO", text: "No", next: "rest_4" },
      { id: "YES", text: "Yes", next: "rest_phys_2" }
    ]
  },
  "rest_phys_2": {
    question: "Is this limiting your movement or activity?",
    options: [
      { id: "YES", text: "Yes", next: "rest_4", log: "physical_weakness_high=true" },
      { id: "NO", text: "No", next: "rest_4", log: "physical_weakness_low=true" }
    ]
  },

  "rest_4": {
    category: "Rest & Vitality",
    title: "Impact Check", 
    question: "Is low energy stopping you from completing daily tasks?",
    options: [
      { id: "NO", text: "No (Manageable)", next: "ind_1", log: "fatigue_level=minor", recommend: "10-minute nap or energy song" },
      { id: "YES", text: "Yes (Severe)", next: "rest_5" }
    ]
  },
  "rest_5": {
    category: "Rest & Vitality",
    title: "Exhaustion Level",
    question: "How heavy does this exhaustion feel?",
    options: [
      { id: "1", text: "Slightly", next: "ind_1", log: "fatigue=mild", recommend: "Hydration and 5-minute walk" },
      { id: "2", text: "Moderately", next: "ind_1", log: "fatigue=moderate", recommend: "Digital detox and short rest" },
      { id: "3", text: "Severely", next: "ind_1", log: "high_burnout_risk", sos: true }
    ]
  },

  // === INDIRECT 1. THE ACCIDENT ===
  "ind_1": {
    category: "Behavioral Check",
    title: "Scenario: The Accident",
    question: "You are rushing to a once-in-a-lifetime career interview and see someone have a minor bike accident. No one else is around.",
    options: [
      { id: "A", text: "Stop to help immediately (I’ll explain to the interviewer later).", next: "soc_1", log: "High Empathy" },
      { id: "B", text: "Call for help on my phone while continuing to the interview.", next: "soc_1", log: "Balanced Empathy" },
      { id: "C", text: "Focus on the interview; I cannot risk my future for a stranger.", next: "soc_1", log: "Stress-Tunneling" }
    ]
  },

  // === 2. SOCIAL CONNECTION ===
  "soc_1": {
    category: "Social Connection",
    title: "Vibe Check",
    question: "How have your interactions with the people around you been feeling lately?",
    options: [
      { id: "A", text: "Positive and supportive", next: "ind_2", log: "Strong Social Connection" },
      { id: "B", text: "A bit tense or difficult", next: "soc_2" }
    ]
  },
  "soc_2": {
    category: "Social Connection",
    title: "Pinpointing the Source",
    question: "I'm sorry things feel heavy. Let's find out where that pressure is coming from. Who is involved?",
    options: [
      { id: "1", text: "Family (Parents, siblings, or relatives)", next: "soc_fam_1" },
      { id: "2", text: "Friends/Peers (Social circles or misunderstandings)", next: "soc_4" },
      { id: "3", text: "Social Pressure (Feeling judged or the need to fit in)", next: "soc_4" },
      { id: "4", text: "Loneliness (Feeling disconnected even when around people)", next: "soc_lon_1" }
    ]
  },
  "soc_fam_1": {
    question: "Is there a specific conflict or a recent argument happening?",
    options: [
      { id: "NO", text: "No", next: "soc_4" },
      { id: "YES", text: "Yes", next: "soc_fam_2" }
    ]
  },
  "soc_fam_2": {
    question: "Do you feel misunderstood or unsupported at home right now?",
    options: [
      { id: "YES", text: "Yes", next: "soc_4", log: "Family Tension, Lack of Support" },
      { id: "NO", text: "No", next: "soc_4" }
    ]
  },
  "soc_lon_1": {
    question: "Do you feel like you have no one to talk to about your true feelings?",
    options: [
      { id: "YES", text: "Yes", next: "soc_4", log: "High Isolation" },
      { id: "NO", text: "No", next: "soc_4" }
    ]
  },
  "soc_4": {
    category: "Social Connection",
    title: "Impact & Severity",
    question: "Is this tension making you want to avoid people entirely today?",
    options: [
      { id: "NO", text: "No", next: "ind_2", log: "Manageable Social Stress", recommend: "Social Recharge" },
      { id: "YES", text: "Yes", next: "soc_5" }
    ]
  },
  "soc_5": {
    category: "Social Connection",
    title: "Severity Level",
    question: "How heavy does this social weight feel today?",
    options: [
      { id: "1", text: "Slightly", next: "ind_2", recommend: "Digital Break" },
      { id: "2", text: "Moderately", next: "ind_2", recommend: "Mood Songs" },
      { id: "3", text: "Severely", next: "ind_2", log: "High Crisis Risk", sos: true }
    ]
  },

  // === INDIRECT 2. THE SECRET ===
  "ind_2": {
    category: "Behavioral Check",
    title: "Scenario: The Secret",
    question: "A close friend shares a secret that suggests they might harm themselves, but they make you 'pinky-promise' not to tell.",
    options: [
      { id: "A", text: "Keep the promise; trust is everything.", next: "prod_1", log: "Low Risk Recognition", sos: true },
      { id: "B", text: "Immediately tell a professional or their family.", next: "prod_1", log: "High Risk Recognition" },
      { id: "C", text: "Try to handle it myself without telling anyone else.", next: "prod_1", log: "Overburdening" }
    ]
  },

  // === 3. PRODUCTIVITY ===
  "prod_1": {
    category: "Productivity & Purpose",
    title: "Productivity Check",
    question: "How are you feeling about your responsibilities—like your studies, code projects, or daily goals—today?",
    options: [
      { id: "A", text: "I'm on top of things", next: "ind_3", log: "High Productivity/Confidence" },
      { id: "B", text: "I'm feeling pressured or behind", next: "prod_2" }
    ]
  },
  "prod_2": {
    category: "Productivity & Purpose",
    title: "The Pressure Point",
    question: "I understand. Let’s figure out what’s weighing on you the most. What’s the main hurdle?",
    options: [
      { id: "1", text: "Deadlines/Exams (Fixed dates coming up fast)", next: "prod_dead_1" },
      { id: "2", text: "Workload Volume (Too many tasks, not enough hours)", next: "prod_work_1" },
      { id: "3", text: "Lack of Motivation (Feeling 'stuck' or the work feels heavy)", next: "prod_4" },
      { id: "4", text: "Imposter Syndrome (Feeling like you aren't good enough)", next: "prod_4" }
    ]
  },
  "prod_work_1": {
    question: "Do you feel like you don’t even know where to start today?",
    options: [
      { id: "YES", text: "Yes", next: "prod_work_2", log: "Analysis Paralysis" },
      { id: "NO", text: "No", next: "prod_work_2" }
    ]
  },
  "prod_work_2": {
    question: "Is this pressure causing you to skip essential breaks or meals?",
    options: [
      { id: "YES", text: "Yes", next: "prod_4", log: "High Physical Neglect" },
      { id: "NO", text: "No", next: "prod_4" }
    ]
  },
  "prod_dead_1": {
    question: "Is the deadline within the next 48 hours?",
    options: [
      { id: "YES", text: "Yes", next: "prod_dead_2", log: "Short-term Emergency" },
      { id: "NO", text: "No", next: "prod_dead_2" }
    ]
  },
  "prod_dead_2": {
    question: "Do you feel unprepared for it?",
    options: [
      { id: "YES", text: "Yes", next: "prod_4", log: "Low Resource Confidence" },
      { id: "NO", text: "No", next: "prod_4" }
    ]
  },
  "prod_4": {
    category: "Productivity & Purpose",
    title: "Peace of Mind Meter",
    question: "Is this pressure making it hard for you to actually start your work today?",
    options: [
      { id: "NO", text: "No", next: "ind_3", log: "Manageable Tension", recommend: "StressBallGame or Focus Playlist" },
      { id: "YES", text: "Yes", next: "prod_5" }
    ]
  },
  "prod_5": {
    category: "Productivity & Purpose",
    title: "Severity Level",
    question: "How much is this affecting your peace of mind?",
    options: [
      { id: "1", text: "Slightly", next: "ind_3", recommend: "Task Planner (Break it down)" },
      { id: "2", text: "Moderately", next: "ind_3", recommend: "5-minute Desk Stretch & Breathing" },
      { id: "3", text: "Severely", next: "ind_3", log: "High Burnout Risk", sos: true }
    ]
  },

  // === INDIRECT 3. RESTAURANT ERROR ===
  "ind_3": {
    category: "Behavioral Check",
    title: "Scenario: Restaurant Error",
    question: "You are exhausted after a long day. The waiter brings you the wrong meal for the second time.",
    options: [
      { id: "A", text: "Eat it anyway; I don’t want to cause a scene.", next: "fin_1", log: "Avoidance" },
      { id: "B", text: "Politely ask for the correct dish.", next: "fin_1", log: "Frustration Tolerance" },
      { id: "C", text: "Get frustrated and leave the restaurant.", next: "fin_1", log: "Fragile State" }
    ]
  },

  // === 4. FINANCIAL/SECURITY ===
  "fin_1": {
    category: "Security & Finances",
    title: "Security Check",
    question: "Let’s talk about your peace of mind regarding finances. How are you feeling about your current situation or upcoming expenses?",
    options: [
      { id: "A", text: "I feel secure and managed", next: "ind_4", log: "Financial Stability" },
      { id: "B", text: "I'm feeling some pressure or worry", next: "fin_2" }
    ]
  },
  "fin_2": {
    category: "Security & Finances",
    title: "Identifying the Source",
    question: "Financial stress can be loud. What is the primary source of this concern right now?",
    options: [
      { id: "1", text: "Immediate Expenses (Bills, fees, or daily costs)", next: "fin_imm_1" },
      { id: "2", text: "Long-term Security (Savings, career path, or future stability)", next: "fin_long_1" },
      { id: "3", text: "Unexpected Costs (Emergencies or unplanned repairs)", next: "fin_4" },
      { id: "4", text: "Overall Uncertainty (General worry about the future or economy)", next: "fin_4" }
    ]
  },
  "fin_imm_1": {
    question: "Are there any specific bills or fees due within the next 7 days?",
    options: [
      { id: "YES", text: "Yes", next: "fin_imm_2", log: "Urgent Pressure" },
      { id: "NO", text: "No", next: "fin_imm_2" }
    ]
  },
  "fin_imm_2": {
    question: "Is this worry making you cut back on basics like healthy food or transport?",
    options: [
      { id: "YES", text: "Yes", next: "fin_4", log: "High Resource Scarcity" },
      { id: "NO", text: "No", next: "fin_4" }
    ]
  },
  "fin_long_1": {
    question: "Do you feel like you're unable to save or plan for your future goals right now?",
    options: [
      { id: "YES", text: "Yes", next: "fin_long_2" },
      { id: "NO", text: "No", next: "fin_long_2" }
    ]
  },
  "fin_long_2": {
    question: "Does thinking about the long-term future make you feel hopeless?",
    options: [
      { id: "YES", text: "Yes", next: "fin_4", log: "Low Hope Sentiment" },
      { id: "NO", text: "No", next: "fin_4" }
    ]
  },
  "fin_4": {
    category: "Security & Finances",
    title: "Life Focus Meter",
    question: "Is this financial worry making it hard for you to focus on your work, studies, or relationships today?",
    options: [
      { id: "NO", text: "No", next: "ind_4", log: "Manageable Financial Anxiety", recommend: "Budgeting Mindset Audio" },
      { id: "YES", text: "Yes", next: "fin_5" }
    ]
  },
  "fin_5": {
    category: "Security & Finances",
    title: "Severity Check",
    question: "How much is this affecting your daily peace?",
    options: [
      { id: "1", text: "Slightly", next: "ind_4", recommend: "5-minute Reset Meditation" },
      { id: "2", text: "Moderately", next: "ind_4", recommend: "Vent session with AI" },
      { id: "3", text: "Severely", next: "ind_4", log: "High Crisis Risk", sos: true }
    ]
  },

  // === INDIRECT 4. LOST WALLET ===
  "ind_4": {
    category: "Behavioral Check",
    title: "Scenario: Lost Wallet",
    question: "You find a wallet with a large amount of cash but no ID inside. You are currently struggling with your own bills.",
    options: [
      { id: "A", text: "Hand it into the nearest police station.", next: "health_1", log: "High Integrity" },
      { id: "B", text: "Keep it; I need it more than the person who was careless enough to lose it.", next: "health_1", log: "Financial Strain Compromise" },
      { id: "C", text: "Leave it where it is so I don't get involved.", next: "health_1", log: "Avoidance" }
    ]
  },

  // === 5. PHYSICAL HEALTH ===
  "health_1": {
    category: "Physical Health", 
    title: "Gatekeeper",
    question: "Are you facing any health or well-being issues currently?",
    options: [
      { id: "A", text: "No", next: "ind_5", log: "Healthy/Stable" },
      { id: "B", text: "Yes", next: "health_2" }
    ]
  },
  "health_2": {
    category: "Physical Health",
    title: "Issue Type", 
    question: "What best describes what you are feeling?",
    options: [
      { id: "1", text: "Physical pain or discomfort", next: "health_4" },
      { id: "2", text: "Low energy or fatigue", next: "health_4" },
      { id: "3", text: "Emotional exhaustion", next: "health_4" },
      { id: "4", text: "Medical condition", next: "health_3" },
      { id: "5", text: "Overthinking or stress", next: "health_4" }
    ]
  },
  "health_3": {
    category: "Physical Health",
    title: "Condition Details",
    question: "What type of condition is it?",
    options: [
      { id: "1", text: "Chronic", next: "health_4" },
      { id: "2", text: "Recent illness", next: "health_4" },
      { id: "3", text: "Injury recovery", next: "health_4" },
      { id: "4", text: "Mental health", next: "health_4" }
    ]
  },
  "health_4": {
    category: "Physical Health",
    title: "Routine Impact",
    question: "Is this affecting your daily routine?",
    options: [
      { id: "NO", text: "No (Manageable)", next: "ind_5", log: "Manageable Issue", recommend: "Light activity or stretch" },
      { id: "YES", text: "Yes", next: "health_5" }
    ]
  },
  "health_5": {
    category: "Physical Health",
    title: "Severity Check",
    question: "How much is it affecting you?",
    options: [
      { id: "1", text: "Slightly", next: "ind_5", recommend: "5-minute breathing exercise" },
      { id: "2", text: "Moderately", next: "ind_5", recommend: "Relaxing visuals and mood song" },
      { id: "3", text: "Severely", next: "ind_5", sos: true, log: "High Health Risk" }
    ]
  },

  // === INDIRECT 5. THE 'C' GRADE ===
  "ind_5": {
    category: "Behavioral Check",
    title: "Scenario: The 'C' Grade",
    question: "You put 100% effort into a project, but the feedback you get is 'Average' and a low grade.",
    options: [
      { id: "A", text: "Ask for a detailed explanation so I can improve.", next: "env_1", log: "High Resilience" },
      { id: "B", text: "Assume the teacher/boss has a personal problem with me.", next: "env_1", log: "External Blame" },
      { id: "C", text: "Lose interest in the subject entirely.", next: "env_1", log: "Identity Failure" }
    ]
  },

  // === 6. ENVIRONMENT ===
  "env_1": {
    category: "Environment", 
    title: "Space Check",
    question: "How would you describe your physical space today?",
    options: [
      { id: "A", text: "Calm and comfortable", next: "ind_6", log: "Environmental Harmony" },
      { id: "B", text: "Distracting or stressful", next: "env_2" }
    ]
  },
  "env_2": {
    category: "Environment",
    title: "Friction Point",
    question: "What is bothering you most right now?",
    options: [
      { id: "1", text: "Noise or Chaos", next: "env_noise_1" },
      { id: "2", text: "Clutter or Space", next: "env_clutter_1" },
      { id: "3", text: "Commute or Travel", next: "env_4" },
      { id: "4", text: "Safety Concerns", next: "env_4" }
    ]
  },
  "env_clutter_1": {
    question: "Do you feel trapped or overwhelmed by the mess around you?",
    options: [
      { id: "NO", text: "No", next: "env_4" },
      { id: "YES", text: "Yes", next: "env_clutter_2", log: "Overwhelm" }
    ]
  },
  "env_clutter_2": {
    question: "Do you have a private space where you can be alone?",
    options: [
      { id: "NO", text: "No", next: "env_4", log: "Privacy Deficit" },
      { id: "YES", text: "Yes", next: "env_4" }
    ]
  },
  "env_noise_1": {
    question: "Is the noise preventing you from focusing or sleeping?",
    options: [
      { id: "NO", text: "No", next: "env_4" },
      { id: "YES", text: "Yes", next: "env_noise_2" }
    ]
  },
  "env_noise_2": {
    question: "Have you been unable to find a quiet place for over 4 hours?",
    options: [
      { id: "YES", text: "Yes", next: "env_4", log: "Chronic Overstimulation" },
      { id: "NO", text: "No", next: "env_4" }
    ]
  },
  "env_4": {
    category: "Environment",
    title: "Relaxation Check",
    question: "Is your environment making it impossible to relax?",
    options: [
      { id: "NO", text: "No (Manageable)", next: "ind_6", log: "Manageable Env Stress", recommend: "Noise-cancelling audio" },
      { id: "YES", text: "Yes", next: "env_5" }
    ]
  },
  "env_5": {
    category: "Environment",
    title: "Mood Impact", 
    question: "How much is this affecting your mood right now?",
    options: [
      { id: "1", text: "Slightly", next: "ind_6", recommend: "10-minute Micro-Tidy session" },
      { id: "2", text: "Moderately", next: "ind_6", recommend: "Nature sounds escape" },
      { id: "3", text: "Severely", next: "ind_6", sos: true, log: "Environmental Crisis" }
    ]
  },

  // === INDIRECT 6. POWER OUTAGE ===
  "ind_6": {
    category: "Behavioral Check",
    title: "Scenario: Power Outage",
    question: "You are settled in for a relaxing night and the power goes out for the next 4 hours.",
    options: [
      { id: "A", text: "Light a candle and enjoy the quiet/meditate.", next: null, log: "High Adaptability" },
      { id: "B", text: "Feel anxious and keep checking the phone for updates.", next: null, log: "Low Adaptability" },
      { id: "C", text: "Get angry that my plans are ruined.", next: null, log: "Very Low Adaptability" }
    ]
  }
};

export default QuestionsFlow;
export const flowOrder = Object.keys(QuestionsFlow);
