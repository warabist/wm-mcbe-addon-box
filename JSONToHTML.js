/**
 * jsonを基にしてhtmlを構築
 * @param {string} dataPath 
 */
function JSONToHTML(dataPath) {

    const content = document.getElementById('content');

    //ヘッダー
    fetch("https://warabist.github.io/wm-mcbe-addon-box/header.html")
        .then((response) => response.text())
        .then((data) => content.insertAdjacentHTML('afterbegin', data));

    //メインコンテンツ
    fetch(dataPath)
        .then((response) => response.text())
        .then((data) => content.appendChild(createDescription(JSON.parse(data))));

}

/**
 * 要素の説明を作る
 * @param {{
 * name: string,
 * description: string | undefined,
 * type: string,
 * properties: object[] | undefined,
 * example: { name: string, path: string }[] | undefined
 * }} data 
 * @param {boolean} isProperty 
 * @returns {Element}
 */
function createDescription(data, isProperty = false) {

    const div = document.createElement('div');
    if (!isProperty) div.style.margin = '30px';

    //名前
    const name = document.createElement(isProperty ? 'h4' : 'h2');
    name.textContent = data.name;
    div.appendChild(name);

    //縦線
    const verticalLineDiv = document.createElement('div');
    verticalLineDiv.className = 'vertical-line';

    //これに要素を入れていく
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';

    //説明
    if (data.description !== undefined) {
        const description = document.createElement('p');
        const descriptionColor = document.createElement('span');
        descriptionColor.className = 'description-color';
        descriptionColor.textContent = '説明: ';
        description.appendChild(descriptionColor);

        const descriptionText = document.createElement('span');
        descriptionText.textContent = data.description;
        description.appendChild(descriptionText);
        descriptionDiv.appendChild(description);
    }

    //型
    const type = document.createElement('p');
    const typeColor = document.createElement('span');
    typeColor.className = 'type-color';
    typeColor.textContent = '型: ';
    type.appendChild(typeColor);

    const typeText = document.createElement('span');
    typeText.textContent = data.type;
    type.appendChild(typeText);
    descriptionDiv.appendChild(type);

    //プロパティ
    if (data.properties !== undefined) {

        //折り畳みのテキスト
        const properties = document.createElement('details');
        const propertiesColor = document.createElement('summary');
        propertiesColor.className = 'property-color';
        propertiesColor.textContent = 'プロパティ';
        properties.appendChild(propertiesColor);

        //これで要素を少し右にずらす
        const propertiesDescription = document.createElement('div');
        propertiesDescription.className = 'description';

        for (const property of data.properties) {
            propertiesDescription.appendChild(createDescription(property, true));
        }

        properties.append(propertiesDescription);

        descriptionDiv.appendChild(properties);

    }

    //例
    if (data.example !== undefined) {

        const example = document.createElement('p');
        const exampleColor = document.createElement('span');
        exampleColor.className = 'example-color';
        exampleColor.textContent = '例: ';
        example.appendChild(exampleColor);
        descriptionDiv.appendChild(example);

        for (const exampleData of data.example) {
            fetch(exampleData.path)
                .then((response) => response.text())
                .then((text) => {

                    //コピーボタン
                    const button = document.createElement('button');
                    button.addEventListener('click', () => {
                        copyButton(`${exampleData.name}-code`, `${exampleData.name}-button-text`);
                    });
                    const copyText = document.createElement('a');
                    copyText.id = `${exampleData.name}-button-text`;
                    copyText.textContent = 'Copy';
                    button.appendChild(copyText);
                    descriptionDiv.appendChild(button);

                    //コード
                    const pre = document.createElement('pre');
                    const code = document.createElement('code');
                    code.id = `${exampleData.name}-code`;
                    code.textContent = text;
                    pre.appendChild(code);
                    descriptionDiv.appendChild(pre);

                });
        }

    }

    verticalLineDiv.appendChild(descriptionDiv);
    div.appendChild(verticalLineDiv);

    return div;

}