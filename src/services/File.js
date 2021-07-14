// ファイルオブジェクトからバイナリデータを読み取る
export const asyncFileReader = function (files) {
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
export const asyncTextReader = function (files) {
  return Promise.all(files.map((file) => {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res({ file, result: r.result });
      r.onerror = () => rej({ file, error: r.error });
      r.readAsText(file);
    });
  }));
};


export const dataURL2File = function (dataURL, name) {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeType = dataURL.match(/(:)([a-z\/]+)(;)/)[2];

  for (var i = 0, l = byteString.length, content = new Uint8Array(l); l > i; i++) {
    content[i] = byteString.charCodeAt(i);
  }

  return new File([content], name, { type: mimeType });
};

// ファイルダウンロード
export const download = async function (url, name = '') {
  const res = await fetch(url);
  const blob = await res.blob();

  const files = await asyncFileReader([blob]);

  const link = document.createElement("a");
  link.download = name;
  link.href = files[0].result;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
