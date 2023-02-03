import { ConsoleLogAction } from "./actions/console-log.action";
import { ButtonControl } from "./controls/buttons/button/button.control";
import { ButtonIcons } from "./controls/buttons/button.model";
import { ElementFind, GetElementCollection } from "./element-find/element-find";
import { RenderAt } from "./render/render.fabric";
import { ElementCollection } from "./element-find/element-collection";
import { StylesInjecter } from "./styles/styles-injecter";
import { ClearListActionSwitch } from "./actions/clear-list.action";

export function addButtons() {
    addFeedCleanerSwitch();

    function addFeedCleanerSwitch() {
        const addSearchButton = new ButtonControl({
            id: "",
            tag: "div",
            classes: ["vk-feed-accelerator-page_block", "page_block"],
            icon: ButtonIcons.none,
            html: `<div class="ui_toggler_wrap vk-feed-accelerator-icon hot" title="Данная настройка убирает прокрученные посты, оставляя 30 самых нижних.\nПосле обновления страницы, перехода на другую страницу или смены ленты новостей посты возвращаются.\nТаким образом страница ускоряется и перестаёт тормозить, если вам нужно крутить её куда-то глубоко в прошлые посты">
            <div class="_ui_toggler ui_toggler "></div>
            <div class="ui_toggler_label">Очистка ленты (ускорение)</div>
            </div>`,
        },
        ClearListActionSwitch.prototype.run,
        {}).element;

        const element = new ElementFind().getElementByElementIdSingle(ElementCollection.FeedFilters);
        const beforeElement = new ElementFind().getElementByElementIdSingle(ElementCollection.PageBlock);
        // render button
        new RenderAt().render(addSearchButton, element, beforeElement);

        ClearListActionSwitch.initState(localStorage.getItem("vk-feed-accelerator-clear-list"));
    }
}

export function loadStyles() {
    new StylesInjecter().injectInit();
}