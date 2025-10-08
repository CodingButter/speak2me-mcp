import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Textarea,
  Label,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from "@s2m-pac/ui";
import { AlertCircle, Plus, Trash2, Save, RefreshCw, Settings2 } from "lucide-react";
import type { ClaudeConfig, McpServerConfig } from "@s2m-pac/shared";
import { McpServerDialog } from "./McpServerDialog";
import { claudeConfigApi } from "../lib/api-client";

interface Props {
  conversationId: string;
}

const AVAILABLE_MODELS = [
  { value: "claude-sonnet-4-5-20250929", label: "Claude 3.5 Sonnet" },
  { value: "claude-opus-4-1-20250805", label: "Claude 3 Opus" },
  { value: "claude-haiku-3-5-20241022", label: "Claude 3.5 Haiku" },
];

const PERMISSION_MODES = [
  { value: "default", label: "Default" },
  { value: "acceptEdits", label: "Accept Edits" },
  { value: "bypassPermissions", label: "Bypass Permissions" },
  { value: "plan", label: "Plan Mode" },
];

const COMMON_TOOLS = [
  "Read", "Write", "Edit", "Grep", "Glob", "Bash",
  "Task", "WebSearch", "WebFetch", "TodoWrite",
  "NotebookEdit", "BashOutput", "KillShell", "SlashCommand",
];

export function ClaudeConfig({ conversationId }: Props) {
  const queryClient = useQueryClient();
  const [config, setConfig] = useState<Partial<ClaudeConfig>>({});
  const [templateVars, setTemplateVars] = useState<Record<string, string>>({});
  const [mcpServers, setMcpServers] = useState<Record<string, McpServerConfig>>({});
  const [extractedVars, setExtractedVars] = useState<string[]>([]);
  const [validationError, setValidationError] = useState("");
  const [mcpDialogOpen, setMcpDialogOpen] = useState(false);
  const [editingMcpServer, setEditingMcpServer] = useState<{ name: string; config: McpServerConfig } | null>(null);

  // Query for loading config
  const { data: configData, isLoading: loading } = useQuery({
    queryKey: ["claudeConfig", conversationId],
    queryFn: () => claudeConfigApi.get(conversationId),
    enabled: !!conversationId,
  });

  // Update local state when config data loads
  useEffect(() => {
    if (configData?.ok && configData.config) {
      setConfig(configData.config);
      setTemplateVars(configData.config.templateVars || {});
      setMcpServers(configData.config.mcpServers || {});
      if (configData.config.systemPromptTemplate) {
        validateTemplateMutation.mutate({
          template: configData.config.systemPromptTemplate,
          vars: configData.config.templateVars || {},
        });
      }
    }
  }, [configData]);

  // Mutation for saving config
  const saveConfigMutation = useMutation({
    mutationFn: () => claudeConfigApi.update(conversationId, {
      ...config,
      templateVars,
      mcpServers: Object.keys(mcpServers).length > 0 ? mcpServers : null,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claudeConfig", conversationId] });
    },
  });

  // Mutation for validating template
  const validateTemplateMutation = useMutation({
    mutationFn: ({ template, vars }: { template: string; vars: Record<string, string> }) =>
      claudeConfigApi.validateTemplate(conversationId, template, vars),
    onSuccess: (data) => {
      setExtractedVars(data.extractedVariables || []);
      setValidationError(data.valid ? "" : `Missing variables: ${data.missingVariables.join(", ")}`);
    },
  });

  const saveConfig = () => {
    saveConfigMutation.mutate();
  };

  const validateTemplate = (template: string, vars: Record<string, string>) => {
    validateTemplateMutation.mutate({ template, vars });
  };

  const loadConfig = () => {
    queryClient.invalidateQueries({ queryKey: ["claudeConfig", conversationId] });
  };

  const addToolToList = (list: "allowed" | "disallowed", tool: string) => {
    const key = list === "allowed" ? "allowedTools" : "disallowedTools";
    const current = config[key] || [];
    if (!current.includes(tool)) {
      setConfig({ ...config, [key]: [...current, tool] });
    }
  };

  const removeToolFromList = (list: "allowed" | "disallowed", tool: string) => {
    const key = list === "allowed" ? "allowedTools" : "disallowedTools";
    const current = config[key] || [];
    setConfig({ ...config, [key]: current.filter((t) => t !== tool) });
  };

  const handleMcpServerSave = (name: string, serverConfig: McpServerConfig) => {
    setMcpServers({
      ...mcpServers,
      [name]: serverConfig,
    });
    setEditingMcpServer(null);
    setMcpDialogOpen(false);
  };

  const editMcpServer = (name: string, config: McpServerConfig) => {
    setEditingMcpServer({ name, config });
    setMcpDialogOpen(true);
  };

  const removeMcpServer = (name: string) => {
    const updated = { ...mcpServers };
    delete updated[name];
    setMcpServers(updated);
  };

  if (loading) {
    return <div className="p-4">Loading configuration...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Claude Agent Configuration</CardTitle>
          <CardDescription>
            Configure how Claude responds and behaves in this conversation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Voice Settings */}
          <div className="flex items-center justify-between">
            <Label htmlFor="voice-enabled">Enable Voice Mode</Label>
            <Switch
              id="voice-enabled"
              checked={config.voiceEnabled || false}
              onCheckedChange={(checked) =>
                setConfig({ ...config, voiceEnabled: checked })
              }
            />
          </div>

          {config.voiceEnabled && (
            <div className="space-y-2">
              <Label htmlFor="voice-directives">Voice Directives</Label>
              <Textarea
                id="voice-directives"
                placeholder="Instructions about voice behavior, tone, speaking style..."
                value={config.voiceDirectives || ""}
                onChange={(e) =>
                  setConfig({ ...config, voiceDirectives: e.target.value })
                }
                rows={3}
              />
            </div>
          )}

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select
              value={config.model || "claude-sonnet-4-5-20250929"}
              onValueChange={(value) => setConfig({ ...config, model: value })}
            >
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Permission Mode */}
          <div className="space-y-2">
            <Label htmlFor="permission-mode">Permission Mode</Label>
            <Select
              value={config.permissionMode || "acceptEdits"}
              onValueChange={(value: any) =>
                setConfig({ ...config, permissionMode: value })
              }
            >
              <SelectTrigger id="permission-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PERMISSION_MODES.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Max Turns */}
          <div className="space-y-2">
            <Label htmlFor="max-turns">Max Turns</Label>
            <Input
              id="max-turns"
              type="number"
              min="1"
              max="100"
              value={config.maxTurns || 10}
              onChange={(e) =>
                setConfig({ ...config, maxTurns: parseInt(e.target.value) })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* System Prompt Template */}
      <Card>
        <CardHeader>
          <CardTitle>System Prompt Template</CardTitle>
          <CardDescription>
            Define how Claude should behave. Use {"{{variable}}"} syntax for dynamic content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt">System Prompt</Label>
            <Textarea
              id="system-prompt"
              placeholder="You are Claude, a helpful AI assistant..."
              value={config.systemPromptTemplate || ""}
              onChange={(e) => {
                setConfig({ ...config, systemPromptTemplate: e.target.value });
                validateTemplate(e.target.value, templateVars);
              }}
              rows={6}
            />
            {validationError && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{validationError}</span>
              </div>
            )}
          </div>

          {/* Template Variables */}
          {extractedVars.length > 0 && (
            <div className="space-y-2">
              <Label>Template Variables</Label>
              <div className="space-y-2">
                {extractedVars.map((varName) => (
                  <div key={varName} className="flex items-center gap-2">
                    <Badge variant="secondary">{`{{${varName}}}`}</Badge>
                    <Input
                      placeholder={`Value for ${varName}`}
                      value={templateVars[varName] || ""}
                      onChange={(e) => {
                        const updated = { ...templateVars, [varName]: e.target.value };
                        setTemplateVars(updated);
                        if (config.systemPromptTemplate) {
                          validateTemplate(config.systemPromptTemplate, updated);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Instructions */}
          <div className="space-y-2">
            <Label htmlFor="custom-instructions">Additional Instructions</Label>
            <Textarea
              id="custom-instructions"
              placeholder="Any additional context or instructions..."
              value={config.customInstructions || ""}
              onChange={(e) =>
                setConfig({ ...config, customInstructions: e.target.value })
              }
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tools Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Tools Configuration</CardTitle>
          <CardDescription>
            Control which tools Claude can use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="allowed">
              <AccordionTrigger>
                Allowed Tools ({config.allowedTools?.length || 0})
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {config.allowedTools?.map((tool) => (
                    <Badge
                      key={tool}
                      variant="default"
                      className="cursor-pointer"
                      onClick={() => removeToolFromList("allowed", tool)}
                    >
                      {tool} <Trash2 className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={(tool) => addToolToList("allowed", tool)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add tool..." />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMON_TOOLS.filter(
                      (t) => !config.allowedTools?.includes(t)
                    ).map((tool) => (
                      <SelectItem key={tool} value={tool}>
                        {tool}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="disallowed">
              <AccordionTrigger>
                Disallowed Tools ({config.disallowedTools?.length || 0})
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {config.disallowedTools?.map((tool) => (
                    <Badge
                      key={tool}
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => removeToolFromList("disallowed", tool)}
                    >
                      {tool} <Trash2 className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={(tool) => addToolToList("disallowed", tool)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Block tool..." />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMON_TOOLS.filter(
                      (t) => !config.disallowedTools?.includes(t)
                    ).map((tool) => (
                      <SelectItem key={tool} value={tool}>
                        {tool}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* MCP Servers */}
      <Card>
        <CardHeader>
          <CardTitle>MCP Servers</CardTitle>
          <CardDescription>
            Configure additional MCP servers for Claude to use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(mcpServers).map(([name, server]) => (
            <div key={name} className="flex items-center justify-between p-2 border rounded">
              <div className="flex-1">
                <Badge>{name}</Badge>
                <span className="ml-2 text-sm text-muted-foreground">
                  Type: {server.type || "stdio"}
                </span>
                {server.command && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    | Command: {server.command}
                  </span>
                )}
                {server.url && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    | URL: {server.url}
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editMcpServer(name, server)}
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMcpServer(name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              setEditingMcpServer(null);
              setMcpDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add MCP Server
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={loadConfig}>
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button onClick={saveConfig} disabled={saveConfigMutation.isPending}>
          <Save className="mr-2 h-4 w-4" />
          {saveConfigMutation.isPending ? "Saving..." : "Save Configuration"}
        </Button>
      </div>

      {/* MCP Server Dialog */}
      <McpServerDialog
        open={mcpDialogOpen}
        onClose={() => {
          setMcpDialogOpen(false);
          setEditingMcpServer(null);
        }}
        onSave={handleMcpServerSave}
        initialName={editingMcpServer?.name}
        initialConfig={editingMcpServer?.config}
      />
    </div>
  );
}