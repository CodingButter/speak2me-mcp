import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
} from "@s2m-pac/ui";
import { Plus, Trash2 } from "lucide-react";
import type { McpServerConfig } from "@s2m-pac/shared";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, config: McpServerConfig) => void;
  initialName?: string;
  initialConfig?: McpServerConfig;
}

const COMMON_MCP_SERVERS = [
  {
    name: "filesystem",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/files"],
    description: "Access to local file system",
  },
  {
    name: "github",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-github"],
    description: "GitHub repository access",
    env: { GITHUB_TOKEN: "your-token-here" },
  },
  {
    name: "postgres",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-postgres"],
    description: "PostgreSQL database access",
    env: { DATABASE_URL: "postgresql://..." },
  },
  {
    name: "puppeteer",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-puppeteer"],
    description: "Browser automation",
  },
];

export function McpServerDialog({
  open,
  onClose,
  onSave,
  initialName = "",
  initialConfig = { type: "stdio" },
}: Props) {
  const [name, setName] = useState(initialName);
  const [config, setConfig] = useState<McpServerConfig>(initialConfig);
  const [envVars, setEnvVars] = useState<Record<string, string>>(
    initialConfig.env || {}
  );
  const [args, setArgs] = useState<string[]>(initialConfig.args || []);
  const [headers, setHeaders] = useState<Record<string, string>>(
    initialConfig.headers || {}
  );
  const [newEnvKey, setNewEnvKey] = useState("");
  const [newEnvValue, setNewEnvValue] = useState("");
  const [newHeaderKey, setNewHeaderKey] = useState("");
  const [newHeaderValue, setNewHeaderValue] = useState("");

  const handlePresetSelect = (preset: typeof COMMON_MCP_SERVERS[0]) => {
    setName(preset.name);
    setConfig({
      type: "stdio",
      command: preset.command,
      args: preset.args,
      env: preset.env,
    });
    setArgs(preset.args);
    setEnvVars(preset.env || {});
  };

  const addEnvVar = () => {
    if (newEnvKey && newEnvValue) {
      setEnvVars({ ...envVars, [newEnvKey]: newEnvValue });
      setNewEnvKey("");
      setNewEnvValue("");
    }
  };

  const removeEnvVar = (key: string) => {
    const updated = { ...envVars };
    delete updated[key];
    setEnvVars(updated);
  };

  const addHeader = () => {
    if (newHeaderKey && newHeaderValue) {
      setHeaders({ ...headers, [newHeaderKey]: newHeaderValue });
      setNewHeaderKey("");
      setNewHeaderValue("");
    }
  };

  const removeHeader = (key: string) => {
    const updated = { ...headers };
    delete updated[key];
    setHeaders(updated);
  };

  const addArg = () => {
    const arg = prompt("Enter argument:");
    if (arg) {
      setArgs([...args, arg]);
    }
  };

  const removeArg = (index: number) => {
    setArgs(args.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const finalConfig: McpServerConfig = {
      ...config,
      env: Object.keys(envVars).length > 0 ? envVars : undefined,
      args: args.length > 0 ? args : undefined,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    };
    onSave(name, finalConfig);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialName ? "Edit" : "Add"} MCP Server
          </DialogTitle>
          <DialogDescription>
            Configure an MCP server for Claude to connect to
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Server Name */}
          <div className="space-y-2">
            <Label htmlFor="server-name">Server Name</Label>
            <Input
              id="server-name"
              placeholder="e.g., filesystem, github, postgres"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Presets */}
          {!initialName && (
            <div className="space-y-2">
              <Label>Quick Setup</Label>
              <div className="flex flex-wrap gap-2">
                {COMMON_MCP_SERVERS.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetSelect(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Server Type */}
          <div className="space-y-2">
            <Label htmlFor="server-type">Connection Type</Label>
            <Select
              value={config.type || "stdio"}
              onValueChange={(value: any) => setConfig({ ...config, type: value })}
            >
              <SelectTrigger id="server-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stdio">STDIO (Command)</SelectItem>
                <SelectItem value="sse">SSE (Server-Sent Events)</SelectItem>
                <SelectItem value="http">HTTP</SelectItem>
                <SelectItem value="sdk">SDK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type-specific configuration */}
          <Tabs defaultValue={config.type || "stdio"} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stdio">STDIO</TabsTrigger>
              <TabsTrigger value="sse">SSE</TabsTrigger>
              <TabsTrigger value="http">HTTP</TabsTrigger>
              <TabsTrigger value="sdk">SDK</TabsTrigger>
            </TabsList>

            <TabsContent value="stdio" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="command">Command</Label>
                <Input
                  id="command"
                  placeholder="e.g., npx, node, python"
                  value={config.command || ""}
                  onChange={(e) => setConfig({ ...config, command: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Arguments</Label>
                <div className="space-y-2">
                  {args.map((arg, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="secondary">{arg}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArg(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addArg}>
                    <Plus className="mr-2 h-3 w-3" /> Add Argument
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sse" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sse-url">SSE URL</Label>
                <Input
                  id="sse-url"
                  placeholder="http://localhost:3000/sse"
                  value={config.url || ""}
                  onChange={(e) => setConfig({ ...config, url: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="http" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="http-url">HTTP URL</Label>
                <Input
                  id="http-url"
                  placeholder="http://api.example.com"
                  value={config.url || ""}
                  onChange={(e) => setConfig({ ...config, url: e.target.value })}
                />
              </div>

              {/* HTTP Headers */}
              <div className="space-y-2">
                <Label>Headers</Label>
                <div className="space-y-2">
                  {Object.entries(headers).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <Badge variant="secondary">{key}</Badge>
                      <span className="text-sm">{value}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHeader(key)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Header name"
                      value={newHeaderKey}
                      onChange={(e) => setNewHeaderKey(e.target.value)}
                    />
                    <Input
                      placeholder="Header value"
                      value={newHeaderValue}
                      onChange={(e) => setNewHeaderValue(e.target.value)}
                    />
                    <Button variant="outline" onClick={addHeader}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sdk" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                SDK servers are configured programmatically and don't require additional settings here.
              </div>
            </TabsContent>
          </Tabs>

          {/* Environment Variables */}
          <div className="space-y-2">
            <Label>Environment Variables</Label>
            <div className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Badge variant="secondary">{key}</Badge>
                  <span className="text-sm font-mono">{value}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEnvVar(key)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  placeholder="Variable name"
                  value={newEnvKey}
                  onChange={(e) => setNewEnvKey(e.target.value)}
                />
                <Input
                  placeholder="Variable value"
                  value={newEnvValue}
                  onChange={(e) => setNewEnvValue(e.target.value)}
                />
                <Button variant="outline" onClick={addEnvVar}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name}>
            Save Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}