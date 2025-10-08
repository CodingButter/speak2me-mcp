/**
 * Template rendering with variable substitution
 * Supports {{variable}} syntax for replacements
 */

export class TemplateRenderer {
  /**
   * Render a template string with variable substitutions
   * @param template Template string with {{variable}} placeholders
   * @param variables Object with variable values
   * @returns Rendered string
   */
  render(template: string, variables: Record<string, string>): string {
    if (!template) return template;

    let rendered = template;

    // Replace all {{variable}} occurrences
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
      rendered = rendered.replace(regex, value);
    }

    return rendered;
  }

  /**
   * Extract all variable names from a template
   * @param template Template string
   * @returns Array of variable names
   */
  extractVariables(template: string): string[] {
    if (!template) return [];

    const regex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
    const variables: string[] = [];
    let match;

    while ((match = regex.exec(template)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }

    return variables;
  }

  /**
   * Validate that all required variables are provided
   * @param template Template string
   * @param variables Provided variables
   * @returns Object with validation result and missing variables
   */
  validate(
    template: string,
    variables: Record<string, string>
  ): { valid: boolean; missing: string[] } {
    const required = this.extractVariables(template);
    const provided = Object.keys(variables);
    const missing = required.filter((v) => !provided.includes(v));

    return {
      valid: missing.length === 0,
      missing,
    };
  }
}

export const templateRenderer = new TemplateRenderer();
