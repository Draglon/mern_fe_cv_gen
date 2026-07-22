import * as apiRoutes from "../apiRoutes";

describe("apiRoutes constants", () => {
  describe("User", () => {
    it("authLoginRoute", () => {
      expect(apiRoutes.authLoginRoute).toBe("/auth/login");
    });

    it("authRegistrationRoute", () => {
      expect(apiRoutes.authRegistrationRoute).toBe("/auth/register");
    });

    it("authUserRoute", () => {
      expect(apiRoutes.authUserRoute).toBe("/auth/user");
    });

    it("usersRoute", () => {
      const userId = "7";
      expect(apiRoutes.usersRoute(userId)).toBe(`/users/${userId}`);
    });

    it("usersEmailRoute", () => {
      const userId = "7";
      expect(apiRoutes.usersEmailRoute(userId)).toBe(`/users/${userId}/email`);
    });

    it("usersPasswordRoute", () => {
      const userId = "7";
      expect(apiRoutes.usersPasswordRoute(userId)).toBe(`/users/${userId}/password`);
    });

    it("usersResumeRoute", () => {
      const userId = "7";
      expect(apiRoutes.usersResumeRoute(userId)).toBe(`/users/${userId}/resume`);
    });
  });

  describe("Resume", () => {
    it("resumeRoute", () => {
      const userId = "7";
      expect(apiRoutes.resumeRoute(userId)).toBe(`/resume/${userId}`);
    });
  });

  describe("Personal information", () => {
    it("personalInfoCreateRoute", () => {
      expect(apiRoutes.personalInfoCreateRoute).toBe(`/personal_info`);
    });

    it("personalInfoRoute", () => {
      const personalInfoId = "7";
      expect(apiRoutes.personalInfoRoute(personalInfoId)).toBe(`/personal_info/${personalInfoId}`);
    });
  });

  describe("Personal hobbies", () => {
    it("personalHobbiesCreateRoute", () => {
      expect(apiRoutes.personalHobbiesCreateRoute).toBe(`/personal_hobbies`);
    });

    it("personalHobbiesRoute", () => {
      const personalHobbiesId = "7";
      expect(apiRoutes.personalHobbiesRoute(personalHobbiesId)).toBe(`/personal_hobbies/${personalHobbiesId}`);
    });
  });

  describe("Personal languages", () => {
    it("personalLanguagesCreateRoute", () => {
      expect(apiRoutes.personalLanguagesCreateRoute).toBe(`/personal_languages`);
    });

    it("personalLanguagesRoute", () => {
      const personalLanguagesId = "7";
      expect(apiRoutes.personalLanguagesRoute(personalLanguagesId)).toBe(`/personal_languages/${personalLanguagesId}`);
    });
  });

  describe("Personal experience", () => {
    it("personalExperienceCreateRoute", () => {
      expect(apiRoutes.personalExperienceCreateRoute).toBe(`/personal_experience`);
    });

    it("personalExperienceRoute", () => {
      const personalExperienceId = "7";
      expect(apiRoutes.personalExperienceRoute(personalExperienceId)).toBe(`/personal_experience/${personalExperienceId}`);
    });
  });

  describe("Personal education", () => {
    it("personalEducationCreateRoute", () => {
      expect(apiRoutes.personalEducationCreateRoute).toBe(`/personal_education`);
    });

    it("personalEducationRoute", () => {
      const personalEducationId = "7";
      expect(apiRoutes.personalEducationRoute(personalEducationId)).toBe(`/personal_education/${personalEducationId}`);
    });
  });

  describe("Personal courses", () => {
    it("personalCoursesCreateRoute", () => {
      expect(apiRoutes.personalCoursesCreateRoute).toBe(`/personal_courses`);
    });

    it("personalCoursesRoute", () => {
      const personalCoursesId = "7";
      expect(apiRoutes.personalCoursesRoute(personalCoursesId)).toBe(`/personal_courses/${personalCoursesId}`);
    });
  });

  describe("Personal skills", () => {
    it("personalSkillsCreateRoute", () => {
      expect(apiRoutes.personalSkillsCreateRoute).toBe(`/personal_skills`);
    });

    it("personalSkillsRoute", () => {
      const personalSkillsId = "7";
      expect(apiRoutes.personalSkillsRoute(personalSkillsId)).toBe(`/personal_skills/${personalSkillsId}`);
    });
  });

  describe("Personal tools", () => {
    it("personalToolsCreateRoute", () => {
      expect(apiRoutes.personalToolsCreateRoute).toBe(`/personal_tools`);
    });

    it("personalToolsRoute", () => {
      const personalToolsId = "7";
      expect(apiRoutes.personalToolsRoute(personalToolsId)).toBe(`/personal_tools/${personalToolsId}`);
    });
  });
});
