// ファイルオブジェクトからバイナリデータを読み取る
export const asyncFileReader = function (files: Blob[]) {
  return Promise.all(files.map((file) => {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res({ file, result: r.result });
      r.onerror = () => rej({ file, error: r.error });
      r.readAsDataURL(file);
    });
  }));
};
// ファイルオブジェクトからバイナリデータを読み取る
export const asyncTextReader = function (files: Blob[]) {
  return Promise.all(files.map((file) => {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res({ file, result: r.result });
      r.onerror = () => rej({ file, error: r.error });
      r.readAsText(file);
    });
  }));
};


export const dataURL2File = function (dataURL: string, name: string) {
  const byteString: string = atob(dataURL.split(",")[1]);
  const mimeType: string = (dataURL.match(/(:)([a-z\/]+)(;)/) || [])[2] || '';

  const l = byteString.length;
  const content = new Uint8Array(l);
  for (let i = 0; l > i; i++) {
    content[i] = byteString.charCodeAt(i);
  }

  return new File([content], name, { type: mimeType });
};

// ファイルダウンロード
export const download = async function (url: string, name = '') {
  const res = await fetch(url);
  const blob: Blob = await res.blob();

  const files: any[] = await asyncFileReader([blob]);

  const link = document.createElement("a");
  link.download = name;
  link.href = files[0].result;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
