import E from "wangeditor";
import formulaEditor from "easy-formula-editor";
import createPanelConf from "./create-panel-conf";

const { PanelMenu, Panel } = E;

class AlertMenu extends PanelMenu {
  constructor(editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$(
      `<div class="w-e-menu" data-title="数学公式">
        <span>公式</span>
      </div>`
    );
    super($elem, editor);
  }

  /**
   * 菜单点击事件
   */
  clickHandler() {
    const formula = new formulaEditor();
    const conf = createPanelConf(this.editor, formula);
    const panel = new Panel(this, conf);
    panel.create();

    formula.create("#edit-content");
  }

  tryChangeActive() { }
}

export default AlertMenu ;
