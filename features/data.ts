import * as path from "node:path";
import * as fs from "node:fs";

export interface ChannelData {
  name: string;
  id: string;
}

class JsonDatabase {
  private filePath: string;

  constructor(filename: string) {
    const dataDir = path.resolve(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    this.filePath = path.join(dataDir, filename);

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]', 'utf-8');
    }
  }

  private readChannels(): ChannelData[] {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(raw) as ChannelData[];
  }

  private writeChannels(data: ChannelData[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  addChannel(entry: ChannelData): void {
    const channels = this.readChannels();
    if (channels.find(e => e.id === entry.id)) {
      console.error(`Existing ID: ${entry.id}`);
      return;
    }
    channels.push(entry);
    this.writeChannels(channels);
  }

  findByName(name: string): ChannelData[] {
    const channels = this.readChannels();
    return channels.filter(e => e.name.toLowerCase().startsWith(name.toLowerCase()));
  }

  deleteById(id: string): void {
    const channels = this.readChannels();
    const newChannels = channels.filter(e => e.id !== id);
    this.writeChannels(newChannels);
  }
}

const db = new JsonDatabase('channels.json');

export default db;