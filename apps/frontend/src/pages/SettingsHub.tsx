import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "@s2m-pac/ui";
import { Settings, Globe, FolderGit2, MessageSquare, ChevronRight } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function SettingsHub() {
  const navigate = useNavigate();
  const { conversations, activeConversationId } = useApp();

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-accent-blue" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your global, project, and conversation settings
          </p>
        </div>
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-accent-blue" />
            <div>
              <CardTitle>Global Settings</CardTitle>
              <CardDescription>
                Default settings that apply to all projects and conversations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => navigate("/settings/global")}
            className="w-full justify-between"
          >
            <span>Configure Global Settings</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Project Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-5 h-5 text-accent-purple" />
            <div>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>
                Configure settings specific to each project
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-3">
              Project settings override global defaults for all conversations within that project.
            </p>
            {/* TODO: Fetch and list actual projects */}
            <div className="text-sm text-muted-foreground italic">
              No projects linked yet. Visit a project page to configure project-specific settings.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-accent-green" />
            <div>
              <CardTitle>Conversation Settings</CardTitle>
              <CardDescription>
                Configure settings for individual conversations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-3">
              Conversation settings override both global and project settings.
            </p>
            {conversations.length === 0 ? (
              <div className="text-sm text-muted-foreground italic">
                No conversations yet. Create a conversation to configure its settings.
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <Button
                    key={conv.id}
                    variant="outline"
                    onClick={() => navigate(`/settings/conversation/${conv.id}`)}
                    className="w-full justify-between"
                  >
                    <span className="truncate">
                      {conv.name || `Conversation ${conv.id.slice(0, 8)}`}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
