import os from "os";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const BASIC_CONFIG = {
  registry: "https://registry.npmjs.org/",
  cache: path.join(os.homedir(), ".fnpm-cache"),
};

export default function readConfig() {
  const configPath = `${os.homedir()}/.fnpm/.fnpmrc`;
  const workspaceConfigPath = `${process.cwd()}/.fnpmrc`;

  if (existsSync(workspaceConfigPath)) {
    return JSON.parse(readFileSync(workspaceConfigPath, "utf8"));
  }

  if (!existsSync(configPath)) {
    // Create directory recursively
    mkdirSync(`${os.homedir()}/.fnpm`, { recursive: true });
    writeFileSync(configPath, JSON.stringify(BASIC_CONFIG, null, 2));
    return JSON.parse(readFileSync(configPath, "utf-8"));
  } else {
    return JSON.parse(readFileSync(configPath, "utf-8"));
  }
}

export function update(params: string[]) {
  const configPath = `${os.homedir()}/.fnpm/.fnpmrc`;
  const config = readConfig();

  const [key, value] = params;
  config[key] = value;
  writeFileSync(configPath, JSON.stringify(config, null, 2));
}