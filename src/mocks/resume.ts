import { ResumeProps } from "@/lib/constants/props/resume";

export const resume: ResumeProps = {
  personalInfo: {
    userUrl: {
      en: "photoUrl",
      ua: "photoUrl",
      ru: "photoUrl",
    },
    firstName: {
      en: "John",
      ua: "John",
      ru: "John",
    },
    lastName: {
      en: "Doe",
      ua: "Doe",
      ru: "Doe",
    },
    email: {
      en: "john@example.com",
      ua: "john@example.com",
      ru: "john@example.com",
    },
    aboutMe: {
      en: "Developer",
      ua: "Developer",
      ru: "Developer",
    },
    address: {
      en: "New York",
      ua: "New York",
      ru: "New York",
    },
    phoneNumber: {
      en: "+123456789",
      ua: "+123456789",
      ru: "+123456789",
    },
    birthday: {
      en: "01.01.1990",
      ua: "01.01.1990",
      ru: "01.01.1990",
    },
  },

  personalHobbies: {
    hobbies: {
      en: [{ hobby: "hobby 1" }, { hobby: "hobby 2" }],
      ua: [],
      ru: [],
    },
  },

  personalLanguages: {
    languages: {
      en: [{
        language: "English",
        level: "intermediate",
      }, 
      {
        language: "Ukrainian",
        level: "native",
      }],
      ua: [],
      ru: [],
    },
  },

  personalExperience: {
    recentPositionsCount: 2,
    experiences: {
      en: [
        {
          position: "Developer",
          companyName: "Luxsoft",
          location: "Dnipro",
          employmentType: "fullTime",
          workFormat: "office",
          startDate: "2024-01-20",
          endDate: "",
          isCurrent: true,
          description: "Description",
          skills: ["skill 1", "skill 2"],
         },
        {
          position: "Senior Developer",
          companyName: "Phonexa",
          location: "Dnipro",
          employmentType: "fullTime",
          workFormat: "office",
          startDate: "2024-01-20",
          endDate: "",
          isCurrent: true,
          description: "Description",
          skills: ["skill 1", "skill 2"],
        },
        {
          position: "Lead Developer",
          companyName: "Cleveroad",
          location: "Dnipro",
          employmentType: "fullTime",
          workFormat: "office",
          startDate: "2024-01-20",
          endDate: "",
          isCurrent: true,
          description: "Description",
          skills: ["skill 1", "skill 2"],
        },
      ],
      ua: [],
      ru: [],
    },
  },

  personalEducation: {
    education: {
      en: [{
        institute: "Institute 1",
        degree: "Degree 1",
        faculty: "Faculty 1",
        specialization: "Specialization 1",
        startDate: "2022-02-21",
        endDate: "2023-02-21",
        isCurrent: false,
      }],
      ua: [],
      ru: [],
    },
  },

  personalCourses: {
    courses: {
      en: [{
        course: "Course 1",
        description: "Description 1",
        startDate: "2022-02-21",
        endDate: "2023-02-21",
        isCurrent: false,
      }],
      ua: [],
      ru: [],
    },
  },

  personalSkills: {
    skills: {
      en: [{
        skill: "Skill 1",
        level: 100,
        visible: true,
      },
      {
        skill: "Skill 2",
        level: 100,
        visible: true,
      }],
      ua: [],
      ru: [],
    },
  },

  personalTools: {
    tools: {
      en: [{
        tool: "Tool 1",
        level: 100,
        visible: true,
      },
      {
        tool: "Tool 2",
        level: 100,
        visible: true,
      }],
      ua: [],
      ru: [],
    },
  },
};

export const resumeWithoutSections: ResumeProps = {
  ...resume,
  personalInfo: {
    ...resume.personalInfo,
  },
  personalHobbies: {
    ...resume.personalHobbies,
    hobbies: {
      en: [],
      ru: [],
      ua: [],
    },
  },
  personalLanguages: {
    ...resume.personalLanguages,
    languages: {
      en: [],
      ru: [],
      ua: [],
    },
  },
  personalEducation: {
    ...resume.personalEducation,
    education: {
      en: [],
      ru: [],
      ua: [],
    },
  },
  personalCourses: {
    ...resume.personalCourses,
    courses: {
      en: [],
      ru: [],
      ua: [],
    },
  },
  personalSkills: {
    ...resume.personalSkills,
    skills: {
      en: [],
      ru: [],
      ua: [],
    },
  },
  personalTools: {
    ...resume.personalTools,
    tools: {
      en: [],
      ru: [],
      ua: [],
    },
  },
};