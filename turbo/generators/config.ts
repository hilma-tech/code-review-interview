import { PlopTypes } from "@turbo/gen";

const packageNameValidate = (input: string) => {
  if (/[^a-z-]/.test(input)) {
    return "package name should be dashes and lowercase letters";
  }
  if (!input) {
    return "package name is required";
  }
  return true;
};

const appIdValidate = (input: string) => {
  if (!/^[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/.test(input)) {
    return "app ID should be three sections separated by dots";
  }
  return true;
};

const packageNamePrompt: PlopTypes.PromptQuestion = {
  type: "input",
  name: "name",
  message: "What is the name of the package to create?",
  validate: packageNameValidate,
};

const clientNamePrompt: PlopTypes.PromptQuestion = {
  type: "input",
  name: "name",
  message: "What is the name of the client to create?",
  validate: packageNameValidate,
};

const clientTitlePrompt: PlopTypes.PromptQuestion = {
  type: "input",
  name: "title",
  message: "What should the HTML's `title` tag say?",
  default: "Vite + React + TS",
};

const appIdPrompt: PlopTypes.PromptQuestion = {
  type: "input",
  name: "appId",
  message: "What should the app's ID be? (e.g. com.hilma.myApp)",
  validate: appIdValidate,
};

const appNamePrompt: PlopTypes.PromptQuestion = {
  type: "input",
  name: "appName",
  message: "What should the app's name be?",
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("internal", {
    description:
      "An internal package - to be used by other parts of the monorepo",
    prompts: [packageNamePrompt],
    actions: [
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/internal/{{ name }}",
        base: "templates/internal-package",
        templateFiles: ["templates/internal-package/**/*.hbs"],
      },
    ],
  });

  plop.setGenerator("client-web", {
    description:
      "A web client using React and Vite - to be built for the browser",
    prompts: [clientNamePrompt, clientTitlePrompt],
    actions: [
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/clients/{{ name }}",
        base: "templates/client-web",
        templateFiles: [
          "templates/client-web/**/*.hbs",
          "templates/client-web/**/.keep",
        ],
      },
    ],
  });

  plop.setGenerator("client-capacitor", {
    description:
      "A client using React, Vite and CapacitorJS - to be built as an app",
    prompts: [clientNamePrompt, appNamePrompt, appIdPrompt, clientTitlePrompt],
    actions: [
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/clients/{{ name }}",
        base: "templates/client-capacitor",
        templateFiles: [
          "templates/client-capacitor/**/*.hbs",
          "templates/client-capacitor/**/.keep",
        ],
      },
    ],
  });

  plop.setGenerator("client-native", {
    description:
      "A client using React and Expo (React Native) - to be built as an app",
    prompts: [clientNamePrompt, appNamePrompt],
    actions: [
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/clients/{{ name }}",
        base: "templates/client-native",
        templateFiles: [
          "templates/client-native/**/*.hbs",
          "templates/client-native/**/*.png",
        ],
      },
    ],
  });
}
