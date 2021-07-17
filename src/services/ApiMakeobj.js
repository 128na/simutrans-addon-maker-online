// pak化実行
export const postPak = async function (data) {
  const url = process.env.VUE_APP_MAKEOBJ_API_URL
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    return await handleError(res);
  }
  const body = await res.json();
  return body.pakfile;
};

function handleError(res) {
  switch (res.status) {
    case 400:
      return handlePakError(res);
    case 422:
      return handleValidationError(res);
    case 429:
      throw new Error("リクエスト頻度が高すぎます。\n数分経ってから再度実行してください。");
    case 500:
      throw new Error('サーバーエラーが発生しました');
    default:
      throw new Error('エラーが発生しました');
  }
}
async function handleValidationError(res) {
  const body = await res.json();
  console.log({ res })
  const msg = ['入力内容を確認してください。'];
  for (const [name, errors] of Object.entries(body.errors)) {
    msg.push(errors.join("\n"));
  }

  throw new Error(msg.join("\n"));
}

async function handlePakError(res) {
  const body = await res.json();
  throw new Error(
    `エラーが発生しました\nコード：${body.code}\n出力：${body.output}\nエラー：${body.error}`
  );
}
