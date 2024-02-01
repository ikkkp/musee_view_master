export default function (wangEditor, formulaEditor) {
  const btnOkId = 'btn-ok'

  /**
   * 插入公式
   */
  function insertFomule() {
    const formula = formulaEditor.$textSvgElem.html()
    // 注意插入wangEditor时左右两边的空格不能去掉，不然会导致无法获取焦点
    wangEditor.cmd.do('insertHTML', '<span>&nbsp;</span>' + formula + '<span>&nbsp;</span>')
    formulaEditor.destoryDom()
    return true
  }

  // tabs配置
  const tabsConf = [
    {
      // tab 的标题
      title: "插入数学公式",
      // 模板
      tpl: `<div>
              <div id="edit-content"></div>
              <div class="w-e-button-container">
                <button type="button" id="${btnOkId}" class="right">插入</button>
              </div>
            </div>`,
      // 事件绑定
      events: [
        // 插入视频
        {
          selector: '#' + btnOkId,
          type: 'click',
          fn: insertFomule,
          bindEnter: true,
        },
      ],
    }, // tab end
  ]

  return {
    width: 660,
    height: 0,
    // panel 中可包含多个 tab
    tabs: tabsConf, // tabs end
  }
}