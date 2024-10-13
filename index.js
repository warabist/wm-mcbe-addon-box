/**
 * 渡されたエレメントIDのコードをコピーさせる
 * @param {string} elementId 
 * @param {string} buttonTextId 
 */
function copyButton(elementId, buttonTextId) {

    //コピーする
    const element = document.getElementById(elementId);
    navigator.clipboard.writeText(element.textContent);

    //CopyをCopiedに変更
    const button = document.getElementById(buttonTextId);
    button.innerHTML = 'Copied';

}