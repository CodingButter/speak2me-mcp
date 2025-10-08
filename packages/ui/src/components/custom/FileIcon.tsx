import {
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileCode2,
  FileArchive,
  FileSpreadsheet,
  FileJson,
  Database,
  Settings,
  Globe,
  Package,
  Binary,
  FileType,
  FileBox,
  Braces,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";

export interface FileIconProps {
  filename: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  maxNameLength?: number;
  className?: string;
}

// File type to icon mapping
const getFileIcon = (filename: string): LucideIcon => {
  const extension = filename.split(".").pop()?.toLowerCase() || "";

  // Images - raster formats
  if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "tiff", "tif", "ico", "heic", "heif", "avif"].includes(extension)) {
    return FileImage;
  }

  // Images - vector formats
  if (["svg", "eps", "ai", "sketch"].includes(extension)) {
    return FileImage;
  }

  // Videos
  if (["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv", "m4v", "mpg", "mpeg", "3gp", "ogv"].includes(extension)) {
    return FileVideo;
  }

  // Audio
  if (["mp3", "wav", "ogg", "m4a", "flac", "aac", "wma", "opus", "webm", "mid", "midi"].includes(extension)) {
    return FileAudio;
  }

  // JavaScript/TypeScript ecosystem
  if (["js", "jsx", "mjs", "cjs"].includes(extension)) {
    return FileCode2;
  }
  if (["ts", "tsx", "mts", "cts"].includes(extension)) {
    return FileCode2;
  }

  // Web - HTML/CSS
  if (["html", "htm", "xhtml"].includes(extension)) {
    return Globe;
  }
  if (["css", "scss", "sass", "less", "styl", "stylus"].includes(extension)) {
    return FileCode;
  }

  // Programming - compiled languages
  if (["c", "cpp", "cc", "cxx", "h", "hpp", "hxx"].includes(extension)) {
    return FileCode;
  }
  if (["java", "class", "jar"].includes(extension)) {
    return FileCode;
  }
  if (["cs", "csproj", "sln"].includes(extension)) {
    return FileCode;
  }
  if (["go", "mod", "sum"].includes(extension)) {
    return FileCode;
  }
  if (["rs", "rlib"].includes(extension)) {
    return FileCode;
  }
  if (["swift"].includes(extension)) {
    return FileCode;
  }
  if (["kt", "kts"].includes(extension)) {
    return FileCode;
  }

  // Programming - scripting languages
  if (["py", "pyc", "pyo", "pyd", "pyw", "pyz"].includes(extension)) {
    return FileCode;
  }
  if (["rb", "erb", "rake", "gemspec"].includes(extension)) {
    return FileCode;
  }
  if (["php", "phtml", "php3", "php4", "php5"].includes(extension)) {
    return FileCode;
  }
  if (["pl", "pm", "t", "pod"].includes(extension)) {
    return FileCode;
  }
  if (["lua"].includes(extension)) {
    return FileCode;
  }
  if (["r", "rmd", "rdata"].includes(extension)) {
    return FileCode;
  }

  // Shell scripts
  if (["sh", "bash", "zsh", "fish", "bat", "cmd", "ps1"].includes(extension)) {
    return FileCode;
  }

  // Config files - JSON/YAML/TOML
  if (["json", "json5", "jsonc"].includes(extension)) {
    return FileJson;
  }
  if (["yaml", "yml"].includes(extension)) {
    return Settings;
  }
  if (["toml"].includes(extension)) {
    return Settings;
  }
  if (["xml", "plist", "xsd", "dtd"].includes(extension)) {
    return Braces;
  }
  if (["ini", "cfg", "conf", "config"].includes(extension)) {
    return Settings;
  }
  if (["env", "envrc", "properties"].includes(extension)) {
    return Settings;
  }

  // Package/dependency files
  if (["lock", "lockb"].includes(extension)) {
    return Package;
  }
  if (filename === "package.json" || filename === "package-lock.json" || filename === "bun.lockb") {
    return Package;
  }
  if (filename === "Cargo.toml" || filename === "Cargo.lock") {
    return Package;
  }
  if (filename === "Gemfile" || filename === "Gemfile.lock") {
    return Package;
  }
  if (filename === "requirements.txt" || filename === "Pipfile" || filename === "poetry.lock") {
    return Package;
  }
  if (filename === "go.mod" || filename === "go.sum") {
    return Package;
  }

  // Documents - Microsoft Office
  if (["doc", "docx", "docm", "dot", "dotx"].includes(extension)) {
    return FileText;
  }
  if (["xls", "xlsx", "xlsm", "xlsb", "xlt", "xltx"].includes(extension)) {
    return FileSpreadsheet;
  }
  if (["ppt", "pptx", "pptm", "pps", "ppsx"].includes(extension)) {
    return FileBox;
  }

  // Documents - other formats
  if (["pdf"].includes(extension)) {
    return FileText;
  }
  if (["txt", "text", "log"].includes(extension)) {
    return FileText;
  }
  if (["md", "markdown", "mdx"].includes(extension)) {
    return FileText;
  }
  if (["rtf", "odt", "ods", "odp"].includes(extension)) {
    return FileText;
  }
  if (["tex", "latex", "bib"].includes(extension)) {
    return FileText;
  }

  // Data formats
  if (["csv", "tsv", "psv"].includes(extension)) {
    return FileSpreadsheet;
  }
  if (["parquet", "avro", "orc"].includes(extension)) {
    return Database;
  }
  if (["json", "ndjson", "jsonl"].includes(extension)) {
    return FileJson;
  }

  // Database files
  if (["sql", "mysql", "pgsql", "sqlite", "db", "sqlite3", "db3"].includes(extension)) {
    return Database;
  }
  if (["mdb", "accdb"].includes(extension)) {
    return Database;
  }

  // Archives
  if (["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "lz", "lzma", "z", "tgz", "tbz", "tbz2", "txz"].includes(extension)) {
    return FileArchive;
  }
  if (["cab", "deb", "rpm", "dmg", "pkg", "apk", "ipa"].includes(extension)) {
    return FileArchive;
  }

  // Binary/executable files
  if (["exe", "dll", "so", "dylib", "bin", "app"].includes(extension)) {
    return Binary;
  }
  if (["wasm", "elf", "o", "obj"].includes(extension)) {
    return Binary;
  }

  // Font files
  if (["ttf", "otf", "woff", "woff2", "eot"].includes(extension)) {
    return FileType;
  }

  // 3D/CAD files
  if (["obj", "fbx", "dae", "3ds", "blend", "stl", "gltf", "glb"].includes(extension)) {
    return FileBox;
  }

  // Design files
  if (["psd", "psb", "ai", "xd", "fig", "sketch"].includes(extension)) {
    return FileImage;
  }

  // Specialized formats
  if (["ipynb"].includes(extension)) {
    return FileCode;
  }
  if (["dockerfile", "dockerignore"].includes(filename.toLowerCase())) {
    return Settings;
  }
  if (["makefile", "cmake", "rakefile"].includes(filename.toLowerCase())) {
    return Settings;
  }
  if (filename === ".gitignore" || filename === ".gitattributes" || filename === ".gitmodules") {
    return Settings;
  }
  if (filename === ".env" || filename.startsWith(".env.")) {
    return Settings;
  }
  if (filename === "README" || filename === "README.md" || filename === "LICENSE") {
    return FileText;
  }

  // Default
  return File;
};

const truncateFilename = (filename: string, maxLength: number): string => {
  if (filename.length <= maxLength) return filename;

  const extension = filename.split(".").pop() || "";
  const nameWithoutExt = filename.slice(0, -(extension.length + 1));
  const availableLength = maxLength - extension.length - 4; // 4 for "..." and "."

  if (availableLength <= 0) {
    return `${filename.slice(0, maxLength - 3)}...`;
  }

  return `${nameWithoutExt.slice(0, availableLength)}...${extension}`;
};

export function FileIcon({
  filename,
  size = "md",
  showName = true,
  maxNameLength = 20,
  className,
}: FileIconProps) {
  const Icon = getFileIcon(filename);
  const displayName = truncateFilename(filename, maxNameLength);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  if (!showName) {
    return <Icon className={cn(sizeClasses[size], "text-text-secondary", className)} />;
  }

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <Icon className={cn(sizeClasses[size], "text-text-secondary")} />
      <span className={cn(textSizeClasses[size], "text-text-tertiary text-center max-w-full truncate")}>
        {displayName}
      </span>
    </div>
  );
}
