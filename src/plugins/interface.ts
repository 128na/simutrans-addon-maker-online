import firebase from "firebase";
// Vuex Store
export interface Data {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface ProjectData extends Data {
  title: string;
  filename: string;
  imageUrls: { filename: string, url: string }[];
  dat: string;
  size: number;
}
export interface SnippetData extends Data {
  title: string;
  dat: string;
}

export interface Model {
  id: string;
  data: Data
}
export interface Project extends Model {
  data: ProjectData
}
export interface Snippet extends Model {
  data: SnippetData
}
export interface FBFile {
  createdAt: string;
  updatedAt: string;
  filename: string;
  url: string;
}
export interface State {
  user: firebase.User | undefined,
  unsubscribes: firebase.Unsubscribe[],
  projects: Project[] | undefined,
  snippets: Snippet[] | undefined,
  files: FBFile[] | undefined,
}


// API
export interface LaraveValidatonErrorBody {
  message: string,
  errors: { [index: string]: string[] }
}

export interface PakErrorBody {
  code: number,
  output: string,
  error: string,
}
