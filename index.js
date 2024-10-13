/**
 * 渡されたエレメントIDのコードをコピーさせる
 * @param {string} elementId 
 */
function copyButton(elementId) {
    const element = document.getElementById(elementId);
    navigator.clipboard.writeText(element.textContent);
}