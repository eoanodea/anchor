export type Publication = {
  id: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  published: string;
  title: string;
  description: string;
  image: string;
  authorNames: string;
  authorInstitution: string;
  sections: {
    id: string;
    title: string;
    level?: 1 | 2;
    paragraphs: string[];
  }[];
};

export const publications: readonly Publication[] = [
  {
    id: "minimalist-overlays",
    badge: "NEW RELEASE",
    badgeBg: "#e3f2fd",
    badgeColor: "#1976d2",
    published: "Published 3 days ago",
    title: "Minimalist Assistive Overlays for Academic Text Navigation",
    description:
      "Explores how subtle visual overlays and line anchors can reduce cognitive load and improve focus when reading dense academic content.",
    image: "/images/library/girl.png",
    authorNames: "Dr. Aris Thorne & Prof. Elena Vance",
    authorInstitution: "Institute of Quantum Biology, Stanford University",
    sections: [
      {
        id: "abstract",
        title: "Abstract",
        level: 1,
        paragraphs: [
          "The aim of this project is to evaluate whether a minimal, guided-reading overlay can improve user focus and efficiency when interacting with academic text. Existing tools largely focus on enhancing visibility, but very few actively guide visual attention in a controlled way.",
          "Many users lose their place, struggle to scan dense paragraphs, and experience high cognitive load when reading academic content online. These difficulties create significant barriers, particularly for visually impaired and neurodiverse users.",
          "If visual guidance can reliably reduce this friction, it has the potential to make digital reading environments more accessible and less cognitively demanding for a wide range of readers."
        ]
      },
      {
        id: "introduction",
        title: "1. Introduction",
        level: 1,
        paragraphs: [
          "Academic reading places heavy demands on attention and working memory. Dense layouts and complex terminology make it easy to lose orientation, miss key details, or become mentally overloaded.",
          "This work explores whether lightweight guided-reading cues can help readers maintain context and move through scholarly text more confidently."
        ]
      },
      {
        id: "methodology",
        title: "2. Methodology",
        level: 1,
        paragraphs: [
          "We evaluated static and minimally adaptive overlays across long-form digital documents, measuring comprehension, scroll regressions, and subjective cognitive load.",
          "The interface intentionally minimized additional UI complexity to isolate the impact of attention-guidance cues."
        ]
      },
      {
        id: "data-collection",
        title: "2.1 Data Collection",
        level: 2,
        paragraphs: [
          "Participants completed guided reading tasks and think-aloud protocols while interacting with academic passages of varying density and structure.",
          "Behavioral logs and post-task surveys were used to compare navigation effort and confidence."
        ]
      },
      {
        id: "results-discussion",
        title: "3. Results & Discussion",
        level: 1,
        paragraphs: [
          "Readers using guided overlays reported stronger orientation and reduced fatigue, with fewer regressions in high-density sections.",
          "The results suggest that simple visual anchors can improve reading flow when they are subtle, consistent, and easy to ignore when unnecessary."
        ]
      },
      {
        id: "future-work",
        title: "4. Future Work",
        level: 1,
        paragraphs: [
          "Future studies will test adaptive guidance that responds to user pace and document structure while preserving user control.",
          "We also plan to evaluate these patterns with broader accessibility cohorts and multilingual academic corpora."
        ]
      },
      {
        id: "conclusion",
        title: "5. Conclusion",
        level: 1,
        paragraphs: [
          "Guided-reading overlays show promise as lightweight assistive support for academic reading. They can reduce cognitive friction without introducing major interface overhead.",
          "This positions attention guidance as a practical complement to existing readability and accessibility tooling."
        ]
      },
      {
        id: "references",
        title: "References",
        level: 1,
        paragraphs: [
          "Anderson, K. & Lee, J. (2022). Guided Visual Anchors for Extended Reading Interfaces.",
          "Meyer, T. et al. (2021). Cognitive Load in Long-Form Digital Document Navigation.",
          "W3C. (2023). Web Content Accessibility Guidelines (WCAG) 2.2."
        ]
      }
    ]
  },
  {
    id: "orientation-documents",
    badge: "PEER REVIEWED",
    badgeBg: "#ffead9",
    badgeColor: "#873600",
    published: "Published Mar 2026",
    title:
      "A Comparative Analysis of Monolith vs Microservices Energy Consumption",
    description:
      "Evaluates monolithic and microservice architectures under controlled workloads, showing statistically significant energy differences in medium and heavy load scenarios.",
    image: "/images/library/search.png",
    authorNames: "Dr. Roberta Capuano, Eoan O'Dea, & Prof. Henry Muccini",
    authorInstitution: "University of L'Aquila, Italy",
    sections: [
      {
        id: "abstract",
        title: "Abstract",
        level: 1,
        paragraphs: [
          "As energy demands rise and sustainability becomes critical, Information and Communication Technology’s energy footprint is increasingly monitored. In this context, software architecture may play a significant role in determining a system’s energy consumption.",
          "This study aims to evaluate and compare the energy consumption of monolithic and microservice-based software to understand their implications for sustainable software design. We applied a cohort study approach in a controlled experimental environment using two open-source Java applications—PetClinic and TicketMonster—each implemented in both monolithic and microservice versions. Three use cases, representing different workloads, were defined and executed 30 times each per version, resulting in 360 total runs. Server energy use was measured with Powerstat and analyzed using Welch’s t-test.",
          "Our findings show that microservices may consume less energy than their monolithic counterparts under medium and heavy loads. Specifically, PetClinic and TicketMonster showed energy reductions of 4.99% and 5.05%, respectively. Across all use cases and applications, microservices demonstrated an average energy saving of 5.02% compared to monoliths. These results suggest that microservice architectures may offer improved energy efficiency in high-demand scenarios due to better resource utilization and modular execution. While the study is limited to controlled conditions and two case studies, it provides a foundation for further research on architectural decisions and sustainable software engineering practices."
        ]
      },
      {
        id: "introduction",
        title: "1. Introduction",
        level: 1,
        paragraphs: [
          "Advancements in Information and Communication Technology (ICT) have greatly enhanced modern life but also driven a sharp increase in global energy consumption, which has tripled since 1980. Projections suggest energy demand will exceed supply by 2030 [1]. This trend highlights the need for energy-efficient software systems [2, 3], especially as ICT accounts for 1.8% to 3.9% of Global Greenhouse Gas (GHG) emissions [4, 5]. Sustainability is becoming a key focus in regulations and corporate strategy. Policies like the EU’s Ecodesign for Sustainable Products Regulation [6] and the Corporate Sustainability Reporting Directive [7] now push organizations to assess and report the environmental impact of their digital infrastructure. Reflecting this shift, Gartner predicts that by 2027, 30% of large enterprises will include software sustainability in non-functional requirements, naming green software engineering a top trend for 2024 [21, 22].",
          "Although energy efficiency is not (yet) explicitly listed among the software quality standards that designers must evaluate during the design phase [12], research increasingly recognizes the architectural level as key to addressing energy-related concerns [13, 14]. Decisions regarding system distribution or communication styles directly affect energy use [15], requiring architects to balance Quality of Service (QoS) and energy efficiency [25]. Selecting appropriate architectural development models is thus essential to meet non-functional requirements, including sustainability [9, 10]. While architectural styles are known to influence attributes like latency, scalability, and reliability [15], their impact on software sustainability, particularly considering energy consumption, remains underexplored. This study addresses this gap by comparing the energy consumption of monolithic versus functionally equivalent microservice-based applications. This choice is driven by three main factors: (i) extensive prior work on migrating to microservices for better cohesion and coupling, with limited evaluation of resulting energy impacts; (ii) ongoing academic and industrial interest in migration both to [23, 24] and from [16, 17] microservices, and (iii) industry forecasts pointing to widespread adoption of microservices, with 74% of organizations already using them and 23% planning to adopt them [20].",
          "By clarifying the sustainability implications of foundational architectural choices, this research establishes a necessary baseline for understanding energy behavior in software systems—one that can inform both immediate decisions and future investigations into finer architectural variations. Thus, the goal of this paper is to provide insights that can guide software architects in selecting architectural styles aligned with sustainability objectives. Thus, we aim to answer the following research question: “How does microservice architecture compare to monolithic architecture in terms of energy consumption?”. To answer this question, we established a controlled experimental environment using the cohort protocol [8, 26, 27] to measure the energy consumption of two open-source case studies: the PetClinic and TicketMonster applications, each implemented as functionally equivalent monolith and microservice applications. Three distinct use cases were defined for each application, executed over 30 iterations. A quantitative analysis employing Welch’s t-test was conducted to evaluate their energy consumption, allowing for a systematic comparison of the two architectural styles. This quantitative analysis revealed statistically significant differences in energy consumption between a monolith and a microservice architecture, especially considering medium and heavy load use cases.",
          "The rest of this paper is structured as follows: Sect. 2 presents the state-of-the-art in measuring the energy consumption of software applications. The implementation of the cohort protocol for the construction of the research methodology is reported in Sect. 3. Section 4 shows how the research methodology has been applied on the PetClinic and TicketMonster applications to perform the energy measurements. The results are analysed and discussed in Sect. 5. Section 6 discusses the threats to validity and the future works of our study. Finally, Sect. 7 concludes the paper."
        ]
      },
      {
        id: "related-work",
        title: "2. Related Work",
        level: 1,
        paragraphs: [
          "This section presents the state of the art on processes and tools for measuring the energy consumption of software, as well as the related work on the analysis of the energy efficiency of monoliths and microservices.",
          "Software Energy Measurements Approaches: Various processes and tools have been proposed to assess software energy consumption. Ardito et al. [32] describes a four-phase method—goal definition, method selection, measurement, and analysis—to ensure reliable and comparable results. Mancebo et al. [33] propose an iterative process covering scope definition, environment setup, consumption measurement, and result analysis. Félix et al. [34] compare eleven approaches by architecture, granularity, and context. The Green Software Measurement Model (GSMM) [35] integrates existing methods, emphasizing stakeholder goals, method selection, realistic workloads, and broader data analysis. Cruz et al. [36, 37] offer guidance on experimental setup and minimizing bias.",
          "Measurement tools fall into hardware-based and hybrid methods [29]. Hardware tools (e.g., Watts Up? Pro, Monsoon [30]) provide accuracy but lack flexibility for cloud contexts. Hybrid approaches leverage counters and system metrics [31], often via tools like PowerTop, PowerStat, Intel’s Energy Checker SDK, and Microsoft’s Joulemeter. Profilers like cpufrequtils, Gnome/KDE monitors, and language-specific tools such as GNU gprof, ANTS Profiler (.NET), and JProfiler (Java) track energy via resource usage.",
          "Energy Measurements of Monoliths and Microservices: Recent research has increasingly examined the energy and performance implications of architectural patterns in cloud and microservices-based environments. Khomh et al. [38] explored cloud design patterns like Local Sharding and Priority Queues, revealing their potential to lower energy consumption, albeit with trade-offs in latency—highlighting the need for well-balanced configurations. A systematic review by Araújo et al. [1] compiles energy optimization strategies in microservices, emphasizing energy-aware architecture and identifying research gaps, especially around resource management. Zhao et al. [18] studied how microservice granularity affects energy and performance by comparing coarse-, medium-, and fine-grained versions of two systems under different workloads.",
          "Several studies address energy efficiency in cloud computing. Procaccianti et al. [11] propose tactics such as continuous monitoring, self-adaptive systems, and cloud federation to improve energy usage by dynamically managing service deployment. The Elergy model presented by De Nardin et al. [40] builds on this by using predictive algorithms for proactive resource allocation, effectively reducing energy waste from over-provisioning. Beyond infrastructure-level strategies, developer-level decisions also play a key role. Jagroep et al. [13] highlight how choices in data structures and algorithms can influence energy usage, while Seo et al. [15] show that different communication styles (e.g., client-server vs. publish-subscribe) can lead to varying energy profiles.",
          "Berry et al. [19] evaluate both monolith and microservice architectures under various replication setups, measuring energy using physical power meters on the entire machine. In contrast, we avoid confounding factors like scaling and isolate the architectural deployment model—comparing monoliths and microservices under fixed conditions, with server-only, software-based energy measurements.",
          "Literature Findings: Current research and industry initiatives demonstrate a strong focus on developing methods and tools for measuring software energy consumption. Although energy efficiency is increasingly viewed as a critical quality attribute, limited attention has been given to its connection with software architecture models. Most studies have explored how aspects like developer choices, resource management, and self-adaptive mechanisms influence the energy efficiency of microservice-based systems. Despite some researchers proposing architectural patterns and tactics to reduce energy, to the best of our knowledge, only one directly compares monolithic versus microservice architectures while also controlling for confounding variables."
        ]
      },
      {
        id: "proposed-approach",
        title: "3. Proposed Approach",
        level: 1,
        paragraphs: [
          "This research analyses the energy consumption of monolithic and microservice architectures using a cohort study approach, as established in software engineering literature [8]. This method enables structured, time-based comparisons across groups [26, 41], allowing us to assess how architectural choices influence energy use under evolving workloads. By defining cohorts based on deployment model and observing them under consistent conditions, we can isolate architectural impact from other confounding factors—making this approach well-suited to analyzing long-term energy behavior.",
          "According to the cohort protocol, we define three types of variables: independent, dependent, and confounding. The independent variable—the factor believed to influence the outcome—is the architectural development model (monolith vs. microservices). The dependent variable is the software’s energy consumption. Confounding variables are external factors that may bias this relationship. In our analysis, we control for confounders such as system environment, experiment timing, background processes, and resource usage."
        ]
      },
      {
        id: "study-design",
        title: "3.1 Study Design",
        level: 2,
        paragraphs: [
          "Cohort Selection: We define two cohorts, one for monolithic applications and one for their microservice counterparts. To reduce confounding variables, we applied inclusion criteria for project selection. We focus on open-source GitHub projects to support reproducibility. Each application must have both monolithic and microservice versions, use the same programming language (Java), and provide full-stack functionality (frontend, backend, and storage). Additionally, all applications must be deployable in containerized environments (e.g., Docker) to ensure consistency and isolation during experiments. We further restricted our selection to applications built with the widely adopted Spring ecosystem. Selected applications do not explicitly include sustainability or energy consumption as non-functional requirements, ensuring their architectures were not pre-optimized for energy efficiency.",
          "Experimental Setup: We conducted our experiments in a local environment to reduce confounding variables, avoiding noise from network latency and shared resources. A client-server architecture was used, with server and client hosted on separate machines, ensuring energy measurements—taken only on the server—were not affected by client-side activities. The server ran Ubuntu Server 20.04 LTS, chosen for its efficiency and reduced background process interference compared to desktop environments.",
          "To understand system responses under realistic conditions, we chose three use cases to reflect different operational loads: light, medium, and heavy. Each use case contains a frontend list of tasks and a selection of API requests. Both were executed with 50 parallel instances to simulate concurrent user activity.",
          "Energy consumption was monitored using Powerstat, which captures system-wide power usage. We automated the process with bash scripts for reproducibility. Each use case was processed by a workload generator and executed on the client using Selenium for frontend interactions and Newman for API requests."
        ]
      },
      {
        id: "data-collection",
        title: "3.2 Data Collection, Analysis and Interpretation",
        level: 2,
        paragraphs: [
          "Energy data was collected on the server side at regular one-second intervals using Powerstat, allowing the experiment to capture both steady-state and transient phases [37], resulting in 393 samples per iteration per use case per architecture.",
          "To reduce fluctuations and outliers, two averaging techniques were applied: individual-iteration averaging and multiple-iteration averaging across all runs.",
          "Each experiment was repeated 30 times per architecture per use case [36, 49], totaling 60 runs per use case and 360 independent runs overall. This repetition reduces random variability and improves result reliability."
        ]
      },
      {
        id: "case-studies",
        title: "4. Application to the Case Studies",
        level: 1,
        paragraphs: [
          "Applying the inclusion criteria led to two open-source applications: PetClinic (PC) and TicketMonster (TM). Both provide CRUD-related functionalities and comparable microservice complexity, and both use a common Java/Spring stack that supports representativeness and reproducibility.",
          "Architecture comparison shows a shared monolithic three-tier model (UI/API Gateway, Spring backend, MySQL) and microservice variants with independently deployable services and dedicated databases.",
          "Use-case experiments (light, medium, heavy) were repeated 30 times per application and architecture. Across both applications, heavier workloads consistently consumed more energy, and the monolith generally consumed more than microservices under equivalent conditions."
        ]
      },
      {
        id: "results-discussion",
        title: "5. Discussion",
        level: 1,
        paragraphs: [
          "General Observations: Both case studies show a similar trend where microservices generally consume less energy than monoliths, with stronger differences in TicketMonster than in PetClinic. This suggests workload intensity and runtime behavior influence the magnitude of architectural effects.",
          "Answer to the Research Question: Welch’s t-test results indicate statistically significant reductions in energy consumption for microservices under medium and high workloads. In high-load scenarios, reductions reached 8.18% (TM UC3) and 8.95% (PC UC3), with strong practical effect sizes.",
          "Across all use cases, microservices consumed on average 4.99% less energy for PetClinic and 5.05% less for TicketMonster. These results support the view that microservices can improve energy efficiency, particularly under moderate to heavy workloads."
        ]
      },
      {
        id: "threats-validity",
        title: "6. Threats to Validity",
        level: 1,
        paragraphs: [
          "Internal Validity: Selection bias and measurement noise were mitigated using open-source systems, controlled setup, and repeated iterations.",
          "External Validity: Generalizability is limited by two case studies and controlled local conditions; real cloud deployments may differ due to latency, contention, and dynamic scaling.",
          "Construct Validity: System-level measurement may not isolate energy usage by component or service. Variability from background processes, hardware fluctuations, and runtime behavior remains a known limitation.",
          "Conclusion Validity: Statistical conclusions rely on Welch’s t-test with 30 independent observations per group and reported p-values/effect sizes."
        ]
      },
      {
        id: "conclusion",
        title: "7. Conclusion",
        level: 1,
        paragraphs: [
          "This study compares monolithic and microservice architectures using two open-source applications and 360 controlled runs. Results show statistically significant differences in medium and heavy loads, with microservices reducing energy use by approximately 5% on average.",
          "While findings are promising, broader studies are needed to account for cloud-scale factors such as latency and autoscaling. Future work will investigate replication and scaling policies to refine architectural sustainability guidance."
        ]
      },
      {
        id: "data-availability",
        title: "Data Availability Statement",
        level: 1,
        paragraphs: [
          "The data that support the findings of this study are openly available on GitHub at https://github.com/eoanodea/energy-and-architectural-styles."
        ]
      },
      {
        id: "references",
        title: "References",
        level: 1,
        paragraphs: [
          "Araújo, G., et al. (2024). Energy consumption in microservices architectures: a systematic literature review.",
          "Calero, C., Piattini, M. (eds.) (2015). Green in Software Engineering.",
          "Procaccianti, G., Lago, P., Bevini, S. (2015). A systematic literature review on energy efficiency in cloud software architectures.",
          "Berry, V., et al. (2024). Is it worth migrating a monolith to microservices?",
          "Kitchenham, B., et al. (2017). Robust statistical methods for empirical software engineering.",
          "W3C. (2023). Web Content Accessibility Guidelines (WCAG) 2.2."
        ]
      }
    ]
  },
  {
    id: "nystagmus-stability",
    badge: "HIGHLY CITED",
    badgeBg: "#ffeafc",
    badgeColor: "#8c038e",
    published: "Published 3 days ago",
    title: "Line Tracking and Visual Stability for Users with Nystagmus",
    description:
      "Investigates how guided visual anchors can support line tracking, reduce fatigue, and improve reading stability for users with nystagmus.",
    image: "/images/library/reading.png",
    authorNames: "Dr. Amina Park & Prof. Lucas Chen",
    authorInstitution:
      "Center for Inclusive Interaction, University of Washington",
    sections: [
      {
        id: "abstract",
        title: "Abstract",
        level: 1,
        paragraphs: [
          "This study explores how guided visual anchors can improve line tracking and reading stability for people with nystagmus.",
          "Participants reported reduced fatigue and fewer regressions when subtle overlays were used to preserve orientation across dense paragraphs."
        ]
      },
      {
        id: "introduction",
        title: "1. Introduction",
        level: 1,
        paragraphs: [
          "Users with nystagmus often experience unstable fixation during long reading tasks, especially in visually dense layouts.",
          "This work investigates assistive guidance patterns designed to preserve line position and reduce reorientation effort."
        ]
      },
      {
        id: "methodology",
        title: "2. Methodology",
        level: 1,
        paragraphs: [
          "Participants completed structured reading tasks under baseline and guided conditions with equivalent passage complexity.",
          "Performance and comfort were measured through comprehension checks, interruption counts, and perceived strain ratings."
        ]
      },
      {
        id: "data-collection",
        title: "2.1 Data Collection",
        level: 2,
        paragraphs: [
          "Session logs captured navigation regressions and pause points, while interviews documented coping strategies and fatigue patterns.",
          "The protocol prioritized short blocks to minimize confounding from prolonged visual strain."
        ]
      },
      {
        id: "results-discussion",
        title: "3. Results & Discussion",
        level: 1,
        paragraphs: [
          "Guided anchors improved line recovery speed and reduced frustration during long passages.",
          "Participants preferred subtle cues over highly dynamic effects, reinforcing the value of predictable guidance."
        ]
      },
      {
        id: "future-work",
        title: "4. Future Work",
        level: 1,
        paragraphs: [
          "Future studies will compare static, adaptive, and user-customized guidance profiles across broader visual conditions.",
          "Additional work will evaluate integration with platform-level accessibility settings."
        ]
      },
      {
        id: "conclusion",
        title: "5. Conclusion",
        level: 1,
        paragraphs: [
          "Lightweight guided overlays can improve reading stability and confidence for users with nystagmus.",
          "The findings support practical adoption in accessible reading tools where low complexity is essential."
        ]
      },
      {
        id: "references",
        title: "References",
        level: 1,
        paragraphs: [
          "Ishikawa, S. & Romero, P. (2021). Visual Stabilization Cues for Eye-Movement Disorders.",
          "Foster, L. et al. (2024). Reading Interfaces for Neuro-Ophthalmic Accessibility.",
          "W3C. (2023). Web Content Accessibility Guidelines (WCAG) 2.2."
        ]
      }
    ]
  }
] as const;

export const publicationById = publications.reduce<Record<string, Publication>>(
  (acc, publication) => {
    acc[publication.id] = publication;
    return acc;
  },
  {}
);
