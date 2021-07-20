import firebase from "firebase";
// Vuex Store
export interface Data {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface ProjectData extends Data { }
export interface SnippetData extends Data { }

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

export interface State {
  user: firebase.User | undefined,
  unsubscribes: firebase.Unsubscribe[],
  projects: Project[] | undefined,
  snippets: Snippet[] | undefined,
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
