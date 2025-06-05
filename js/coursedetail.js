document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseNameParam = urlParams.get('course');

    const courseDetailPageTitle = document.getElementById('courseDetailPageTitle');
    const detailCourseTitle = document.getElementById('detailCourseTitle');
    const detailCourseCode = document.getElementById('detailCourseCode');
    const detailCourseRating = document.getElementById('detailCourseRating');
    const detailCourseReviews = document.getElementById('detailCourseReviews');
    const detailLearningOutcomes = document.getElementById('detailLearningOutcomes');
    const detailAboutText = document.getElementById('detailAboutText');
    const detailRoadmapSections = document.getElementById('detailRoadmapSections');
    const progressCircle = document.getElementById('progressCircle');
    const progressText = document.getElementById('progressText');

    const coursesData = {
        "Calculus": {
            code: "MATH101",
            rating: 4.5,
            reviews: 231,
            learningOutcomes: [
                "LO 1: Knowledge - define the properties of time to describe geometric and physical problems, and other applications.",
                "LO 2: Comprehension - explain the properties of derivative to describe the geometric and physical problems, and other applications.",
                "LO 3: Comprehension - explain the properties of integral to describe the geometric and physical problems, and other applications.",
                "LO 4: Comprehension - recognize the convergence of infinite series."
            ],
            aboutText: "This course emphasizes an understanding of basic concepts of Calculus, including limits, derivative, integral, and infinite series. These basic concepts would be fundamental geometrically and algebraically. It is essential for a broad range of problems in the concept of form. It is crucial to solving problems in the physical, engineering, and social sciences. This concept give knowledge about what happens to the function when the domain gets close to some element. There are limitations on how far into the basic unit of the same in many circumstances. The derivative is a powerful tool for solving problem involves maximizing or minimizing a function over a constrained set. The concept of integral applied for some problems that can be interpreted as an area and volume. At the end, a knowledge of infinite series given to completed basic concept of calculus. This course will become the foundation of advanced mathematics courses, computer science courses, and engineering courses.",
            roadmap: [
                { stage: "Stage 1", topics: ["Basic Derivative", "Advanced Derivative", "Applications of Differentiation", "Integral", "Applications of the Integral", "Techniques of Integration"] },
                { stage: "Stage 2", topics: ["Limit", "Indeterminate Forms", "Indeterminate Forms", "Sequence and series", "Power series"] }
            ],
            progress: 30
        },
        "Data Structures": {
            code: "CS201",
            rating: 4.7,
            reviews: 180,
            learningOutcomes: [
                "LO 1: Understand fundamental data structures like arrays, linked lists, stacks, and queues.",
                "LO 2: Analyze the efficiency of algorithms using Big O notation.",
                "LO 3: Implement various sorting and searching algorithms.",
                "LO 4: Comprehend tree and graph data structures and their applications."
            ],
            aboutText: "This course provides a comprehensive introduction to the design, implementation, and analysis of fundamental data structures. Students will learn about abstract data types, common data structures (such as arrays, linked lists, stacks, queues, trees, and graphs), and algorithms for manipulating them. Emphasis will be placed on understanding the trade-offs between different data structures in terms of time and space complexity, preparing students for efficient software development.",
            roadmap: [
                { stage: "Stage 1", topics: ["Arrays", "Linked Lists", "Stacks", "Queues"] },
                { stage: "Stage 2", topics: ["Trees (Binary, BST, AVL)", "Graphs (DFS, BFS)", "Hashing", "Sorting Algorithms", "Searching Algorithms"] }
            ],
            progress: 50
        },
        "Operating Systems": {
            code: "CS401",
            rating: 4.6,
            reviews: 150,
            learningOutcomes: [
                "LO 1: Understand the core concepts of operating systems.",
                "LO 2: Learn about process management and scheduling.",
                "LO 3: Explore memory management techniques.",
                "LO 4: Grasp concepts of file systems and I/O management."
            ],
            aboutText: "This course covers the fundamental principles and concepts of modern operating systems. Topics include process management, CPU scheduling, deadlocks, memory management (paging, segmentation), virtual memory, file systems, I/O systems, and an introduction to distributed operating systems. The course aims to provide students with a solid understanding of how operating systems manage computer resources and provide services to applications.",
            roadmap: [
                { stage: "Stage 1", topics: ["Introduction to OS", "Process Management", "CPU Scheduling", "Deadlocks"] },
                { stage: "Stage 2", topics: ["Memory Management", "Virtual Memory", "File Systems", "I/O Systems"] }
            ],
            progress: 20
        },
        "Database Management": {
            code: "CS301",
            rating: 4.4,
            reviews: 195,
            learningOutcomes: [
                "LO 1: Design and implement relational databases.",
                "LO 2: Write complex SQL queries for data manipulation.",
                "LO 3: Understand database normalization and integrity.",
                "LO 4: Learn about transaction management and concurrency control."
            ],
            aboutText: "This course introduces the concepts and techniques for designing, implementing, and managing database systems. It covers the relational data model, entity-relationship modeling, SQL for data definition and manipulation, database normalization, and transaction management. Students will gain practical skills in database design and query writing, essential for various computing disciplines.",
            roadmap: [
                { stage: "Stage 1", topics: ["Introduction to Databases", "Relational Model", "ER Modeling", "SQL Basics"] },
                { stage: "Stage 2", topics: ["Advanced SQL", "Normalization", "Transaction Management", "Concurrency Control", "Database Security"] }
            ],
            progress: 60
        },
        "Introduction to Psychology": {
            code: "PSYC101",
            rating: 4.2,
            reviews: 110,
            learningOutcomes: [
                "LO 1: Define key concepts and historical perspectives in psychology.",
                "LO 2: Understand the major subfields of psychology.",
                "LO 3: Explore the scientific methods used in psychological research.",
                "LO 4: Recognize the biological bases of behavior and cognition."
            ],
            aboutText: "This introductory course provides a broad overview of the field of psychology, covering its history, research methods, and major subfields. Topics include biological bases of behavior, sensation and perception, states of consciousness, learning, memory, cognition, intelligence, motivation, emotion, development, personality, social psychology, and psychological disorders. The course aims to equip students with a foundational understanding of human thought, emotion, and behavior.",
            roadmap: [
                { stage: "Stage 1", topics: ["History of Psychology", "Research Methods", "Biological Bases", "Sensation & Perception"] },
                { stage: "Stage 2", topics: ["Consciousness", "Learning", "Memory", "Cognition", "Motivation & Emotion"] }
            ],
            progress: 40
        },
        "Developmental Psychology": {
            code: "PSYC205",
            rating: 4.3,
            reviews: 95,
            learningOutcomes: [
                "LO 1: Understand theories of human development across the lifespan.",
                "LO 2: Analyze cognitive, social, and emotional development in childhood.",
                "LO 3: Examine adolescent physical and psychological changes.",
                "LO 4: Explore adult development and aging processes."
            ],
            aboutText: "This course examines human growth and development across the lifespan, from conception through old age. It covers physical, cognitive, social, and emotional changes, integrating major theories and research findings. Topics include genetics, prenatal development, infancy, childhood, adolescence, early, middle, and late adulthood, and the dying process. Students will gain an understanding of the complex interplay of biological, psychological, and sociocultural factors shaping individual development.",
            roadmap: [
                { stage: "Stage 1", topics: ["Theories of Development", "Prenatal & Infancy", "Early Childhood", "Middle Childhood"] },
                { stage: "Stage 2", topics: ["Adolescence", "Early Adulthood", "Middle Adulthood", "Late Adulthood & Aging"] }
            ],
            progress: 70
        },
        "Social Psychology": {
            code: "PSYC203",
            rating: 4.4,
            reviews: 120,
            learningOutcomes: [
                "LO 1: Understand how social situations influence individual behavior.",
                "LO 2: Analyze concepts like conformity, obedience, and persuasion.",
                "LO 3: Explore attitudes, stereotypes, and prejudice.",
                "LO 4: Examine dynamics of group behavior and intergroup relations."
            ],
            aboutText: "This course explores how individuals' thoughts, feelings, and behaviors are influenced by other people. Topics include social cognition, attitudes, conformity, obedience, persuasion, group dynamics, prejudice, aggression, attraction, and altruism. Students will critically evaluate research findings in social psychology and apply them to understand everyday social phenomena.",
            roadmap: [
                { stage: "Stage 1", topics: ["Social Cognition", "Attitudes & Persuasion", "Conformity & Obedience"] },
                { stage: "Stage 2", topics: ["Group Dynamics", "Prejudice & Discrimination", "Aggression", "Attraction & Love", "Altruism"] }
            ],
            progress: 35
        },
        "Cognitive Psychology": {
            code: "PSYC301",
            rating: 4.5,
            reviews: 88,
            learningOutcomes: [
                "LO 1: Understand fundamental theories of cognition.",
                "LO 2: Explore processes of perception and attention.",
                "LO 3: Analyze models of memory and their functions.",
                "LO 4: Examine problem-solving, decision-making, and language."
            ],
            aboutText: "This course provides an in-depth examination of human cognitive processes, including perception, attention, memory, knowledge representation, language, problem-solving, and decision-making. Students will learn about major theories and research methods in cognitive psychology, and apply these concepts to real-world scenarios. The course emphasizes critical thinking about how the mind processes information.",
            roadmap: [
                { stage: "Stage 1", topics: ["Introduction to Cognition", "Perception", "Attention", "Short-term Memory", "Long-term Memory"] },
                { stage: "Stage 2", topics: ["Knowledge Representation", "Language", "Problem Solving", "Decision Making", "Reasoning"] }
            ],
            progress: 80
        },
        "Financial Accounting I": {
            code: "ACC101",
            rating: 4.1,
            reviews: 130,
            learningOutcomes: [
                "LO 1: Understand the accounting cycle and financial statements.",
                "LO 2: Learn to record business transactions.",
                "LO 3: Prepare income statements and balance sheets.",
                "LO 4: Analyze financial performance using basic ratios."
            ],
            aboutText: "This course introduces the fundamental concepts of financial accounting, focusing on the principles and practices used to record, summarize, and report business transactions. Topics include the accounting cycle, journal entries, ledger accounts, trial balance, and the preparation of basic financial statements (income statement, statement of owner's equity, balance sheet, and statement of cash flows). The course aims to provide a solid foundation for understanding financial reporting.",
            roadmap: [
                { stage: "Stage 1", topics: ["Introduction to Accounting", "Accounting Cycle", "Journal Entries", "Ledger & Trial Balance"] },
                { stage: "Stage 2", topics: ["Adjusting Entries", "Financial Statements (Income Statement, Balance Sheet)", "Cash Flows Basics", "Ratio Analysis"] }
            ],
            progress: 25
        },
        "Managerial Accounting": {
            code: "ACC201",
            rating: 4.3,
            reviews: 105,
            learningOutcomes: [
                "LO 1: Differentiate between financial and managerial accounting.",
                "LO 2: Understand cost concepts and cost-volume-profit analysis.",
                "LO 3: Apply budgeting techniques for planning and control.",
                "LO 4: Use relevant costs for decision making."
            ],
            aboutText: "This course focuses on the use of accounting information by management for planning, control, and decision-making purposes. Topics include cost concepts and classifications, cost-volume-profit analysis, budgeting, standard costing, activity-based costing, and relevant costs for decision making. The course emphasizes how accounting data can be used to improve organizational performance and achieve strategic goals.",
            roadmap: [
                { stage: "Stage 1", topics: ["Managerial vs. Financial Accounting", "Cost Concepts", "Cost-Volume-Profit Analysis", "Job Costing"] },
                { stage: "Stage 2", topics: ["Process Costing", "Budgeting", "Standard Costing", "Relevant Costs for Decisions", "Performance Measurement"] }
            ],
            progress: 55
        },
        "Auditing Principles": {
            code: "ACC202",
            rating: 4.0,
            reviews: 80,
            learningOutcomes: [
                "LO 1: Grasp the fundamental principles of auditing.",
                "LO 2: Understand auditor's responsibilities and ethical considerations.",
                "LO 3: Learn about audit planning and risk assessment.",
                "LO 4: Explore evidence gathering and audit reporting."
            ],
            aboutText: "This course provides an introduction to the principles and practices of external auditing. It covers the conceptual framework of auditing, auditor responsibilities, professional ethics, audit planning, risk assessment, internal control, audit evidence, and audit reporting. The course aims to equip students with a foundational understanding of the audit process and its role in ensuring the reliability of financial information.",
            roadmap: [
                { stage: "Stage 1", topics: ["Introduction to Auditing", "Auditor Responsibilities & Ethics", "Audit Planning", "Risk Assessment"] },
                { stage: "Stage 2", topics: ["Internal Control", "Audit Evidence", "Sampling", "Audit Reporting"] }
            ],
            progress: 10
        },
        "Taxation Fundamentals": {
            code: "ACC203",
            rating: 4.2,
            reviews: 90,
            learningOutcomes: [
                "LO 1: Understand basic concepts of taxation.",
                "LO 2: Learn about individual income tax principles.",
                "LO 3: Explore corporate taxation concepts.",
                "LO 4: Grasp principles of property and sales taxes."
            ],
            aboutText: "This course introduces the fundamental principles of taxation, covering the basics of income tax for individuals and corporations. Topics include tax laws, tax calculation, deductions, credits, and an overview of other types of taxes such as sales tax and property tax. The course provides students with a foundational understanding of the tax system and its implications for individuals and businesses.",
            roadmap: [
                { stage: "Stage 1", topics: ["Introduction to Taxation", "Individual Income Tax", "Gross Income & Deductions", "Tax Credits"] },
                { stage: "Stage 2", topics: ["Corporate Taxation", "Partnership Taxation", "Property Taxes", "Sales Taxes"] }
            ],
            progress: 45
        },
        "Introduction to BIT": {
            code: "BIT101",
            rating: 4.5,
            reviews: 160,
            learningOutcomes: [
                "LO 1: Understand the role of IT in business.",
                "LO 2: Explore various business information systems.",
                "LO 3: Learn about data management and databases.",
                "LO 4: Grasp concepts of network and internet technologies in business."
            ],
            aboutText: "This course provides an overview of how information technology is used to support business operations, decision-making, and competitive advantage. Topics include business processes, enterprise systems, data management, networking, e-commerce, and IT security. Students will gain a foundational understanding of the strategic importance of IT in modern organizations.",
            roadmap: [
                { stage: "Stage 1", topics: ["Role of IT in Business", "Types of Information Systems", "IT Infrastructure", "Data & Database Management"] },
                { stage: "Stage 2", topics: ["Networking & Internet", "E-commerce", "IT Security", "Emerging Technologies"] }
            ],
            progress: 75
        },
        "Systems Analysis and Design": {
            code: "BIT201",
            rating: 4.6,
            reviews: 140,
            learningOutcomes: [
                "LO 1: Understand the systems development life cycle (SDLC).",
                "LO 2: Learn techniques for requirements gathering and analysis.",
                "LO 3: Design system components including data and process models.",
                "LO 4: Evaluate and select appropriate system development methodologies."
            ],
            aboutText: "This course covers the methodologies, tools, and techniques used in the analysis and design of information systems. Students will learn the phases of the systems development life cycle (SDLC), including planning, analysis, design, implementation, and maintenance. Emphasis is placed on requirements gathering, data modeling (ER diagrams), process modeling (DFDs), and user interface design. The course prepares students to be effective participants in IT development projects.",
            roadmap: [
                { stage: "Stage 1", topics: ["SDLC Overview", "Project Initiation", "Requirements Gathering", "Data Modeling (ERD)"] },
                { stage: "Stage 2", topics: ["Process Modeling (DFD)", "UI/UX Design", "System Architecture", "Implementation & Testing"] }
            ],
            progress: 65
        },
        "Business Intelligence": {
            code: "BIT301",
            rating: 4.7,
            reviews: 115,
            learningOutcomes: [
                "LO 1: Define Business Intelligence (BI) and its importance.",
                "LO 2: Understand data warehousing concepts.",
                "LO 3: Learn about data mining techniques for business insights.",
                "LO 4: Explore data visualization and reporting tools."
            ],
            aboutText: "This course provides an introduction to Business Intelligence (BI) systems, focusing on how organizations can leverage data to improve decision-making. Topics include data warehousing, ETL processes, data mining (classification, clustering, association rule mining), and various BI tools and techniques for reporting and dashboards. Students will gain an understanding of how to transform raw data into actionable business insights.",
            roadmap: [
                { stage: "Stage 1", topics: ["Introduction to BI", "Data Warehousing", "ETL Processes", "Data Quality"] },
                { stage: "Stage 2", topics: ["Data Mining (Classification, Clustering)", "Reporting & Dashboards", "Big Data & Analytics", "BI Tools"] }
            ],
            progress: 90
        },
        "E-commerce Strategies": {
            code: "BIT501",
            rating: 4.4,
            reviews: 98,
            learningOutcomes: [
                "LO 1: Understand different e-commerce business models.",
                "LO 2: Analyze e-commerce marketing and customer acquisition strategies.",
                "LO 3: Learn about e-commerce payment systems and security.",
                "LO 4: Explore legal and ethical issues in e-commerce."
            ],
            aboutText: "This course examines the strategic, managerial, and technological aspects of e-commerce. Topics include e-commerce business models, online consumer behavior, website design, digital marketing, payment systems, security, supply chain management, and global e-commerce. The course aims to provide students with a comprehensive understanding of how to plan, build, and manage successful e-commerce initiatives.",
            roadmap: [
                { stage: "Stage 1", topics: ["E-commerce Models", "E-commerce Infrastructure", "E-commerce Security", "Online Marketing"] },
                { stage: "Stage 2", topics: ["Payment Systems", "E-commerce Analytics", "Legal & Ethical Issues", "Global E-commerce"] }
            ],
            progress: 70
        }
    };

  if (courseNameParam) {
    const decodedCourseName = decodeURIComponent(courseNameParam);
    const courseData = coursesData[decodedCourseName];

    if (courseData) {
      courseDetailPageTitle.textContent = `${decodedCourseName} - Course Detail - BeeYond`;

      detailCourseTitle.textContent = decodedCourseName;
      detailCourseCode.textContent = courseData.code;

      detailCourseRating.innerHTML = '';
      const fullStars = Math.floor(courseData.rating);
      const hasHalfStar = courseData.rating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('span');
        star.textContent = '⭐';
        detailCourseRating.appendChild(star);
      }
      if (hasHalfStar) {
        const halfStar = document.createElement('span');
        halfStar.textContent = '⭐️';
        detailCourseRating.appendChild(halfStar);
      }
      detailCourseReviews.textContent = `(${courseData.reviews} Review)`;

      detailLearningOutcomes.innerHTML = '';
      courseData.learningOutcomes.forEach((outcome, index) => {
        const div = document.createElement('div');
        div.classList.add('lo-item');
        div.textContent = `LO ${index + 1}: ${outcome}`;
        detailLearningOutcomes.appendChild(div);
      });

      detailAboutText.textContent = courseData.aboutText;

      detailRoadmapSections.innerHTML = '';
      courseData.roadmap.forEach(stageData => {
        const stageDiv = document.createElement('div');
        stageDiv.classList.add('roadmap-stage');

        const stageTitle = document.createElement('h3');
        stageTitle.textContent = stageData.stage;
        stageDiv.appendChild(stageTitle);

        const topicsGrid = document.createElement('div');
        topicsGrid.classList.add('roadmap-topics-grid');

        stageData.topics.forEach(topic => {
          const topicButton = document.createElement('button');
          topicButton.type = "button";
          topicButton.classList.add('roadmap-topic-btn');
          topicButton.textContent = topic;
          topicsGrid.appendChild(topicButton);
        });
        stageDiv.appendChild(topicsGrid);
        detailRoadmapSections.appendChild(stageDiv);
      });

      const radius = progressCircle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const progressPercentage = courseData.progress || 0;
      const offset = circumference - (progressPercentage / 100) * circumference;

      progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      progressCircle.style.strokeDashoffset = offset;
      progressText.textContent = `${progressPercentage}%`;

    } else {
      courseDetailPageTitle.textContent = "Course Not Found - BeeYond";
      detailCourseTitle.textContent = "Kursus Tidak Ditemukan";
      detailCourseCode.textContent = "";
      detailCourseRating.innerHTML = "";
      detailCourseReviews.textContent = "";
      detailLearningOutcomes.innerHTML = '<div class="lo-item">Detail untuk kursus ini tidak ditemukan.</div>';
      detailAboutText.textContent = "Silakan pilih kursus yang valid dari halaman utama.";
      detailRoadmapSections.innerHTML = '';
      progressText.textContent = '0%';
      progressCircle.style.strokeDashoffset = circumference;
    }
  } else {
    courseDetailPageTitle.textContent = "Course Not Found - BeeYond";
    detailCourseTitle.textContent = "Kursus Tidak Ditemukan";
    detailCourseCode.textContent = "";
    detailCourseRating.innerHTML = "";
    detailCourseReviews.textContent = "";
    detailLearningOutcomes.innerHTML = '<div class="lo-item">Silakan pilih kursus dari halaman utama.</div>';
    detailAboutText.textContent = "Tidak ada kursus yang dipilih. Silakan kembali ke halaman kursus untuk memilih.";
    detailRoadmapSections.innerHTML = '';
    progressText.textContent = '0%';
    progressCircle.style.strokeDashoffset = circumference;
  }

  const loginButton = document.getElementById('loginButton');
  const userProfile = document.getElementById('userProfile');
  const profileDropdown = document.getElementById('profileDropdown');

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    if (loginButton) loginButton.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
  } else {
    if (loginButton) loginButton.style.display = 'block';
    if (userProfile) userProfile.style.display = 'none';
  }

  if (userProfile) {
    userProfile.addEventListener('click', () => {
      if (profileDropdown) {
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
      }
    });
  }

  window.addEventListener('click', (event) => {
    if (userProfile && !userProfile.contains(event.target) && profileDropdown) {
      profileDropdown.style.display = 'none';
    }
  });

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      window.location.href = '../html/login.html';
    });
  }

  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');

  if (burger) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
    });
  }
});