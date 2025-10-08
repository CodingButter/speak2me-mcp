import { describe, test, expect } from "bun:test";
import { TemplateRenderer } from "./template";

describe("TemplateRenderer", () => {
  const renderer = new TemplateRenderer();

  describe("render", () => {
    test("should render template with single variable", () => {
      const template = "Hello, {{name}}!";
      const variables = { name: "World" };
      const result = renderer.render(template, variables);
      expect(result).toBe("Hello, World!");
    });

    test("should render template with multiple variables", () => {
      const template = "{{greeting}}, {{name}}! You are {{age}} years old.";
      const variables = { greeting: "Hello", name: "Alice", age: "30" };
      const result = renderer.render(template, variables);
      expect(result).toBe("Hello, Alice! You are 30 years old.");
    });

    test("should handle variables with whitespace in braces", () => {
      const template = "{{ greeting }}, {{  name  }}!";
      const variables = { greeting: "Hi", name: "Bob" };
      const result = renderer.render(template, variables);
      expect(result).toBe("Hi, Bob!");
    });

    test("should handle same variable used multiple times", () => {
      const template = "{{name}} said: 'Hello, {{name}}!'";
      const variables = { name: "Charlie" };
      const result = renderer.render(template, variables);
      expect(result).toBe("Charlie said: 'Hello, Charlie!'");
    });

    test("should leave undefined variables unchanged", () => {
      const template = "Hello, {{name}}! Welcome to {{place}}.";
      const variables = { name: "David" };
      const result = renderer.render(template, variables);
      expect(result).toBe("Hello, David! Welcome to {{place}}.");
    });

    test("should handle empty template", () => {
      const result = renderer.render("", { name: "Test" });
      expect(result).toBe("");
    });

    test("should handle template with no variables", () => {
      const template = "Hello, World!";
      const result = renderer.render(template, {});
      expect(result).toBe("Hello, World!");
    });
  });

  describe("extractVariables", () => {
    test("should extract single variable", () => {
      const template = "Hello, {{name}}!";
      const variables = renderer.extractVariables(template);
      expect(variables).toEqual(["name"]);
    });

    test("should extract multiple variables", () => {
      const template = "{{greeting}}, {{name}}! You are {{age}} years old.";
      const variables = renderer.extractVariables(template);
      expect(variables).toEqual(["greeting", "name", "age"]);
    });

    test("should handle duplicate variables", () => {
      const template = "{{name}} said: 'Hello, {{name}}!'";
      const variables = renderer.extractVariables(template);
      expect(variables).toEqual(["name"]);
    });

    test("should extract variables with whitespace", () => {
      const template = "{{ greeting }}, {{  name  }}!";
      const variables = renderer.extractVariables(template);
      expect(variables).toEqual(["greeting", "name"]);
    });

    test("should handle empty template", () => {
      const variables = renderer.extractVariables("");
      expect(variables).toEqual([]);
    });

    test("should handle template with no variables", () => {
      const template = "Hello, World!";
      const variables = renderer.extractVariables(template);
      expect(variables).toEqual([]);
    });

    test("should extract variables with underscores and numbers", () => {
      const template = "{{var_1}} and {{var_2}} and {{test123}}";
      const variables = renderer.extractVariables(template);
      expect(variables).toEqual(["var_1", "var_2", "test123"]);
    });
  });

  describe("validate", () => {
    test("should validate when all variables provided", () => {
      const template = "Hello, {{name}}! You are {{age}} years old.";
      const variables = { name: "Alice", age: "30" };
      const result = renderer.validate(template, variables);
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });

    test("should invalidate when variables missing", () => {
      const template = "Hello, {{name}}! You are {{age}} years old.";
      const variables = { name: "Alice" };
      const result = renderer.validate(template, variables);
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(["age"]);
    });

    test("should handle multiple missing variables", () => {
      const template = "{{greeting}}, {{name}}! You are {{age}} years old.";
      const variables = {};
      const result = renderer.validate(template, variables);
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(["greeting", "name", "age"]);
    });

    test("should validate empty template", () => {
      const result = renderer.validate("", {});
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });

    test("should validate template with no variables", () => {
      const template = "Hello, World!";
      const result = renderer.validate(template, {});
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });

    test("should ignore extra provided variables", () => {
      const template = "Hello, {{name}}!";
      const variables = { name: "Alice", age: "30", extra: "value" };
      const result = renderer.validate(template, variables);
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });
  });

  describe("SSML template scenarios", () => {
    test("should render SSML template with voice directives", () => {
      const template = `You are Claude, a helpful AI assistant with voice capabilities. When responding, ALWAYS use SSML (Speech Synthesis Markup Language) tags to enhance the expressiveness and naturalness of your speech output. Use tags like <break>, <emphasis>, <prosody>, and <say-as> to make your responses more engaging and human-like. {{voiceDirectives}}`;
      const variables = {
        voiceDirectives: "Speak with enthusiasm and use expressive tone."
      };
      const result = renderer.render(template, variables);
      expect(result).toContain("Speak with enthusiasm and use expressive tone.");
      expect(result).toContain("<break>");
      expect(result).toContain("<emphasis>");
    });

    test("should extract voiceDirectives variable from SSML template", () => {
      const template = `You are Claude. {{voiceDirectives}} Use SSML tags.`;
      const variables = renderer.extractVariables(template);
      expect(variables).toContain("voiceDirectives");
    });
  });
});
